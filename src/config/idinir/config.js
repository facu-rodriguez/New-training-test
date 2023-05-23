import i18 from 'i18next';

import Colors from './scss/_colors.scss';

export const columnsIdinir = [
  {
    name: i18.t('Payments:PaymentDetail:datetime'),
    key: 'datetime',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:PaymentDetail:client_number'),
    key: 'client_number',
    size: 'large'
  },
  {
    name: i18.t('Payments:PaymentDetail:status_label'),
    key: 'status_label',
    size: 'large'
  },
  {
    name: i18.t('Payments:PaymentDetail:amount'),
    key: 'amount'
  }
];

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
  }
};
