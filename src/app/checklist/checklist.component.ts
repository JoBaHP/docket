import * as checklistActions from "../checklist-service/checklist.actions";
import * as fromRoot from "../app.reducer";

import {
  ChecklistBlock,
  ChecklistModel
} from "../checklist-service/checklist.interface";
import {
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Observable, Subscription } from "rxjs/Rx";

import { ActivatedRoute } from "@angular/router";
import { ChecklistService } from "../checklist-service/checklist.service";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { SailsService } from "angular2-sails";
import { StatusBarService } from "../status-bar/status-bar.service";
import { Store } from "@ngrx/store";
import { WindowSizeService } from "../shared/window-size/window-size.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.scss"]
})
export class ChecklistComponent implements OnInit, OnDestroy {
  private checklist$: Observable<ChecklistModel>;
  private checklistId$: Observable<String>;
  public checklist: ChecklistModel;
  public editedHelpTextId = "";
  private checklistRendered = false;
  public modalWindowOpen = false;
  public deleteConfirmationOpened = false;
  public deleteConfirmationTitle = "";
  private selectedGroupIndex: number = null;
  private checklistElements: HTMLElement[];
  private subscriptions: Subscription = new Subscription();
  private deletionConfirmationCallback: Function = null;
  public highestOrder = 0;

  private selectedInput: {
    inputOrder: string;
    inputPosition: number;
    inputValue: string;
    inputInitialValue: string;
    editedByExternal: boolean;
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _checklistService: ChecklistService,
    private _windowSizeService: WindowSizeService,
    public route: ActivatedRoute,
    private zone: NgZone,
    private _dragulaService: DragulaService,
    private _sailsService: SailsService,
    private _statusBarService: StatusBarService
  ) {
    this._sailsService.connect(environment.sailsApi);

    this.route.params.first().subscribe(params => {
      this._checklistService.loadChecklistViaSocket(params.id);

      this._sailsService
        .on(`checklist`)
        .subscribe((checklist: ChecklistModel) => {
          this.remoteChecklistReceived(checklist);
        });

      this._store.dispatch(
        new checklistActions.setChecklistIdAction(params.id)
      );
    });

    this.checklist$ = this._store.select(fromRoot.getChecklist);
    this.checklistId$ = this._store.select(fromRoot.getChecklistId);

    this.subscriptions.add(
      _dragulaService.drop.subscribe(value => {
        this.onDrop(value.slice(1));
      })
    );
  }

  remoteChecklistReceived(checklist) {
    if (this.selectedInput) {
      checklist.data.forEach(group => {
        if (
          this.selectedInput &&
          group.order + "_group_title" === this.selectedInput.inputOrder
        ) {
          group.title = this.mergeInputValue(group.title, this.selectedInput);
        }

        group.items.forEach(item => {
          if (
            this.selectedInput &&
            item.order + "_item_title" === this.selectedInput.inputOrder
          ) {
            item.title = this.mergeInputValue(item.title, this.selectedInput);
          } else if (
            this.selectedInput &&
            item.order + "_item_help" === this.selectedInput.inputOrder
          ) {
            item.help = this.mergeInputValue(item.help, this.selectedInput);
          }
        });
      });
    }

    this._store.dispatch(new checklistActions.SetChecklistAction(checklist));
  }

