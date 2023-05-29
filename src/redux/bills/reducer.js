import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  billsHistory: [],
  billsHistoryLoading: false,
  digitalBilling: {},
  lastBill: {}
};

const reducerDescription = {
  primaryActions: [
    actions.GET_BILLS,
    actions.GET_LAST_BILL,
    actions.UPDATE_DIGITAL_BILLING,
    actions.SUBSCRIBE_DIGITAL_BILLING,
    actions.UNSUBSCRIBE_DIGITAL_BILLING
  ],
  override: {
    [actions.SET_DIGITAL_BILLING]: (state, action) =>
      Immutable.merge(state, { digitalBilling: action.payload })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
