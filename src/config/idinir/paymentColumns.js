import i18 from 'i18next';

export const columns = [
  {
    name: i18.t('Payments:datetime'),
    key: 'datetime'
  },
  {
    name: i18.t('Payments:client_number'),
    key: 'client_number',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:status_label'),
    key: 'status_label'
  },
  {
    name: i18.t('Payments:amount'),
    key: 'amount'
  }
];
