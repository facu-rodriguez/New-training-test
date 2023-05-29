import { shape, bool, array } from 'prop-types';

export const digitalBillingType = shape({
  adherido_factura_digital: bool,
  contact_emails: array
});
