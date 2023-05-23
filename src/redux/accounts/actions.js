import { createTypes, completeTypes } from 'redux-recompose';

import AccountService from 'services/AccountService';

export const actions = createTypes(
  completeTypes(
    [
      'GET_ACCOUNTS',
      'DIGITAL_BILLING_UPDATE',
      'DIGITAL_BILLING_SUBSCRIPTION',
      'DIGITAL_BILLING_UNSUBSCRIPTION'
    ],
    ['SET_CURRENT_ACCOUNT']
  ),
  '@@ACCOUNTS'
);

const privateActionCreators = {
  getAccountsSuccess: payload => ({ type: actions.GET_ACCOUNTS_SUCCESS, payload, target: 'accounts' }),
  getAccountsFailure: payload => ({ type: actions.GET_ACCOUNTS_FAILURE, payload, target: 'accounts' }),
  digitalBillingUpdateSuccess: payload => ({
    type: actions.DIGITAL_BILLING_UPDATE_SUCCESS,
    payload,
    target: 'accounts'
  }),
  digitalBillingUpdateFailure: payload => ({
    type: actions.DIGITAL_BILLING_UPDATE_FAILURE,
    payload,
    target: 'accounts'
  }),
  digitalBillingSubscriptionSuccess: payload => ({
    type: actions.DIGITAL_BILLING_SUBSCRIPTION_SUCCESS,
    payload,
    target: 'accounts'
  }),
  digitalBillingSubscriptionFailure: payload => ({
    type: actions.DIGITAL_BILLING_SUBSCRIPTION_FAILURE,
    payload,
    target: 'accounts'
  }),
  digitalBillingUnsubscriptionSuccess: payload => ({
    type: actions.DIGITAL_BILLING_UNSUBSCRIPTION_SUCCESS,
    payload,
    target: 'accounts'
  }),
  digitalBillingUnsubscriptionFailure: payload => ({
    type: actions.DIGITAL_BILLING_UNSUBSCRIPTION_FAILURE,
    payload,
    target: 'accounts'
  })
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
  digitalBillingUpdate: (email, profile) => async dispatch => {
    dispatch({ type: actions.DIGITAL_BILLING_UPDATE, target: 'digitalBilling' });
    const response = await AccountService.digitalBillingUpdate(email);
    if (response.ok) {
      const accounts = await AccountService.getAccounts();
      const newCurrent = accounts.data.filter(account => account.perfil === profile)[0];
      const updatedCurrent = {
        ...newCurrent,
        contact_emails: [...newCurrent.contact_emails, email]
      };
      await dispatch(actionCreators.setCurrentAccount(updatedCurrent));
      dispatch(privateActionCreators.digitalBillingUpdateSuccess(accounts.data));
    } else {
      dispatch(privateActionCreators.digitalBillingUpdateFailure(response.data.error));
    }
  },
  digitalBillingUnsubscription: (email, profile) => async dispatch => {
    dispatch({ type: actions.DIGITAL_BILLING_UNSUBSCRIPTION, target: 'accountsZ' });
    const response = await AccountService.digitalBillingUnsubscription(email);
    if (response.ok) {
      const accounts = await AccountService.getAccounts();
      const newCurrent = accounts.data.filter(account => account.perfil === profile)[0];
      const updatedCurrent = {
        ...newCurrent,
        adherido_factura_digital: false,
        contact_emails: []
      };
      await dispatch(actionCreators.setCurrentAccount(updatedCurrent));
      dispatch(privateActionCreators.digitalBillingUnsubscriptionSuccess(accounts.data));
    } else {
      dispatch(privateActionCreators.digitalBillingUnsubscriptionFailure(response.data.error));
    }
  },
  digitalBillingSubscription: (email, profile) => async dispatch => {
    dispatch({ type: actions.DIGITAL_BILLING_SUBSCRIPTION, target: 'accounts' });
    const response = await AccountService.digitalBillingSubscription(email);
    if (response.ok) {
      const accounts = await AccountService.getAccounts();
      const newCurrent = accounts.data.filter(account => account.perfil === profile)[0];
      const updatedCurrent = {
        ...newCurrent,
        adherido_factura_digital: true,
        contact_emails: [email]
      };
      await dispatch(actionCreators.setCurrentAccount(updatedCurrent));
      dispatch(privateActionCreators.digitalBillingSubscriptionSuccess(accounts.data));
    } else {
      dispatch(privateActionCreators.digitalBillingSubscriptionFailure(response.data.error));
    }
  }
};

export default actionCreators;