  mergeInputValue(newInputValue, selectedInput) {
    if (
      // if it was edited by some other user
      selectedInput.inputInitialValue !== newInputValue
    ) {
      selectedInput.editedByExternal = true;
      // as we set up the value to be the new one, we also need to make it new initial value
      selectedInput.inputInitialValue = newInputValue;
      this._statusBarService.setStatus(
        "Someone just edited the field you are working on. We are sorry!",
        "error"
      );
      // as local usere was kicked out by remote one, we need to unselect the input
      this.selectedInput = null;
      return newInputValue;
    } else if (
      // the value was not edited by other user
      selectedInput.inputInitialValue === newInputValue &&
      // but it was edited by myself
      selectedInput.inputInitialValue !== selectedInput.inputValue
    ) {
      // in case it was only you who edited the data
      // use my value as the one in the input
      selectedInput.editedByExternal = false;
      return selectedInput.inputValue;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll(e) {
    this.adjustScrollPosition();
  }

  ngOnInit() {
    // this one is triggered just once on page load
    this.checklist$
      .filter(data => {
        return !!data;
      })
      .first()
      .subscribe(checklist => {
        this.checklist = checklist;
        this._checklistService.addToLocalStore(checklist);

        setTimeout(() => {
          this.checklistRendered = true;
        });
      });

    // this one is updated continuously

    this.subscriptions.add(
      Observable.combineLatest(
        this.checklist$,
        this._store.select(fromRoot.getChecklistStateChangeNumber)
      )
        .filter(data => {
          return !!data[0];
        })
        .subscribe(data => {
          // const checklist = JSON.parse(JSON.stringify(data[0]));
          this.checklist = data[0];
          setTimeout(() => {
            this.checklistElements = [].slice.call(
              document.querySelectorAll(".group-item")
            );
            if (this.checklistElements.length) {
              this.adjustScrollPosition();
            }

            this.highestOrder = this.getHighestOrder(this.checklist);
          });
        })
    );
  }

  ngOnDestroy() {
    this._store.dispatch(new checklistActions.SetChecklistAction(null));
    this.subscriptions.unsubscribe();
  }

  private adjustScrollPosition() {
    if (this.checklistRendered) {
      const scrollPosition = this._windowSizeService.getElementsPositionInPage(
        this.checklistElements
      );

      this._checklistService.setScrollPositions(scrollPosition);
    }
  }

  private onDrop(args) {
    this.saveChecklist(true);
  }

  keyupMainTitle(event) {
    if (event.keyCode === 13) {
      event.target.blur();
      // return false to avoid unwaned linebreak
      return false;
    }
  }

  onInputKeyup(event) {
    this.selectedInput.inputValue = event.target.value;
    this.selectedInput.inputPosition = event.target.selectionStart;
  }

  onInputKeydown(event, id) {
    if (event.keyCode === 13) {
      this.editedHelpTextId = "";
      event.currentTarget.blur();
    }

    let selectedInputData = {
      inputOrder: id,
      inputPosition: event.target.selectionStart,
      inputValue: event.target.value || "",
      inputInitialValue: event.target.value,
      editedByExternal: false
    };

    //in case selected input already existed before keep the old data in following two cases
    if (this.selectedInput) {
      selectedInputData.inputInitialValue = this.selectedInput.inputInitialValue;
      selectedInputData.editedByExternal = this.selectedInput.editedByExternal;
    }

    this.selectedInput = selectedInputData;
  }

  addGroupAfter(groupId) {
    this.modalWindowOpen = true;
    this.selectedGroupIndex = groupId;
  }

  addItemToGroup(groupId) {
    const newItemIndex = this.checklist.data[groupId].items.length;
    this.highestOrder++;

    this.checklist.data[groupId].items.push({
      title: "",
      order: this.highestOrder,
      help: "",
      checked: false
    });
    this._checklistService.setInputToFocus(`g_${groupId}_i_${newItemIndex}`);

    this.editedHelpTextId = "";
    this.saveChecklist(true);
  }

  deleteGroup(groupIndex) {
    this.deleteConfirmationOpened = true;
    this.deleteConfirmationTitle = `Do you want to delete "${this.checklist.data[groupIndex].title}"`;

    this.deletionConfirmationCallback = () => {
      this.checklist.data.splice(groupIndex, 1);
      this.saveChecklist(true);
      this._checklistService.setInputToFocus("");
    };
  }

  deleteCheckbox(groupIndex, checkboxIndex) {
    this.deleteConfirmationOpened = true;
    this.deleteConfirmationTitle = `Do you want to delete "${this.checklist.data[groupIndex].items[checkboxIndex].title}"`;
    this.deletionConfirmationCallback = () => {
      this.checklist.data[groupIndex].items.splice(checkboxIndex, 1);
      this.saveChecklist(true);
      this._checklistService.setInputToFocus("");
    };
  }

  @HostListener("document:keypress", ["$event"])
  onClick(event: KeyboardEvent): void {
    // (Y)es
    if (event.keyCode === 121 && this.deleteConfirmationOpened) {
      this.confirmDeletion();
    }
    // (N)o
    if (event.keyCode === 110 && this.deleteConfirmationOpened) {
      this.rejectDeletion();
    }
  }

  confirmDeletion() {
    this.deleteConfirmationOpened = false;
    this.deletionConfirmationCallback();
  }

  rejectDeletion() {
    this.deleteConfirmationOpened = false;
  }

  setEditedHelpText(id, event) {
    this.editedHelpTextId = id;
  }

  getHighestOrder(checklist: ChecklistModel) {
    let order = 0;
    checklist.data.forEach(list => {
      if (order < list.order) {
        order = list.order;
      }

      list.items.forEach(item => {
        if (order < item.order) {
          order = item.order;
        }
      });
    });

    return order;
  }

  raiseOrderNumbers(checklistArray: ChecklistBlock[]) {
    this.highestOrder = this.getHighestOrder(this.checklist);

    checklistArray.forEach(list => {
      list.order = ++this.highestOrder;

      list.items.forEach(item => {
        item.order = ++this.highestOrder;
      });
    });

    return checklistArray;
  }

  saveChecklist(changeForContent: boolean) {
    this.selectedInput = null;
    this.checklistId$.first().subscribe(checklistId => {
      this._checklistService
        .saveChecklist(checklistId, this.checklist, changeForContent)
        .first()
        .subscribe(response => {});
    });
  }

  openModalWindow() {
    this.modalWindowOpen = true;
  }

  onPresetsSelected(data: ChecklistBlock[]) {
    // get highets order number in current checklists

    const checklist = this.raiseOrderNumbers(data);

    let insertPosition = 0;
    if (this.selectedGroupIndex !== null) {
      insertPosition = this.selectedGroupIndex + 1;
      // in case we are adding new group after some other
      this.insertArrayAt(this.checklist.data, insertPosition, checklist);
      this.selectedGroupIndex = null;
    } else {
      // in case we are adding new group at the top of a list
      this.checklist.data.unshift(...checklist);
    }

    this._checklistService.setInputToFocus("g_" + insertPosition);

    this.saveChecklist(true);
  }

  insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
  }
}
