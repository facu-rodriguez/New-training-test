import React from 'react';
import { createPortal } from 'react-dom';
import { UTButton } from '@widergy/energy-ui';

import styles from './styles.module.scss';

const Modal = ({
  actionOnly,
  cancelOnly,
  cancelText,
  children,
  ctaText,
  disableCancel = false,
  disableCta = false,
  handleCancel,
  handleCta
}) =>
  createPortal(
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {children}
        <div className={styles.buttonBox}>
          {!actionOnly && (
            <UTButton disabled={disableCancel} classNames={{ root: styles.cancel }} onClick={handleCancel}>
              {cancelText || 'Cancel'}
            </UTButton>
          )}
          {!cancelOnly && (
            <UTButton disabled={disableCta} classNames={{ root: styles.cta }} onClick={handleCta}>
              {ctaText || 'Action'}
            </UTButton>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );

export default Modal;
