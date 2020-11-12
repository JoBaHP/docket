import { ChecklistItemModel, UserModel } from "./user.interface";

import { Action } from "@ngrx/store";

export const RESET_REDUCER = "[User] reset reducer";
export const API_POST_USER = "[User] create user via API";
export const API_POST_LOGIN_USER = "[User] login user via API";
export const SET_USER = "[User] set user to store";
export const UPDATE_USER = "[User] update user in store with new data";
export const API_PUT_CHECKLIST_ID_TO_USER = "[User] update user via API";
export const API_GET_USERS_CHECKLISTS = "[User] get users checklists via API";
export const SET_USERS_CHECKLISTS = "[User] set users checklists";

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class CreateUser implements Action {
  readonly type = API_POST_USER;
  constructor(public payload: UserModel) {}
}

export class LoginUser implements Action {
  readonly type = API_POST_LOGIN_USER;
  constructor(public payload: UserModel) {}
}

export class GetUsersChecklists implements Action {
  readonly type = API_GET_USERS_CHECKLISTS;
  constructor(public payload: string) {}
}

export class SetUsersChecklists implements Action {
  readonly type = SET_USERS_CHECKLISTS;
  constructor(public payload: Array<ChecklistItemModel>) {}
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: UserModel) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: UserModel) {}
}

export class updateUserWithChecklistId implements Action {
  readonly type = API_PUT_CHECKLIST_ID_TO_USER;
  constructor(public payload: { userId: string; checklistId: string }) {}
}

export class ResetReducer implements Action {
  readonly type = RESET_REDUCER;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | ResetReducer
  | CreateUser
  | SetUser
  | UpdateUser
  | updateUserWithChecklistId
  | GetUsersChecklists
  | SetUsersChecklists;
