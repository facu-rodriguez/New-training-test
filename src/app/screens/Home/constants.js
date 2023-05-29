import i18 from 'i18next';

export const modalState = {
  modify: {
    showModal: true,
    action: 'modify',
    cancelText: i18.t('digitalBills:modal.cancel'),
    ctaText: i18.t('digitalBills:modal.accept'),
    title: i18.t('digitalBills:modal.modifyTitle'),
    body: i18.t('digitalBills:modal.modifyCurrent')
  },
  subscribe: {
    showModal: true,
    action: 'subscribe',
    cancelText: i18.t('digitalBills:modal.cancel'),
    ctaText: i18.t('digitalBills:modal.accept'),
    title: i18.t('digitalBills:modal.subscribeTitle'),
    body: i18.t('digitalBills:modal.subscribeBody')
  },
  unsubscribe: {
    showModal: true,
    action: 'unsubscribe',
    cancelText: i18.t('digitalBills:modal.cancel'),
    ctaText: i18.t('digitalBills:modal.accept'),
    title: i18.t('digitalBills:modal.unsubscribeTitle'),
    body: i18.t('digitalBills:modal.unsubscribeBody')
  },
  closed: {
    showModal: false
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
