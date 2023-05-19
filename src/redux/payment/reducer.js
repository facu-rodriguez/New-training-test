import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  paymentHistory: [],
  paymentHistoryLoading: false,
  currentPayment: null
};

const reducerDescription = {
  primaryActions: [actions.GET_PAYMENTS],
  override: {
    [actions.SET_CURRENT_PAYMENT]: (state, action) =>
      Immutable.merge(state, { currentPayment: action.payload })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
