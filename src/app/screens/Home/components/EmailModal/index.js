import { UTButton, UTLabel, UTTextInput } from '@widergy/energy-ui';
import { func, string } from 'prop-types';
import React, { Fragment, useState } from 'react';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';

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
        emailTip: i18.t('UpdateModal:emailTip'),
        exampleEmail: i18.t('UpdateModal:exampleEmail')
      };
      break;
    case 'delete':
      modalSettings = {
        title: i18.t('DeleteModal:title'),
        showInput: false,
        body: i18.t('DeleteModal:body')
      };
      break;
    case 'create':
      modalSettings = {
        title: i18.t('CreateModal:title'),
        showInput: true,
        inputTitle: i18.t('CreateModal:inputTitle'),
        emailTip: i18.t('CreateModal:emailTip'),
        exampleEmail: i18.t('CreateModal:exampleEmail')
      };
      break;
    default:
      break;
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [isValid, setIsValid] = useState(false);

  const validateEmail = value => {
    setNewEmail(value);
    setIsValid(emailRegex.test(value));
  };

  return (
    <Fragment>
      <UTLabel classes={{ root: styles.modalTitle }}>{modalSettings.title}</UTLabel>
      {modalType === 'update' && (
        <div className={styles.modalSection}>
          <UTLabel classes={{ root: styles.modalText }}>{modalSettings.currentEmail}</UTLabel>
          <UTLabel classes={{ root: styles.modalInfo }}>{account.contact_emails[0]}</UTLabel>
        </div>
      )}
      {modalType === 'delete' && <UTLabel>{modalSettings.body}</UTLabel>}
      {modalSettings.showInput && (
        <div className={styles.modalSection}>
          <UTLabel classes={{ root: styles.modalText }}>{modalSettings.inputTitle}</UTLabel>
          <UTTextInput
            type="text"
            label={modalSettings.exampleEmail}
            input={{ name: 'input', value: newEmail }}
            onChange={event => validateEmail(event.target.value)}
            helperText={!isValid && newEmail.length > 0 && modalSettings.emailTip}
            error={!isValid && newEmail.length > 0}
          />
        </div>
      )}
      <div className={styles.modalButtonSection}>
        <UTButton onClick={onCancel}>{i18.t('Commons:cancel')}</UTButton>
        <UTButton
          disabled={!isValid && modalType !== 'delete'}
          onClick={() => onAccept([newEmail], account.cuenta_id)}
        >
          {i18.t('Commons:accept')}
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
