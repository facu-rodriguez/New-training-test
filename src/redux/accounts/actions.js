import { createTypes, completeTypes } from 'redux-recompose';

import AccountService from 'services/AccountService';

export const actions = createTypes(completeTypes(['GET_ACCOUNTS'], ['SET_CURRENT_ACCOUNT']), '@@ACCOUNTS');

const privateActionCreators = {
  getAccountsSuccess: payload => ({ type: actions.GET_ACCOUNTS_SUCCESS, payload, target: 'accounts' }),
  getAccountsFailure: payload => ({ type: actions.GET_ACCOUNTS_FAILURE, payload, target: 'accounts' })
};

export const actionCreators = {
  setCurrentAccount: account => dispatch => dispatch({ type: actions.SET_CURRENT_ACCOUNT, payload: account }),
  getAccounts: () => async dispatch => {
    dispatch({ type: actions.GET_ACCOUNTS, target: 'accounts' });
    const response = await AccountService.getAccounts();
    if (response.ok) {
      await dispatch(actionCreators.setCurrentAccount(response.data[0]));
      dispatch(privateActionCreators.getAccountsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.getAccountsFailure(response.data.error));
    }
  }
};

export default actionCreators;
