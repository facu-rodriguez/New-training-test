import { createTypes, completeTypes } from 'redux-recompose';

import digitalBillsService from 'services/digitalBillsService';

import { defaultState } from './reducer';

export const actions = createTypes(
  completeTypes(['PUT_DIGITAL_BILLS', 'DELETE_DIGITAL_BILLS', 'POST_DIGITAL_BILLS']),
  '@@DIGITAL_BILLS'
);

const privateActionCreators = {
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
    dispatch(privateActionCreators[type](defaultState.digitalBills));
  }
};

export default actionCreators;
