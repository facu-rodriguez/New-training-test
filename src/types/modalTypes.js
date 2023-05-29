import { shape, string, bool, func } from 'prop-types';

export const modalTypes = shape({
  showModal: bool,
  cancelText: string,
  ctaText: string,
  handleCta: func
});
