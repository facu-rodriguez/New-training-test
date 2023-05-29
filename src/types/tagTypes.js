import { shape, string } from 'prop-types';

export const tagTypes = shape({
  text: string,
  status: string
});
