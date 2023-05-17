import { shape, string, bool } from 'prop-types';

export const billType = shape({
  bill_id: string,
  bill_type: string,
  period: string,
  client_number: string,
  expiration_date: string,
  payment_method: string,
  status: string,
  amount_to_pay: string,
  downloadable: bool,
  message: string,
  issued_on: string
});
