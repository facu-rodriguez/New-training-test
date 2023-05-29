import api from 'config/api';

export default {
  getBills: () => api.get('listado_de_facturas'),
  getLastBill: () => api.get('ultima_factura'),
  digitalBillingUpdate: email => api.put('factura_digital', email),
  digitalBillingSubscription: email => api.post('factura_digital', email),
  digitalBillingUnsubscription: email => api.delete('factura_digital', email)
};
