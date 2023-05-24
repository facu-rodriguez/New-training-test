import { getDate } from './dateUtils';
import { formatNumber } from './numberUtils';

export const formatPaymentsUtils = payments => {
  const formattedPayments = payments.map(bill => ({
    ...bill,
    datetime: getDate(bill.datetime),
    amount: `$ ${formatNumber(bill.amount)}`
  }));

  const sortedPayments = [...formattedPayments]
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .map(bill => ({
      ...bill,
      datetime: getDate(bill.datetime, 'sort')
    }));

  return sortedPayments;
};
