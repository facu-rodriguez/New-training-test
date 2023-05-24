import { createTypes, completeTypes } from 'redux-recompose';

import AccountService from 'services/AccountService';

export const actions = createTypes(
  completeTypes(['GET_ACCOUNTS', 'UPDATE_EMAILS', 'CREATE_EMAILS'], ['SET_CURRENT_ACCOUNT']),
  '@@ACCOUNTS'
);

const privateActionCreators = {
  getAccountsSuccess: payload => ({ type: actions.GET_ACCOUNTS_SUCCESS, payload, target: 'accounts' }),
  getAccountsFailure: payload => ({ type: actions.GET_ACCOUNTS_FAILURE, payload, target: 'accounts' }),
  updateEmailsSuccess: payload => ({ type: actions.UPDATE_EMAILS_SUCCESS, payload, target: 'accounts' }),
  updateEmailsFailure: payload => ({ type: actions.UPDATE_EMAILS_FAILURE, payload, target: 'accounts' }),
  createEmailsSuccess: payload => ({ type: actions.CREATE_EMAILS_SUCCESS, payload, target: 'accounts' }),
  createEmailsFailure: payload => ({ type: actions.CREATE_EMAILS_FAILURE, payload, target: 'accounts' })
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
  },
  updateEmails: (emails, id) => async dispatch => {
    dispatch({ type: actions.UPDATE_EMAILS, target: 'accounts' });
    const response = await AccountService.updateEmails(emails);
    if (response.ok) {
      const newAccounts = await AccountService.getAccounts();

      const hasSameId = account => account.cuenta_id === id;
      await newAccounts.data.forEach(account => {
        if (hasSameId(account)) {
          account.contact_emails = emails;
          dispatch(actionCreators.setCurrentAccount(account));
        }
      });

      dispatch(privateActionCreators.updateEmailsSuccess(newAccounts.data));
    } else dispatch(privateActionCreators.updateEmailsFailure(response.data.error));
  },
  createEmails: (emails, id) => async dispatch => {
    dispatch({ type: actions.CREATE_EMAILS, target: 'accounts' });
    const response = await AccountService.createEmails(emails);
    if (response.ok) {
      const newAccounts = await AccountService.getAccounts();

      const hasSameId = account => account.cuenta_id === id;
      await newAccounts.data.forEach(account => {
        if (hasSameId(account)) {
          account.contact_emails = emails;
          account.adherido_factura_digital = true;
          dispatch(actionCreators.setCurrentAccount(account));
        }
      });

      dispatch(privateActionCreators.createEmailsSuccess(newAccounts.data));
    } else dispatch(privateActionCreators.createEmailsFailure(response.data.error));
  }
};

export default actionCreators;
