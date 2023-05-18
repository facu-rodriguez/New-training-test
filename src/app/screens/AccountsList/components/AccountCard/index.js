import { UTCard, UTLabel } from '@widergy/energy-ui';
import i18next from 'i18next';
import React from 'react';
import { func, string } from 'prop-types';

import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';

const AccountCard = ({ account, currentId, handleClick }) => (
  <button onClick={() => handleClick(account)}>
    <UTCard
      key={account.cuenta_id}
      classNames={{
        base: currentId === account.cuenta_id ? styles['account_card-active'] : styles.account_card
      }}
    >
      <div className={styles.flare} />
      <div className={styles.data_container}>
        <UTLabel className={styles.title}>{account.direccion}</UTLabel>
        <div className={styles.owner}>{account.titular}</div>
        <div className={styles.id_relation}>
          {account.cuenta_id} - {account.relacion}
        </div>
        <div className={styles[`status-${account.descripcion_estado}`]}>
          {i18next.t('AccountList:intro')} {i18next.t(`AccountList:${account.descripcion_estado}`)}
        </div>
      </div>
    </UTCard>
  </button>
);

AccountCard.propTypes = {
  account: accountType,
  currentId: string,
  handleClick: func
};

export default AccountCard;
