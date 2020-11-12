import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import * as checklistActions from "./checklist.actions";
import * as fromRoot from "../app.reducer";

import { Actions, Effect, toPayload } from "@ngrx/effects";
import {
  ChecklistBlock,
  ChecklistItem,
  ChecklistModel
} from "./checklist.interface";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";

import { Action } from "@ngrx/store";
import { ChecklistService } from "./checklist.service";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";

export const USER_DEBOUNCE = new InjectionToken<number>("User Debounce");

@Injectable()
export class ChecklistEffect {
  @Effect()
  loadChecklist$: Observable<Action> = this.actions$
    .ofType(checklistActions.LOAD_CHECKLIST)
    .debounceTime(this.debounce)
    .map(toPayload)
    .switchMap(id => {
      // if there are no user credentails
      if (!id) {
        return empty();
      }

      return this._checklistService
        .loadChecklist(id)
        .map(fromBackend => {
          const checklist: ChecklistModel = fromBackend.response.data.checklist;
          return new checklistActions.SetChecklistAction(checklist);
        })
        .catch(() => of(new checklistActions.SetChecklistAction(null)));
    });

  @Effect()
  postChecklist$: Observable<Action> = this.actions$
    .ofType(checklistActions.API_POST_CHECKLIST)
    .debounceTime(this.debounce)
    .map(toPayload)
    .switchMap(checklist => {
      // if there are no user credentails
      if (!checklist) {
        return empty();
      }

      return this._checklistService
        .createChecklist(checklist)
        .map(fromBackend => {
          const checklist: ChecklistModel = fromBackend.response.data.checklist;

          this._store.dispatch(new checklistActions.SetChecklistChangeAction());
          return new checklistActions.SetChecklistAction(checklist);
        })
        .catch(() => of(new checklistActions.SetChecklistAction(null)));
    });

  constructor(
    private actions$: Actions,
    private _checklistService: ChecklistService,
    @Optional()
    @Inject(USER_DEBOUNCE)
    private debounce: number = 50,
    private _store: Store<fromRoot.State>
  ) {}
}
