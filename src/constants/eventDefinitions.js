import { actions as accountsActions } from 'redux/accounts/actions';
import { event } from 'utils/analyticsUtils';

import { categories, actions, labels } from './analytics';

const getAccountsSuccess = () =>
  event(categories.CUENTAS, actions.RECUPERAR_CUENTAS, labels.RECUPERAR_CUENTAS_OK);

export default {
  [accountsActions.GET_ACCOUNTS]: getAccountsSuccess
};
