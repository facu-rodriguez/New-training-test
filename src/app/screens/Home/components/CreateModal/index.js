import React, { forwardRef, useState } from 'react';
import { UTButton } from '@widergy/energy-ui';
import { func } from 'prop-types';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const CreateModal = forwardRef(({ account, onCreateEmails, onCancel }, ref) => {
  const [newEmail, setNewEmail] = useState('');

  return (
    <div className={styles.modalComponent} ref={ref}>
      <h1>{i18.t('CreateModal:title')}</h1>
      <p>{i18.t('CreateModal:inputTitle')}</p>
      <input type="text" value={newEmail} onInput={event => setNewEmail(event.target.value)} />
      <UTButton onClick={onCancel}>{i18.t('CreateModal:cancel')}</UTButton>
      <UTButton onClick={() => onCreateEmails([newEmail], account.cuenta_id)}>
        {i18.t('CreateModal:accept')}
      </UTButton>
    </div>
  );
});

CreateModal.propTypes = {
  account: accountType,
  onCreateEmails: func,
  onCancel: func
};

export default CreateModal;
