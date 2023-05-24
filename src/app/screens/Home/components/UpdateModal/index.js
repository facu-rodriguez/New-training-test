import React, { forwardRef, useState } from 'react';
import { UTButton } from '@widergy/energy-ui';
import { func } from 'prop-types';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const UpdateModal = forwardRef(({ account, onUpdateEmails, onCancel }, ref) => {
  const [newEmail, setNewEmail] = useState('');

  return (
    <div className={styles.modalComponent} ref={ref}>
      <h1>{i18.t('UpdateModal:title')}</h1>
      <p>
        {i18.t('UpdateModal:currentEmail')}
        {account.contact_emails[0]}
      </p>
      <p>{i18.t('UpdateModal:inputTitle')}</p>
      <input type="text" value={newEmail} onInput={event => setNewEmail(event.target.value)} />
      <UTButton onClick={onCancel}>{i18.t('UpdateModal:cancel')}</UTButton>
      <UTButton onClick={() => onUpdateEmails([newEmail], account.cuenta_id)}>
        {i18.t('UpdateModal:accept')}
      </UTButton>
    </div>
  );
});

UpdateModal.propTypes = {
  account: accountType,
  onUpdateEmails: func,
  onCancel: func
};

export default UpdateModal;
