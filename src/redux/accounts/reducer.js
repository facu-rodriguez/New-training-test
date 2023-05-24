import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  accounts: [],
  currentAccount: null
};

const reducerDescription = {
  primaryActions: [actions.GET_ACCOUNTS, actions.UPDATE_EMAILS, actions.CREATE_EMAILS],
  override: {
    [actions.SET_CURRENT_ACCOUNT]: (state, action) =>
      Immutable.merge(state, { currentAccount: action.payload }),
    [actions.DELETE_EMAILS_SUCCESS]: (state, action) => Immutable.merge(state, { accounts: action.payload })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
