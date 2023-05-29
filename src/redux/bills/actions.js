import { createTypes, completeTypes } from 'redux-recompose';

import BillsService from 'services/billsService';

export const actions = createTypes(
  completeTypes(
    [
      'GET_BILLS',
      'GET_LAST_BILL',
      'UPDATE_DIGITAL_BILLING',
      'SUBSCRIBE_DIGITAL_BILLING',
      'UNSUBSCRIBE_DIGITAL_BILLING'
    ],
    ['SET_DIGITAL_BILLING']
  ),
  '@@BILLS'
);

const privateActionCreators = {
  getBillsSuccess: payload => ({ type: actions.GET_BILLS_SUCCESS, payload, target: 'billsHistory' }),
  getBillsFailure: payload => ({ type: actions.GET_BILLS_FAILURE, payload, target: 'billsHistory' }),
  getLastBillSuccess: payload => ({ type: actions.GET_LAST_BILL_SUCCESS, payload, target: 'lastBill' }),
  getLastBillFailure: payload => ({ type: actions.GET_LAST_BILL_FAILURE, payload, target: 'lastBill' }),
  digitalBillingUpdateSuccess: payload => ({
    type: actions.UPDATE_DIGITAL_BILLING_SUCCESS,
    payload,
    target: 'digitalBilling'
  }),
  digitalBillingUpdateFailure: payload => ({
    type: actions.UPDATE_DIGITAL_BILLING_FAILURE,
    payload,
    target: 'digitalBilling'
  }),
  digitalBillingSubscriptionSuccess: payload => ({
    type: actions.SUBSCRIBE_DIGITAL_BILLING_SUCCESS,
    payload,
    target: 'digitalBilling'
  }),
  digitalBillingSubscriptionFailure: payload => ({
    type: actions.SUBSCRIBE_DIGITAL_BILLING_FAILURE,
    payload,
    target: 'digitalBilling'
  }),
  digitalBillingUnsubscriptionSuccess: payload => ({
    type: actions.UNSUBSCRIBE_DIGITAL_BILLING_SUCCESS,
    payload,
    target: 'digitalBilling'
  }),
  digitalBillingUnsubscriptionFailure: payload => ({
    type: actions.UNSUBSCRIBE_DIGITAL_BILLING_FAILURE,
    payload,
    target: 'digitalBilling'
  })
};

export const actionCreators = {
  getBills: () => async dispatch => {
    dispatch({ type: actions.GET_BILLS, target: 'billsHistory' });
    const response = await BillsService.getBills();
    if (response.ok) {
      dispatch(privateActionCreators.getBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.getBillsFailure(response.data.error));
    }
  },
  getLastBill: () => async dispatch => {
    dispatch({ type: actions.GET_LAST_BILL, target: 'lastBill' });
    const response = await BillsService.getLastBill();
    if (response.ok) {
      dispatch(privateActionCreators.getLastBillSuccess(response.data[0]));
    } else {
      dispatch(privateActionCreators.getLastBillFailure(response.data.error));
    }
  },
  setDigitalBilling: billingData => dispatch =>
    dispatch({ type: actions.SET_DIGITAL_BILLING, payload: billingData }),
  digitalBillingUpdate: email => async (dispatch, getState) => {
    dispatch({ type: actions.UPDATE_DIGITAL_BILLING, target: 'digitalBilling' });
    const response = await BillsService.digitalBillingUpdate(email);
    if (response.ok) {
      dispatch(
        privateActionCreators.digitalBillingUpdateSuccess({
          ...getState().bills.digitalBilling,
          contact_emails: [email]
        })
      );
    } else {
      dispatch(privateActionCreators.digitalBillingUpdateFailure(response.data.error));
    }
  },
  digitalBillingUnsubscription: email => async dispatch => {
    dispatch({ type: actions.UNSUBSCRIBE_DIGITAL_BILLING, target: 'digitalBilling' });
    const response = await BillsService.digitalBillingUnsubscription(email);
    if (response.ok) {
      dispatch(
        privateActionCreators.digitalBillingUnsubscriptionSuccess({
          adherido_factura_digital: false,
          contact_emails: []
        })
      );
    } else {
      dispatch(privateActionCreators.digitalBillingUnsubscriptionFailure(response.data.error));
    }
  },
  digitalBillingSubscription: email => async dispatch => {
    dispatch({ type: actions.SUBSCRIBE_DIGITAL_BILLING, target: 'digitalBilling' });
    const response = await BillsService.digitalBillingSubscription(email);
    if (response.ok) {
      dispatch(
        privateActionCreators.digitalBillingSubscriptionSuccess({
          adherido_factura_digital: true,
          contact_emails: [email]
        })
      );
    } else {
      dispatch(privateActionCreators.digitalBillingSubscriptionFailure(response.data.error));
    }
  }
};

export default actionCreators;
