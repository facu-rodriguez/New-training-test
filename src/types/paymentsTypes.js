import { shape, string } from 'prop-types';

export const paymentType = shape({
  client_number: string,
  datetime: string,
  status: string,
  payment_code: string,
  payment_method: string,
  amount: string, // number,
  status_label: string
});
