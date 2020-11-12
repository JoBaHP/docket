import * as checklistActions from "./checklist.actions";

import {
  ChecklistBlock,
  ChecklistItem,
  ChecklistModel
} from "./checklist.interface";

import { createSelector } from "reselect";
import { defaultChecklist } from "./default-checklist";

export interface State {
  checklist: ChecklistModel;
  checklistChangeNumber: number;
  id: String;
}

export const initialState: State = {
  checklist: null,
  checklistChangeNumber: 0,
  id: ""
};

export function reducer(
  state = initialState,
  action: checklistActions.Actions
): State {
  switch (action.type) {
    case checklistActions.SET_CHECKLIST:
      const checklist: ChecklistModel = action.payload;
      return {
        ...state,
        checklist: checklist
      };
    case checklistActions.CHECKLIST_CHANGED:
      return {
        ...state,
        checklistChangeNumber: state.checklistChangeNumber + 1
      };
    case checklistActions.SET_CHECKLIST_ID:
      const id: String = action.payload;
      return {
        ...state,
        id: id
      };

    case checklistActions.RESET_REDUCER:
      return initialState;

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getChecklist = (state: State) => state.checklist;
export const getChecklistStateChangeNumber = (state: State) =>
  state.checklistChangeNumber;
export const getChecklistId = (state: State) => state.id;
