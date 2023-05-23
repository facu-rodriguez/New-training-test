import React from 'react';
import { array } from 'prop-types';
import i18 from 'i18next';
import { UTLabel } from '@widergy/energy-ui';

import DigitalBill from 'app/components/DigitalBill';

import styles from './styles.module.scss';

const AccountCard = ({ account }) => {
  const {
    cuenta_id: id,
    titular,
    direccion,
    adherido_factura_digital: adheridoFacturaDigital,
    contact_emails: contactEmails
  } = account;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <UTLabel className={styles.accountName} shade="04" variant="subtitle1" weight="semibold">
            {titular}
          </UTLabel>
        </div>
        <div className={styles.accountNumberAndAddres}>
          <UTLabel>{i18.t('Account:accountNumber', { id })}</UTLabel>
          <UTLabel>{direccion}</UTLabel>
        </div>
        {process.env.REACT_APP_UTILITY_NAME === 'idinir' && (
          <DigitalBill billType={adheridoFacturaDigital} email={contactEmails} />
        )}
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  account: array
};

export default AccountCard;
