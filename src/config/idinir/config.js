import i18 from 'i18next';

import Colors from './scss/_colors.scss';

export default {
  Colors,
  someConfiguration: {
    active: true
  },
  accountSelect: {
    withAccountId: true
  },
  initialView: {
    paymentHistoryButton: { enabled: false },
    billsHistoryButton: { enabled: true }
  },
  billsHistory: {
    enabled: true
  },
  PaymentColumns: [
    {
      name: i18.t('Payments:datetime'),
      key: 'datetime'
    },
    {
      name: i18.t('Payments:clientNumber'),
      key: 'client_number',
      size: 'xlarge'
    },
    {
      name: i18.t('Payments:statusLabel'),
      key: 'status_label'
    },
    {
      name: i18.t('Payments:amount'),
      key: 'amount'
    }
  ]
};
