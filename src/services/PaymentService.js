import api from 'config/api';

export default {
  getPayments: () => api.get('historico_de_pagos')
};
