import { createTypes, completeTypes } from 'redux-recompose';

import digitalBillsService from 'services/digitalBillsService';

export const actions = createTypes(completeTypes(['DIGITAL_BILLS']), '@@DIGITAL_BILLS');

const privateActionCreators = {
  digitalBillsSuccess: payload => ({
    type: actions.DIGITAL_BILLS_SUCCESS,
    payload,
    target: 'digitalBills'
  }),
  digitalBillsFailure: error => ({
    type: actions.DIGITAL_BILLS_FAILURE,
    error,
    target: 'digitalBills'
  })
};

export const actionCreators = {
  putDigitalBills: newData => async dispatch => {
    dispatch({ type: actions.DIGITAL_BILLS, target: 'digitalBills' });
    const response = await digitalBillsService.putDigitalBills(newData);
    if (response.ok) {
      dispatch(privateActionCreators.digitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.digitalBillsFailure(response.data.error));
    }
  },
  deleteDigitalBills: () => async dispatch => {
    dispatch({ type: actions.DIGITAL_BILLS, target: 'digitalBills' });
    const response = await digitalBillsService.deleteDigitalBills();
    if (response.ok) {
      dispatch(privateActionCreators.digitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.digitalBillsFailure(response.data.error));
    }
  },
  postDigitalBills: data => async dispatch => {
    dispatch({ type: actions.DIGITAL_BILLS, target: 'digitalBills' });
    const response = await digitalBillsService.postDigitalBills(data);
    if (response.ok) {
      dispatch(privateActionCreators.digitalBillsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.digitalBillsFailure(response.data.error));
    }
  }
};

export default actionCreators;
