import api from 'config/api';

const putDigitalBills = newEmail => api.put('factura_digital', newEmail);
const deleteDigitalBills = () => api.delete('factura_digital');
const postDigitalBills = email => api.post('factura_digital', email);

export default {
  putDigitalBills,
  deleteDigitalBills,
  postDigitalBills
};
