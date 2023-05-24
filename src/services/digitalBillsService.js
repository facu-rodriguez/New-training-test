import api from 'config/api';

export default {
  putDigitalBills: newEmail => api.put('factura_digital', newEmail),
  deleteDigitalBills: () => api.delete('factura_digital'),
  postDigitalBills: email => api.post('factura_digital', email)
};
