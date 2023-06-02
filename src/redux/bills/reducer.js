import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  billsHistory: [],
  billsHistoryLoading: false,
  lastBill: {},
  digitalBillsLoading: null,
  digitalBills: { mensaje: '' },
  digitalBillsError: null
};

const reducerDescription = {
  primaryActions: [
    actions.GET_BILLS,
    actions.GET_LAST_BILL,
    actions.PUT_DIGITAL_BILLS,
    actions.DELETE_DIGITAL_BILLS,
    actions.POST_DIGITAL_BILLS
  ],
  override: {
    [actions.DELETE_DIGITAL_BILLS]: (state, action) =>
      Immutable.merge(state, { digitalBills: action.payload || { mensaje: null } }),
    [actions.PUT_DIGITAL_BILLS]: (state, action) =>
      Immutable.merge(state, { digitalBills: action.payload || { mensaje: null } }),
    [actions.POST_DIGITAL_BILLS]: (state, action) =>
      Immutable.merge(state, { digitalBills: action.payload || { mensaje: null } })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
