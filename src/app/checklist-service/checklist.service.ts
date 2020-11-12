import { first, filter, catchError, map } from "rxjs/operators";
import * as checklistActions from "../checklist-service/checklist.actions";
import * as fromRoot from "../app.reducer";
import * as userActions from "../shared/user/user.actions";

import { ElementRef, Injectable, Renderer } from "@angular/core";

import { ChecklistModel } from "./checklist.interface";
import { ErrorHandlingService } from "../shared/error-handling/error-handling.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { RestService } from "../shared/rest/rest.service";
import { SailsService } from "angular2-sails";
import { StatusBarService } from "../status-bar/status-bar.service";
import { Store } from "@ngrx/store";
import { defaultChecklist } from "./default-checklist";
import { environment } from "../../environments/environment";

@Injectable()
export class ChecklistService {
  public appEl: any;
  public appRenderer: any;
  private headers: HttpHeaders;
  public scrollData = new Subject();
  public inputToFocus = "";

  constructor(
    private _http: HttpClient,
    private _store: Store<fromRoot.State>,
    private _statusBarService: StatusBarService,
    private _restService: RestService,
    private _errorHandlingService: ErrorHandlingService,
    private _sailsService: SailsService
  ) {
    this.headers = this._restService.getJsonHeaders();
  }

  setInputToFocus(inputID: string) {
    this.inputToFocus = inputID;
  }

  isMobile() {
    if (typeof navigator !== "undefined") {
      return (
        navigator.userAgent.match(
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i
        ) && true
      );
    }
    return false;
  }

  setScrollPositions(scrollPosition) {
    this.scrollData.next(scrollPosition);
  }

  onInputKeyup(event) {
    if (event.keyCode === 13) {
      event.currentTarget.blur();
    }
  }

  addChecklistToUser(userId, checklist) {
    //save it to localstoreage
    this.addToLocalStore(checklist);

    //update user with his checklist id
    this._store.dispatch(
      new userActions.updateUserWithChecklistId({
        userId,
        checklistId: checklist.id
      })
    );
  }

  addToLocalStore(newChecklist: ChecklistModel) {
    const checklists = this.getLatestFromLocalStore();

    const checklistIndex = checklists.findIndex(checklist => {
      return checklist.id === newChecklist.id;
    });

    const checklistToAdd = {
      id: newChecklist.id,
      title: newChecklist.title
    };

    if (checklistIndex >= 0) {
      checklists[checklistIndex] = checklistToAdd;
    } else {
      checklists.push(checklistToAdd);
    }

    checklists.splice(15, 1);

    localStorage.setItem("latest-checklists", JSON.stringify(checklists));
  }

  getLatestFromLocalStore() {
    const checklists = localStorage.getItem("latest-checklists");
    if (checklists) {
      return JSON.parse(checklists);
    } else {
      return [];
    }
  }

  setRefsToAppComponent(renderer: Renderer, el: ElementRef) {
    this.appRenderer = renderer;
    this.appEl = el;
  }

  loadChecklistViaSocket(checklistId) {
    this._sailsService.get(`/checklist/${checklistId}`).subscribe(response => {
      const checklist = response.data.response.data.checklist;
      this._store.dispatch(new checklistActions.SetChecklistAction(checklist));
      this._store
        .select(fromRoot.getUser)
        .pipe(
          filter(user => {
            return !!user;
          }),
          first()
        )
        .subscribe(user => {
          this.addChecklistToUser(user.id, checklist);
        });
    });
  }

  loadChecklist(id) {
    return this._http
      .get(`${environment.sailsApi}/checklist/${id}`, { headers: this.headers })
      .pipe(
        map(res => {
          try {
            // ensure that there cannot be any brackets '<' '>' in the json
            const cleanedResult = JSON.stringify(res).replace(
              /<\/?[^>]+(>|$)/g,
              ""
            );
            return JSON.parse(cleanedResult) || {};
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }

  createChecklist(checklist) {
    return this._http
      .post(`${environment.sailsApi}/checklist`, JSON.stringify(checklist), {
        headers: this.headers
      })
      .pipe(
        map(res => {
          try {
            return res;
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }

  saveChecklist(
    id: String,
    checklist: ChecklistModel,
    changeForContent: boolean
  ) {
    /*
      if numbers are not assigned (any of items will have 0 value as order) to groups and items do it now
      we use same number collection for all
    */
    if (checklist && checklist.data.length && checklist.data[0].order === 0) {
      let order = 1;
      checklist.data.forEach((list, groupIndex) => {
        list.order = order;
        order++;

        list.items.forEach((item, itemIndex) => {
          item.order = order;
          order++;
        });
      });
    }

    const action = new checklistActions.SetChecklistAction(checklist);

    this._store.dispatch(action);

    if (changeForContent) {
      const changeAction = new checklistActions.SetChecklistChangeAction();
      this._store.dispatch(changeAction);
    }

    // save via socket

    return this._sailsService
      .put(`${environment.sailsApi}/checklist/${id}`, checklist)
      .pipe(
        map(res => {
          try {
            return res.data.response.data.checklist[0] || {};
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }
}
