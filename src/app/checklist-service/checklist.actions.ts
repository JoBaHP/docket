import {
  ChecklistBlock,
  ChecklistItem,
  ChecklistModel
} from "./checklist.interface";

import { Action } from "@ngrx/store";

export const RESET_REDUCER = "[Checklist] reset reducer";
export const API_POST_CHECKLIST = "[Checklist] create checklist";
export const SET_CHECKLIST = "[Checklist] set checklist";
export const CHECKLIST_CHANGED = "[Checklist] has changed";
export const LOAD_CHECKLIST = "[Checklist] load checklist from api";
export const SAVE_CHECKLIST = "[Checklist] save checklist via api";
export const SET_CHECKLIST_ID = "[Checklist] set checklist id";

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class SetChecklistAction implements Action {
  readonly type = SET_CHECKLIST;
  constructor(public payload: ChecklistModel) {}
}

export class CreateChecklistAction implements Action {
  readonly type = API_POST_CHECKLIST;
  constructor(public payload: ChecklistModel) {}
}

export class LoadChecklistAction implements Action {
  readonly type = LOAD_CHECKLIST;
  constructor(public payload: String) {}
}
export class setChecklistIdAction implements Action {
  readonly type = SET_CHECKLIST_ID;
  constructor(public payload: String) {}
}

export class SetChecklistChangeAction implements Action {
  readonly type = CHECKLIST_CHANGED;
}

export class SaveChecklistAction implements Action {
  readonly type = SAVE_CHECKLIST;
  constructor(public payload: ChecklistModel) {}
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
  | SetChecklistAction
  | SetChecklistChangeAction
  | LoadChecklistAction
  | setChecklistIdAction
  | CreateChecklistAction;
