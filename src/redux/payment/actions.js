import { createTypes, completeTypes } from 'redux-recompose';

import PaymentsService from 'services/PaymentsService';
import { formatNumber } from 'app/screens/PaymentsHistory/utils/numberUtils';
import { getDate } from 'app/screens/PaymentsHistory/utils/dateUtils';

export const actions = createTypes(completeTypes(['GET_PAYMENTS'], ['SET_CURRENT_PAYMENT']), '@@PAYMENTS');

const privateActionCreators = {
  getPaymentsSuccess: payload => ({ type: actions.GET_PAYMENTS_SUCCESS, payload, target: 'payments' }),
  getPaymentsFailure: error => ({ type: actions.GET_PAYMENTS_FAILURE, error, target: 'payments' })
};

export const actionCreators = {
  setCurrentPayment: payment => dispatch => dispatch({ type: actions.SET_CURRENT_PAYMENT, payload: payment }),
  getPayments: () => async dispatch => {
    dispatch({ type: actions.GET_PAYMENTS, target: 'payments' });
    const response = await PaymentsService.getPayments();
    if (response.ok) {
      const formattedPayments = response.data?.map(bill => ({
        ...bill,
        datetime: getDate(bill.datetime),
        amount: `$ ${formatNumber(bill.amount)}`
      }));
      const sortedPayments = formattedPayments
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .map(bill => ({
          ...bill,
          datetime: getDate(bill.datetime, 'sort')
        }));

      dispatch(privateActionCreators.getPaymentsSuccess(sortedPayments));
    } else {
      dispatch(privateActionCreators.getPaymentsFailure(response.data.error));
    }
  }
};

export default actionCreators;
