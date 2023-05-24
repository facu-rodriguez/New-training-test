import { shape, string, bool } from 'prop-types';

const digital = shape({
  mensaje: string
});

export const digitalTypes = shape({
  digitalBillsLoading: bool,
  digitalBills: digital,
  digitalBillsError: bool
});
