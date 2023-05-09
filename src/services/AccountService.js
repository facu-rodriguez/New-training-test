import api from 'config/api';

export default {
  getAccounts: () => api.get('cuentas_asociadas')
};
