import i18 from 'i18next';

import appConfig from 'config/appConfig';

export const columns = appConfig.paymentsHistory.fields.map(field => ({
  name: i18.t(`Payments:${field}`),
  key: `${field}`,
  size: 'xlarge'
}));
