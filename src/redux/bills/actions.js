import { createTypes, completeTypes } from 'redux-recompose';

import BillsService from 'services/billsService';
import digitalBillsService from 'services/digitalBillsService';

import { defaultState } from './reducer';

export const actions = createTypes(
  completeTypes([
    'GET_BILLS',
    'GET_LAST_BILL',
    'PUT_DIGITAL_BILLS',
    'DELETE_DIGITAL_BILLS',
    'POST_DIGITAL_BILLS'
  ]),
  '@@BILLS'
);

const privateActionCreators = {
  getBillsSuccess: payload => ({ type: actions.GET_BILLS_SUCCESS, payload, target: 'billsHistory' }),
  getBillsFailure: payload => ({ type: actions.GET_BILLS_FAILURE, payload, target: 'billsHistory' }),
  getLastBillSuccess: payload => ({ type: actions.GET_LAST_BILL_SUCCESS, payload, target: 'lastBill' }),
  getLastBillFailure: payload => ({ type: actions.GET_LAST_BILL_FAILURE, payload, target: 'lastBill' }),
  putDigitalBillsSuccess: payload => ({
    type: actions.PUT_DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'digitalBills'
  }),
  putDigitalBillsFailure: error => ({
    type: actions.PUT_DIGITAL_BILLS_FAILURE,
    error,
    target: 'digitalBills'
  }),
  deleteDigitalBillsSuccess: payload => ({
    type: actions.DELETE_DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'digitalBills'
  }),
  deleteDigitalBillsFailure: error => ({
    type: actions.DELETE_DIGITAL_BILLS_FAILURE,
    error,
    target: 'digitalBills'
  }),
  postDigitalBillsSuccess: payload => ({
    type: actions.POST_DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'digitalBills'
  }),
  postDigitalBillsFailure: error => ({
    type: actions.POST_DIGITAL_BILLS_FAILURE,
    error,
    target: 'digitalBills'
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
  putDigitalBills: newData => async dispatch => {
    dispatch({ type: actions.PUT_DIGITAL_BILLS, target: 'digitalBills' });
    const response = await digitalBillsService.putDigitalBills(newData);
    if (response.ok) {
      dispatch(privateActionCreators.putDigitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.putDigitalBillsFailure(response.data.error));
    }
  },
  deleteDigitalBills: () => async dispatch => {
    dispatch({ type: actions.DELETE_DIGITAL_BILLS, target: 'digitalBills' });
    const response = await digitalBillsService.deleteDigitalBills();
    if (response.ok) {
      dispatch(privateActionCreators.deleteDigitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.deleteDigitalBillsFailure(response.data.error));
    }
  },
  postDigitalBills: data => async dispatch => {
    dispatch({ type: actions.POST_DIGITAL_BILLS, target: 'digitalBills' });
    const response = await digitalBillsService.postDigitalBills(data);
    if (response.ok) {
      dispatch(privateActionCreators.postDigitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.postDigitalBillsFailure(response.data.error));
    }
  },
  clearDigitalBills: type => dispatch => {
    dispatch({ type: actions[type], payload: defaultState.digitalBills, target: 'digitalBills' });
  }
};

export default actionCreators;
