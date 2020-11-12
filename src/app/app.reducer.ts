/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromChecklist from "./checklist-service/checklist.reducer";
import * as fromUser from "./shared/user/user.reducer";

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import { environment } from "../environments/environment";
import { localStorageSync } from "ngrx-store-localstorage";
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from "ngrx-store-freeze";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  checklist: fromChecklist.State;
  user: fromUser.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */

export const synchronizedReducers = ["user"]; //['checklist'];

export const reducers: ActionReducerMap<State> = {
  checklist: fromChecklist.reducer,
  user: fromUser.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: ActionReducer<any, any>[] = !environment.production
  ? [logger]
  : [];

export function localStorageSyncReducer(
  reducer: ActionReducerMap<any>
): ActionReducer<any> {
  return localStorageSync({ keys: synchronizedReducers, rehydrate: true })(
    reducer
  );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                SELECTORS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export const getState = (state: State) => state;

// user service
export const getUserState = createFeatureSelector<fromUser.State>("user");
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getChecklistsByUser = createSelector(
  getUserState,
  fromUser.getChecklistsByUser
);
export const getAuthToken = createSelector(getUserState, fromUser.getAuthToken);

// checklist service
export const getChecklistState = createFeatureSelector<fromChecklist.State>(
  "checklist"
);

export const getChecklist = createSelector(
  getChecklistState,
  fromChecklist.getChecklist
);
export const getChecklistStateChangeNumber = createSelector(
  getChecklistState,
  fromChecklist.getChecklistStateChangeNumber
);

export const getChecklistId = createSelector(
  getChecklistState,
  fromChecklist.getChecklistId
);
