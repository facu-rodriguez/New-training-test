import i18 from 'i18next';

export const columnsIdinir = [
  {
    name: i18.t('Payments:keys:datetime'),
    key: 'datetime',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:keys:client_number'),
    key: 'client_number',
    size: 'large'
  },
  {
    name: i18.t('Payments:keys:status_label'),
    key: 'status_label',
    size: 'large'
  },
  {
    name: i18.t('Payments:keys:amount'),
    key: 'amount'
  }
];

export const columnsSegba = [
  {
    name: i18.t('Payments:keys:datetime'),
    key: 'datetime',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:keys:payment_method'),
    key: 'payment_method',
    size: 'xlarge'
  },
  {
    name: i18.t('Payments:keys:status_label'),
    key: 'status_label',
    size: 'large'
  }
];
