import * as checklistActions from "../checklist-service/checklist.actions";
import * as fromRoot from "../app.reducer";
import * as userActions from "../shared/user/user.actions";

import { Component, OnInit } from "@angular/core";

import { ChecklistItemModel } from "../shared/user/user.interface";
import { ChecklistService } from "../checklist-service/checklist.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { emptyChecklist } from "../checklist-service/default-checklist";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public checklistHistory: Array<any>;
  public checklistsByLoggedUser: Array<ChecklistItemModel>;

  constructor(
    private _checklistService: ChecklistService,
    private _router: Router,
    private _store: Store<fromRoot.State>
  ) {
    this._store.dispatch(new checklistActions.SetChecklistAction(null));

    this._store
      .select(fromRoot.getUser)
      .filter(data => !!data)
      .subscribe(user => {
        this._store.dispatch(new userActions.GetUsersChecklists(user.id));
      });

    this._store
      .select(fromRoot.getChecklistsByUser)
      .filter(data => !!data)
      .subscribe(checklists => {
        this.checklistsByLoggedUser = checklists;
      });
  }

  ngOnInit() {
    this.checklistHistory = this._checklistService.getLatestFromLocalStore();
  }

  createChecklist() {
    this._store.dispatch(
      new checklistActions.CreateChecklistAction(emptyChecklist)
    );
    this._store
      .select(fromRoot.getChecklist)
      .filter(data => !!data)
      .first()
      .subscribe(checklist => {
        this._router.navigate([`list/${checklist.id}`]);
      });
  }
}
