import React from 'react';
import { array } from 'prop-types';
import i18 from 'i18next';
import { UTLabel } from '@widergy/energy-ui';

import styles from './styles.module.scss';

const AccountCard = ({ account }) => {
  const { cuenta_id: id, titular, direccion } = account;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <UTLabel className={styles.accountName} shade="04" variant="subtitle1" weight="semibold">
            {titular}
          </UTLabel>
        </div>
        <div className={styles.accountNumberAndAddres}>
          <UTLabel>{i18.t('Accounts:accountNumber', { id })}</UTLabel>
          <UTLabel>{direccion}</UTLabel>
        </div>
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  account: array
};

export default AccountCard;
