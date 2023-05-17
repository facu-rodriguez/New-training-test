import api from 'config/api';

export default {
  getBills: () => api.get('listado_de_facturas'),
  getLastBill: () => api.get('ultima_factura')
};
