import { catchError, switchMap, map, debounceTime } from "rxjs/operators";

import * as checklistActions from "./checklist.actions";
import * as fromRoot from "../app.reducer";

import { Actions, Effect } from "@ngrx/effects";
import {
  ChecklistBlock,
  ChecklistItem,
  ChecklistModel
} from "./checklist.interface";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";

import { Action } from "@ngrx/store";
import { ChecklistService } from "./checklist.service";
import { Observable, EMPTY, of } from "rxjs";
import { Store } from "@ngrx/store";

export const USER_DEBOUNCE = new InjectionToken<number>("User Debounce");

@Injectable()
export class ChecklistEffect {
  @Effect()
  loadChecklist$: Observable<Action> = this.actions$
    .ofType(checklistActions.LOAD_CHECKLIST)
    .pipe(
      debounceTime(this.debounce),
      switchMap((data: any) => {
        // if there are no user credentails
        const id = data.payload;
        if (!id) {
          return EMPTY;
        }

        return this._checklistService.loadChecklist(id).pipe(
          map(fromBackend => {
            const checklist: ChecklistModel =
              fromBackend.response.data.checklist;
            return new checklistActions.SetChecklistAction(checklist);
          }),
          catchError(() => of(new checklistActions.SetChecklistAction(null)))
        );
      })
    );

  @Effect()
  postChecklist$: Observable<Action> = this.actions$
    .ofType(checklistActions.API_POST_CHECKLIST)
    .pipe(
      debounceTime(this.debounce),
      switchMap((data: any) => {
        const checklist = data.payload;
        // if there are no user credentails
        if (!checklist) {
          return EMPTY;
        }

        return this._checklistService.createChecklist(checklist).pipe(
          map((fromBackend: any) => {
            const checklist: ChecklistModel =
              fromBackend.response.data.checklist;

            this._store.dispatch(
              new checklistActions.SetChecklistChangeAction()
            );
            return new checklistActions.SetChecklistAction(checklist);
          }),
          catchError(() => of(new checklistActions.SetChecklistAction(null)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private _checklistService: ChecklistService,
    @Optional()
    @Inject(USER_DEBOUNCE)
    private debounce: number = 50,
    private _store: Store<fromRoot.State>
  ) {}
}
