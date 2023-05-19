import Colors from './scss/_colors.scss';
import { columns as PaymentColumns } from './paymentColumns';

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
  PaymentColumns
};
