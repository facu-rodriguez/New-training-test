import Colors from './scss/_colors.scss';
import { columns as PaymentColumns } from './paymentColumns';

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
  PaymentColumns
};
