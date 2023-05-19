import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  payments: []
};

const reducerDescription = {
  primaryActions: [actions.GET_PAYMENTS, actions.SET_SELECTED_PAYMENT],
  override: {
    [actions.SET_SELECTED_PAYMENT]: (state, action) => Immutable.merge(state, { payment: action.payload })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
