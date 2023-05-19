import { createTypes, completeTypes } from 'redux-recompose';

import PaymentService from 'services/PaymentService';

export const actions = createTypes(completeTypes(['GET_PAYMENTS', 'SET_SELECTED_PAYMENT']), '@@PAYMENTS');

const privateActionCreators = {
  getPaymentsSuccess: payload => ({ type: actions.GET_PAYMENTS_SUCCESS, payload, target: 'payments' }),
  getPaymentsFailure: payload => ({ type: actions.GET_PAYMENTS_FAILURE, payload, target: 'payments' })
};

export const actionCreators = {
  getPayments: () => async dispatch => {
    dispatch({ type: actions.GET_PAYMENTS, target: 'payments' });
    const response = await PaymentService.getPayments();
    if (response.ok) {
      dispatch(privateActionCreators.getPaymentsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.getPaymentsFailure(response.data.error));
    }
  },
  setSelectedPayment: payment => dispatch =>
    dispatch({ type: actions.SET_SELECTED_PAYMENT, payload: payment })
};

export default actionCreators;
