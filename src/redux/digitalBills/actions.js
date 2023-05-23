import { createTypes, completeTypes } from 'redux-recompose';

import digitalBillsService from 'services/digitalBillsService';

export const actions = createTypes(
  completeTypes(['PUT_DIGITAL_BILLS', 'DELETE_DIGITAL_BILLS', 'POST_DIGITAL_BILLS']),
  '@@DIGITAL_BILLS'
);

const privateActionCreators = {
  putDigitalBillsSuccess: payload => ({
    type: actions.PUT_DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'putDigitalBills'
  }),
  putDigitalBillsFailure: error => ({
    type: actions.PUT_DIGITAL_BILLS_FAILURE,
    error,
    target: 'putDigitalBills'
  }),
  deleteDigitalBillsSuccess: payload => ({
    type: actions.DELETE_DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'deleteDigitalBills'
  }),
  deleteDigitalBillsFailure: error => ({
    type: actions.DELETE_DIGITAL_BILLS_FAILURE,
    error,
    target: 'deleteDigitalBills'
  }),
  postDigitalBillsSuccess: payload => ({
    type: actions.POST_DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'postDigitalBills'
  }),
  postDigitalBillsFailure: error => ({
    type: actions.POST_DIGITAL_BILLS_FAILURE,
    error,
    target: 'postDigitalBills'
  })
};

export const actionCreators = {
  putDigitalBills: newData => async dispatch => {
    dispatch({ type: actions.PUT_DIGITAL_BILLS, target: 'putDigitalBills' });
    const response = await digitalBillsService.putDigitalBills(newData);
    if (response.ok) {
      dispatch(privateActionCreators.putDigitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.putDigitalBillsFailure(response.data.error));
    }
  },
  deleteDigitalBills: () => async dispatch => {
    dispatch({ type: actions.DELETE_DIGITAL_BILLS, target: 'deleteDigitalBills' });
    const response = await digitalBillsService.deleteDigitalBills();
    if (response.ok) {
      dispatch(privateActionCreators.deleteDigitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.deleteDigitalBillsFailure(response.data.error));
    }
  },
  postDigitalBills: data => async dispatch => {
    dispatch({ type: actions.POST_DIGITAL_BILLS, target: 'postDigitalBills' });
    const response = await digitalBillsService.postDigitalBills(data);
    if (response.ok) {
      dispatch(privateActionCreators.postDigitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.postDigitalBillsFailure(response.data.error));
    }
  }
};

export default actionCreators;
