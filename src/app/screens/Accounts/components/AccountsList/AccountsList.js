/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, memo } from 'react';
import { array } from 'prop-types';
import { UTLabel } from '@widergy/energy-ui';
import { connect } from 'react-redux';
import i18 from 'i18next';

import { accountType } from 'types/accountTypes';
import AccountActions from 'redux/accounts/actions';

import styles from './styles.module.scss';

const situation = {
  ACTIVO: { text: i18.t('Accounts:situation:activated'), style: styles.tagActivated },
  SUSPENDIDO: { text: i18.t('Accounts:situation:suspended'), style: styles.tagSuspended },
  BAJA: { text: i18.t('Accounts:situation:unsubscribe'), style: styles.tagUnsubscribe }
};

const AccountsList = ({ accounts, currentAccount, dispatch }) => {
  const handleSelectAccount = account => {
    dispatch(AccountActions.setCurrentAccount(account));
  };

  return (
    <Fragment>
      {accounts.map(row => (
        <div
          key={row.cuenta_id}
          onClick={() => handleSelectAccount(row)}
          role="button"
          tabIndex={0}
          className={
            currentAccount.cuenta_id === row.cuenta_id ? `${styles.card} ${styles.cardActive}` : styles.card
          }
        >
          <div className={styles.gradient} />
          <div className={styles.content}>
            <div className={styles.header}>
              <UTLabel className={styles.direction} shade="04" variant="subtitle1" weight="medium">
                {row.direccion}
              </UTLabel>
            </div>
            <div className={styles.header}>
              <UTLabel className={styles.direction} shade="01" variant="subtitle2" weight="light">
                {row.localidad}
              </UTLabel>
            </div>
            <div className={styles.header}>
              <UTLabel className={styles.accountId} shade="01" variant="subtitle2" weight="light">
                {i18.t('Accounts:accountNumber', { id: row.cuenta_id })}
                {row.relacion.toUpperCase() !== 'NOSE' ? row.relacion : i18.t('Accounts:noRelation')}
              </UTLabel>
            </div>
            <div className={styles.header}>
              <UTLabel className={styles.titular} shade="01" variant="subtitle2" weight="light">
                {row.titular}
              </UTLabel>
            </div>
            <div className={styles.tag}>
              <UTLabel className={situation[row.descripcion_estado].style}>
                {situation[row.descripcion_estado].text}
              </UTLabel>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

AccountsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  accounts: array,
  currentAccount: accountType
};

export default connect()(memo(AccountsList));
