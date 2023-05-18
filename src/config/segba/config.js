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
  paymentsHistory: {
    fields: ['datetime', 'payment_method', 'status_label']
  }
};
