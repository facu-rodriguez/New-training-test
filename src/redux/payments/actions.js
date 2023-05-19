import { createTypes, completeTypes } from 'redux-recompose';

import PaymentService from 'services/PaymentService';

export const actions = createTypes(completeTypes(['GET_PAYMENTS'], ['SET_CURRENT_PAYMENT']), '@@PAYMENTS');

const privateActionCreators = {
  getPaymentsSuccess: payload => ({ type: actions.GET_PAYMENTS_SUCCESS, payload, target: 'paymentsHistory' }),
  getPaymentsFailure: payload => ({ type: actions.GET_PAYMENTS_FAILURE, payload, target: 'paymentsHistory' })
};

export const actionCreators = {
  setCurrentPayment: payment => dispatch => dispatch({ type: actions.SET_CURRENT_PAYMENT, payload: payment }),
  getPayments: () => async dispatch => {
    dispatch({ type: actions.GET_PAYMENTS, target: 'paymentsHistory' });
    const response = await PaymentService.getPayments();
    if (response.ok) {
      dispatch(privateActionCreators.getPaymentsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.getPaymentsFailure(response.data.error));
    }
  }
};

export default actionCreators;
