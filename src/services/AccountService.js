import api from 'config/api';

export default {
  getAccounts: () => api.get('cuentas_asociadas'),
  digitalBillingUpdate: email => api.put('factura_digital', email),
  digitalBillingSubscription: email => api.post('factura_digital', email),
  digitalBillingUnsubscription: email => api.delete('factura_digital', email)
};
