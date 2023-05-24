import i18 from 'i18next';

import Colors from './scss/_colors.scss';

const columns = [
  {
    name: i18.t('Payments:PaymentDetail:datetime'),
    key: 'datetime',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:PaymentDetail:payment_method'),
    key: 'payment_method',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:PaymentDetail:status_label'),
    key: 'status_label',
    size: 'large'
  }
];

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
  columns
};
