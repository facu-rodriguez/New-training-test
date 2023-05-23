import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {};

const reducerDescription = {
  primaryActions: [actions.PUT_DIGITAL_BILLS, actions.DELETE_DIGITAL_BILLS, actions.POST_DIGITAL_BILLS]
};

export const reducer = createReducer(defaultState, completeReducer(reducerDescription));
