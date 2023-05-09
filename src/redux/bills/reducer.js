import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  billsHistory: [],
  billsHistoryLoading: false,
  lastBill: {}
};

const reducerDescription = {
  primaryActions: [actions.GET_BILLS, actions.GET_LAST_BILL],
  override: {}
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
