import React, { forwardRef } from 'react';
import { UTButton } from '@widergy/energy-ui';
import { func } from 'prop-types';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const DeleteModal = forwardRef(({ account, onDeleteEmails, onCancel }, ref) => (
  <div className={styles.modalComponent} ref={ref}>
    <h1>{i18.t('DeleteModal:title')}</h1>
    <p>{i18.t('DeleteModal:body')}</p>
    <UTButton onClick={onCancel}>{i18.t('DeleteModal:cancel')}</UTButton>
    <UTButton onClick={() => onDeleteEmails([], account.cuenta_id)}>{i18.t('DeleteModal:accept')}</UTButton>
  </div>
));

DeleteModal.propTypes = {
  account: accountType,
  onDeleteEmails: func,
  onCancel: func
};

export default DeleteModal;
