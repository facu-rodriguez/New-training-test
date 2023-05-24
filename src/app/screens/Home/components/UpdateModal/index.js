import React, { forwardRef, useState } from 'react';
import { UTButton, UTLabel } from '@widergy/energy-ui';
import { func } from 'prop-types';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const UpdateModal = forwardRef(({ account, onUpdateEmails, onCancel }, ref) => {
  const [newEmail, setNewEmail] = useState('');

  return (
    <div className={styles.modalComponent} ref={ref}>
      <UTLabel classes={{ root: styles.modalTitle }}>{i18.t('UpdateModal:title')}</UTLabel>
      <div className={styles.modalSection}>
        <UTLabel classes={{ root: styles.modalText }}>{i18.t('UpdateModal:currentEmail')}</UTLabel>
        <UTLabel classes={{ root: styles.modalInfo }}>{account.contact_emails[0]}</UTLabel>
      </div>
      <div className={styles.modalSection}>
        <UTLabel classes={{ root: styles.modalText }}>{i18.t('UpdateModal:inputTitle')}</UTLabel>
        <input
          className={styles.modalInput}
          type="text"
          value={newEmail}
          onInput={event => setNewEmail(event.target.value)}
        />
      </div>
      <div className={styles.modalSection}>
        <UTButton onClick={onCancel}>{i18.t('UpdateModal:cancel')}</UTButton>
        <UTButton onClick={() => onUpdateEmails([newEmail], account.cuenta_id)}>
          {i18.t('UpdateModal:accept')}
        </UTButton>
      </div>
    </div>
  );
});

UpdateModal.propTypes = {
  account: accountType,
  onUpdateEmails: func,
  onCancel: func
};

export default UpdateModal;
