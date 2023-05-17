import { createTypes, completeTypes } from 'redux-recompose';

import BillsService from 'services/billsService';

export const actions = createTypes(completeTypes(['GET_BILLS', 'GET_LAST_BILL'], []), '@@BILLS');

const privateActionCreators = {
  getBillsSuccess: payload => ({ type: actions.GET_BILLS_SUCCESS, payload, target: 'billsHistory' }),
  getBillsFailure: payload => ({ type: actions.GET_BILLS_FAILURE, payload, target: 'billsHistory' }),
  getLastBillSuccess: payload => ({ type: actions.GET_LAST_BILL_SUCCESS, payload, target: 'lastBill' }),
  getLastBillFailure: payload => ({ type: actions.GET_LAST_BILL_FAILURE, payload, target: 'lastBill' })
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
  }
};

export default actionCreators;
