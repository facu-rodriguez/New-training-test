import i18 from 'i18next';

export const modalState = {
  modify: {
    action: 'modify',
    title: i18.t('digitalBills:modal.modifyTitle'),
    body: i18.t('digitalBills:modal.modifyCurrent')
  },
  subscribe: {
    action: 'subscribe',
    title: i18.t('digitalBills:modal.subscribeTitle'),
    body: i18.t('digitalBills:modal.subscribeBody')
  },
  unsubscribe: {
    action: 'unsubscribe',
    title: i18.t('digitalBills:modal.unsubscribeTitle'),
    body: i18.t('digitalBills:modal.unsubscribeBody')
  }
};

export const tagState = {
  success: {
    status: 'success',
    text: i18.t('digitalBills:digitalBillSubscribed')
  },
  error: {
    status: 'error',
    text: i18.t('digitalBills:digitalBillNotSubscribed')
  }
};
