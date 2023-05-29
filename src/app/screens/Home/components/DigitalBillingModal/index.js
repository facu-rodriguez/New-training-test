import { UTLabel } from '@widergy/energy-ui';
import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

import Modal from 'app/components/Modal';
import { modalTypes } from 'types/modalTypes';

import styles from './styles.module.scss';

const DigitalBillingModal = ({
  children,
  contactEmails,
  disableCta,
  handleCancel,
  handleCta,
  modalState
}) => (
  <Modal
    cancelText={modalState.cancelText}
    ctaText={modalState.ctaText}
    disableCta={disableCta}
    handleCancel={handleCancel}
    handleCta={() => handleCta(modalState.action)}
  >
    <UTLabel classes={{ root: styles['modal-title'] }}>{modalState.title}</UTLabel>
    <div className={styles['modal-body']}>
      <UTLabel classes={{ root: styles['modal-content'] }}>{modalState.body}</UTLabel>
      {modalState.action === 'modify' &&
        contactEmails.map(email => (
          <UTLabel key={email} classes={{ root: styles['modal-emails'] }}>
            {email}
          </UTLabel>
        ))}
      {children}
    </div>
  </Modal>
);

DigitalBillingModal.propTypes = {
  contactEmails: arrayOf(string),
  disableCta: bool,
  handleCancel: func,
  handleCta: func,
  modalState: modalTypes
};

export default DigitalBillingModal;
