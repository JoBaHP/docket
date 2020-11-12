import * as userActions from "./user.actions";

import { ChecklistItemModel, UserModel } from "./user.interface";

import { createSelector } from "reselect";

export interface State {
  user: UserModel;
  usersChecklists: Array<ChecklistItemModel>;
}

export const initialState: State = {
  user: null,
  usersChecklists: []
};

export function reducer(
  state = initialState,
  action: userActions.Actions
): State {
  switch (action.type) {
    case userActions.SET_USERS_CHECKLISTS: {
      const usersChecklists: Array<ChecklistItemModel> = action.payload;
      return {
        ...state,
        usersChecklists: usersChecklists
      };
    }

    case userActions.SET_USER: {
      const user: UserModel = action.payload;
      return {
        ...state,
        user: user
      };
    }

    case userActions.UPDATE_USER: {
      const user: UserModel = action.payload;
      let userMerge = Object.assign(state.user, user);

      return {
        ...state,
        user: userMerge
      };
    }

    case userActions.RESET_REDUCER: {
      return initialState;
    }
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

export const getUser = (state: State) => state.user;
export const getChecklistsByUser = (state: State) => state.usersChecklists;

export const getAuthToken = createSelector(getUser, (user: UserModel) => {
  if (user && user.token) {
    return user.token;
  } else {
    return null;
  }
});
