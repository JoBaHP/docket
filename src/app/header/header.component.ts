import * as checklistActions from "../checklist-service/checklist.actions";
import * as fromRoot from "../app.reducer";
import * as userActions from "../shared/user/user.actions";

import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UserModel } from "../shared/user/user.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  /*   private checklist$: Observable<ChecklistModel>;
  private checklistId$: Observable<String>; */
  public user = null;

  /*   public checklist: ChecklistModel = null;
   */ public title: string = null;

  constructor(
    private _store: Store<fromRoot.State>
  ) /*     private _checklistService: ChecklistService
   */ {
    /*     this.checklist$ = this._store.select(fromRoot.getChecklist);
    this.checklistId$ = this._store.select(fromRoot.getChecklistId);
    this.checklist$.subscribe(checklist => {
      this.checklist = checklist;
      if (checklist) {
        this.title = checklist.title;
      } else {
        this.title = null;
      }
    }); */

    this._store.select(fromRoot.getUser).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}
  /*
  onInputKeyup(event) {
    this._checklistService.onInputKeyup(event);
  }

  titleChange(title) {
    this.checklist.title = title;

    this.checklistId$.first().subscribe(checklistId => {
      this._checklistService
        .saveChecklist(checklistId, this.checklist, false)
        .first()
        .subscribe();
    });
  } */

  logout() {
    this._store.dispatch(new userActions.SetUser(null));
    this._store.dispatch(new userActions.SetUsersChecklists(null));
  }
}
