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
  paymentsHistory: {
    fields: ['datetime', 'client_number', 'status_label', 'amount']
  }
};
