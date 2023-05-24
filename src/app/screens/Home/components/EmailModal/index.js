import { UTButton, UTLabel } from '@widergy/energy-ui';
import { func, string } from 'prop-types';
import React, { Fragment, useState } from 'react';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const EmailModal = ({ account, modalType, onCancel, onAccept }) => {
  let modalSettings = {};
  const [newEmail, setNewEmail] = useState('');

  switch (modalType) {
    case 'update':
      modalSettings = {
        title: i18.t('UpdateModal:title'),
        showInput: true,
        inputTitle: i18.t('UpdateModal:inputTitle'),
        currentEmail: i18.t('UpdateModal:currentEmail'),
        cancel: i18.t('UpdateModal:cancel'),
        accept: i18.t('UpdateModal:accept')
      };
      break;
    case 'delete':
      modalSettings = {
        title: i18.t('DeleteModal:title'),
        showInput: false,
        body: i18.t('DeleteModal:body'),
        cancel: i18.t('DeleteModal:cancel'),
        accept: i18.t('DeleteModal:accept')
      };
      break;
    case 'create':
      modalSettings = {
        title: i18.t('CreateModal:title'),
        showInput: true,
        inputTitle: i18.t('CreateModal:inputTitle'),
        cancel: i18.t('CreateModal:cancel'),
        accept: i18.t('CreateModal:accept')
      };
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <UTLabel classes={{ root: styles.modalTitle }}>{modalSettings.title}</UTLabel>
      {modalType === 'update' ? (
        <div className={styles.modalSection}>
          <UTLabel classes={{ root: styles.modalText }}>{modalSettings.currentEmail}</UTLabel>
          <UTLabel classes={{ root: styles.modalInfo }}>{account.contact_emails[0]}</UTLabel>
        </div>
      ) : modalType === 'delete' ? (
        <UTLabel>{modalSettings.body}</UTLabel>
      ) : null}
      {modalSettings.showInput ? (
        <div className={styles.modalSection}>
          <UTLabel classes={{ root: styles.modalText }}>{modalSettings.inputTitle}</UTLabel>
          <input
            className={styles.modalInput}
            type="text"
            value={newEmail}
            onInput={event => setNewEmail(event.target.value)}
          />
        </div>
      ) : null}
      <div className={styles.modalSection}>
        <UTButton onClick={onCancel}>{i18.t('UpdateModal:cancel')}</UTButton>
        <UTButton onClick={() => onAccept([newEmail], account.cuenta_id)}>
          {i18.t('UpdateModal:accept')}
        </UTButton>
      </div>
    </Fragment>
  );
};

EmailModal.propTypes = {
  account: accountType,
  modalType: string,
  onCancel: func,
  onAccept: func
};

export default EmailModal;
