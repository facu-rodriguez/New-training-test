import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  digitalBillsLoading: null,
  digitalBills: { mensaje: '' },
  digitalBillsError: null
};

const reducerDescription = {
  primaryActions: [actions.DIGITAL_BILLS]
};

export const reducer = createReducer(defaultState, completeReducer(reducerDescription));
