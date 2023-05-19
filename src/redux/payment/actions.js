import { createTypes, completeTypes } from 'redux-recompose';

import PaymentsService from 'services/PaymentsService';

export const actions = createTypes(completeTypes(['GET_PAYMENTS'], ['SET_CURRENT_PAYMENT']), '@@PAYMENTS');

const privateActionCreators = {
  getPaymentsSuccess: payload => ({ type: actions.GET_PAYMENTS_SUCCESS, payload, target: 'paymentHistory' }),
  getPaymentsFailure: payload => ({ type: actions.GET_PAYMENTS_FAILURE, payload, target: 'paymentHistory' })
};

export const actionCreators = {
  setCurrentPayment: payment => dispatch => dispatch({ type: actions.SET_CURRENT_PAYMENT, payload: payment }),
  getPayments: () => async dispatch => {
    dispatch({ type: actions.GET_PAYMENTS, target: 'paymentHistory' });
    const response = await PaymentsService.getPayments();
    if (response.ok) {
      dispatch(privateActionCreators.getPaymentsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.getPaymentsFailure(response.data.error));
    }
  }
};

export default actionCreators;
