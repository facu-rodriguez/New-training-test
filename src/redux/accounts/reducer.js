import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  accounts: [],
  currentAccount: null
};

const reducerDescription = {
  primaryActions: [actions.GET_ACCOUNTS],
  override: {
    [actions.SET_CURRENT_ACCOUNT]: (state, action) =>
      Immutable.merge(state, { currentAccount: action.payload }),
    [actions.SET_CONTACT_EMAILS]: (state, action) => {
      const newCurrentAccount = { ...state.currentAccount };
      const newAccounts = [...state.accounts];

      const sameId = account => account.cuenta_id === state.currentAccount.cuenta_id;

      newCurrentAccount.contact_emails = action.payload;
      newAccounts.forEach(account => {
        if (sameId(account)) Immutable.merge(account, { contact_emails: action.payload });
      });

      return Immutable.merge(state, { accounts: newAccounts, currentAccount: newCurrentAccount });
    }
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
