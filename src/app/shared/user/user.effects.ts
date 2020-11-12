import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import * as fromRoot from "../../app.reducer";
import * as userActions from "./user.actions";

import { Actions, Effect, toPayload } from "@ngrx/effects";
import { ChecklistItemModel, UserModel } from "./user.interface";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";

import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { UserService } from "./user.service";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";

export const USER_DEBOUNCE = new InjectionToken<number>("User Debounce");

@Injectable()
export class UserEffect {
  @Effect()
  postUser$: Observable<Action> = this.actions$
    .ofType(userActions.API_POST_USER)
    .debounceTime(this.debounce)
    .map(toPayload)
    .switchMap(user => {
      // if there are no user
      if (!user) {
        return empty();
      }

      return this._userService
        .postUser(user)
        .map((fromBackend: any) => {
          const userData: UserModel = fromBackend.response.data.user;
          userData.token = fromBackend.response.data.token;
          return new userActions.SetUser(userData);
        })
        .catch(() => of(new userActions.SetUser(null)));
    });

  @Effect()
  updateUsersChecklists$: Observable<Action> = this.actions$
    .ofType(userActions.API_PUT_CHECKLIST_ID_TO_USER)
    .debounceTime(this.debounce)
    .map(toPayload)
    .switchMap(data => {
      // if there are no user
      if (!data) {
        return empty();
      }

      const { userId, checklistId } = data;

      return this._userService
        .updateUser(userId, checklistId)
        .map((fromBackend: any) => {
          const userData: UserModel = fromBackend.response.data.user[0];
          return new userActions.UpdateUser(userData);
        })
        .catch(() => of(new userActions.UpdateUser(null)));
    });

  @Effect()
  getUsersChecklists$: Observable<Action> = this.actions$
    .ofType(userActions.API_GET_USERS_CHECKLISTS)
    .debounceTime(this.debounce)
    .map(toPayload)
    .switchMap(userId => {
      // if there are no user
      if (userId === null) {
        return empty();
      }

      return this._userService
        .getUsersChecklists(userId)
        .map((fromBackend: any) => {
          const checklists: Array<ChecklistItemModel> =
            fromBackend.response.data.checklists;
          return new userActions.SetUsersChecklists(checklists);
        })
        .catch(() => of(new userActions.SetUsersChecklists(null)));
    });

  @Effect()
  loginUser$: Observable<Action> = this.actions$
    .ofType(userActions.API_POST_LOGIN_USER)
    .debounceTime(this.debounce)
    .map(toPayload)
    .switchMap(user => {
      // if there are no user
      if (!user) {
        return empty();
      }

      return this._userService
        .loginUser(user)
        .map((fromBackend: any) => {
          const userData: UserModel = fromBackend.response.data.user;
          userData.token = fromBackend.response.data.token;
          return new userActions.SetUser(userData);
        })
        .catch(() => of(new userActions.SetUser(null)));
    });

  constructor(
    private actions$: Actions,
    private _userService: UserService,
    @Optional()
    @Inject(USER_DEBOUNCE)
    private debounce: number = 50,
    private _store: Store<fromRoot.State>
  ) {}
}
