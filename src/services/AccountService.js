import api from 'config/api';

export default {
  getAccounts: () => api.get('cuentas_asociadas'),
  updateEmails: data => api.put('factura_digital', data),
  deleteEmails: data => api.delete('factura_digital', data),
  createEmails: data => api.ṕost('factura_digital', data)
};
