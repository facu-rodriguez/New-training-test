import i18 from 'i18next';

import Colors from './scss/_colors.scss';

export default {
  Colors,
  someConfiguration: {
    active: true
  },
  accountSelect: {
    withAccountId: false
  },
  initialView: {
    paymentHistoryButton: { enabled: true },
    billsHistoryButton: { enabled: false }
  },
  billsHistory: {
    enabled: false
  },
  PaymentColumns: [
    {
      name: i18.t('Payments:datetime'),
      key: 'datetime'
    },
    {
      name: i18.t('Payments:paymentMethod'),
      key: 'payment_method'
    },
    {
      name: i18.t('Payments:statusLabel'),
      key: 'status_label'
    }
  ]
};
