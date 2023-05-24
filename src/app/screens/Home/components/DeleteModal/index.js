import React, { forwardRef } from 'react';
import { UTButton } from '@widergy/energy-ui';
import { func } from 'prop-types';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const DeleteModal = forwardRef(({ account, onDeleteEmails, onCancel }, ref) => (
  <div className={styles.modalComponent} ref={ref}>
    <h1>Baja de factura digital</h1>
    <p>Usted está a punto de deshaderirse de factura digital</p>
    <UTButton onClick={onCancel}>Cancelar</UTButton>
    <UTButton onClick={() => onDeleteEmails([], account.cuenta_id)}>Aceptar</UTButton>
  </div>
));

DeleteModal.propTypes = {
  account: accountType,
  onDeleteEmails: func,
  onCancel: func
};

export default DeleteModal;
