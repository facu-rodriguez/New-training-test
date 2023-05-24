import React, { forwardRef, useState } from 'react';
import { UTButton } from '@widergy/energy-ui';
import { func } from 'prop-types';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const CreateModal = forwardRef(({ account, onCreateEmails, onCancel }, ref) => {
  const [newEmail, setNewEmail] = useState('');

  return (
    <div className={styles.modalComponent} ref={ref}>
      <h1>Adhesion a factura digital</h1>
      <p>Ingrese el email en el cual quiere recibir su factura</p>
      <input type="text" value={newEmail} onInput={event => setNewEmail(event.target.value)} />
      <UTButton onClick={onCancel}>Cancelar</UTButton>
      <UTButton onClick={() => onCreateEmails([newEmail], account.cuenta_id)}>Aceptar</UTButton>
    </div>
  );
});

CreateModal.propTypes = {
  account: accountType,
  onCreateEmails: func,
  onCancel: func
};

export default CreateModal;
