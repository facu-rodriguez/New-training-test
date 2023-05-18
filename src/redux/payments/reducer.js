import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  payments: []
};

const reducerDescription = {
  primaryActions: [actions.GET_PAYMENTS],
  override: {}
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
