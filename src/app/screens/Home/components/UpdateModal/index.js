import React, { forwardRef, useState } from 'react';
import { UTButton } from '@widergy/energy-ui';
import { func } from 'prop-types';

import { accountType } from 'types/accountTypes';

import styles from '../../styles.module.scss';

const UpdateModal = forwardRef(({ account, onNewEmail, onCancel }, ref) => {
  const [newEmail, setNewEmail] = useState('');

  return (
    <div className={styles.modalComponent} ref={ref}>
      <h1>Modificar adhesión a factura digital</h1>
      <p>su email actual es: {account.contact_emails[0]}</p>
      <p>Ingrese el nuevo email a adherir: </p>
      <input type="text" value={newEmail} onInput={event => setNewEmail(event.target.value)} />
      <UTButton onClick={onCancel}>Cancelar gil</UTButton>
      <UTButton onClick={() => onNewEmail([newEmail])}>Mandale mecha</UTButton>
    </div>
  );
});

UpdateModal.propTypes = {
  account: accountType,
  onNewEmail: func,
  onCancel: func
};

export default UpdateModal;
