import { catchError, switchMap, map, debounceTime } from "rxjs/operators";

import * as fromRoot from "../../app.reducer";
import * as userActions from "./user.actions";

import { Actions, Effect } from "@ngrx/effects";
import { ChecklistItemModel, UserModel } from "./user.interface";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";

import { Action } from "@ngrx/store";
import { Observable, EMPTY, of } from "rxjs";
import { Store } from "@ngrx/store";
import { UserService } from "./user.service";

export const USER_DEBOUNCE = new InjectionToken<number>("User Debounce");

@Injectable()
export class UserEffect {
  @Effect()
  postUser$: Observable<Action> = this.actions$
    .ofType(userActions.API_POST_USER)
    .pipe(
      debounceTime(this.debounce),
      switchMap((data: any) => {
        const user = data.payload;
        // if there are no user
        if (!user) {
          return EMPTY;
        }

        return this._userService.postUser(user).pipe(
          map((fromBackend: any) => {
            const userData: UserModel = fromBackend.response.data.user;
            userData.token = fromBackend.response.data.token;
            return new userActions.SetUser(userData);
          }),
          catchError(() => of(new userActions.SetUser(null)))
        );
      })
    );

  @Effect()
  updateUsersChecklists$: Observable<Action> = this.actions$
    .ofType(userActions.API_PUT_CHECKLIST_ID_TO_USER)
    .pipe(
      debounceTime(this.debounce),
      switchMap((data: any) => {
        // if there are no user
        if (!data) {
          return EMPTY;
        }

        const { userId, checklistId } = data.payload;

        return this._userService.updateUser(userId, checklistId).pipe(
          map((fromBackend: any) => {
            const userData: UserModel = fromBackend.response.data.user[0];
            return new userActions.UpdateUser(userData);
          }),
          catchError(() => of(new userActions.UpdateUser(null)))
        );
      })
    );

  @Effect()
  getUsersChecklists$: Observable<Action> = this.actions$
    .ofType(userActions.API_GET_USERS_CHECKLISTS)
    .pipe(
      debounceTime(this.debounce),

      switchMap((data: any) => {
        const userId = data.payload;
        // if there are no user
        if (userId === null) {
          return EMPTY;
        }

        return this._userService.getUsersChecklists(userId).pipe(
          map((fromBackend: any) => {
            const checklists: Array<ChecklistItemModel> =
              fromBackend.response.data.checklists;
            return new userActions.SetUsersChecklists(checklists);
          }),
          catchError(() => of(new userActions.SetUsersChecklists(null)))
        );
      })
    );

  @Effect()
  loginUser$: Observable<Action> = this.actions$
    .ofType(userActions.API_POST_LOGIN_USER)
    .pipe(
      debounceTime(this.debounce),
      switchMap((data: any) => {
        const user = data.payload;

        // if there are no user
        if (!user) {
          return EMPTY;
        }

        return this._userService.loginUser(user).pipe(
          map((fromBackend: any) => {
            const userData: UserModel = fromBackend.response.data.user;
            userData.token = fromBackend.response.data.token;
            return new userActions.SetUser(userData);
          }),
          catchError(() => of(new userActions.SetUser(null)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private _userService: UserService,
    @Optional()
    @Inject(USER_DEBOUNCE)
    private debounce: number = 50,
    private _store: Store<fromRoot.State>
  ) {}
}
