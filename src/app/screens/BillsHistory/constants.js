import i18 from 'i18next';

export const columns = [
  {
    name: i18.t('Bills:billId'),
    key: 'bill_id',
    position: 'left'
  },
  {
    name: i18.t('Bills:payment_method'),
    key: 'payment_method',
    size: 'xlarge'
  },
  {
    name: i18.t('Bills:period'),
    key: 'period',
    size: 'xlarge'
  },
  {
    name: i18.t('Bills:amount_to_pay'),
    key: 'amount_to_pay',
    position: 'right',
    size: 'large'
  }
];
