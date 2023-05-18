/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import { array } from 'prop-types';
import { UTLabel } from '@widergy/energy-ui';
import { connect } from 'react-redux';

import { accountType } from 'types/accountTypes';
import AccountActions from 'redux/accounts/actions';

import styles from './styles.module.scss';

const situation = {
  ACTIVO: { text: 'El servicio se encuentra activo', style: styles.tagActivated },
  SUSPENDIDO: { text: 'El servicio ha sido suspendido', style: styles.tagSuspended },
  BAJA: { text: 'El servicio se encuentra de baja', style: styles.tagUnsubscribe }
};

const AccountCards = ({ accounts, currentAccount, dispatch }) => {
  const handleSelectAccount = account => {
    dispatch(AccountActions.setCurrentAccount(account));
  };

  return (
    <>
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
                Nº {row.cuenta_id} -{' '}
                {row.relacion.toUpperCase() !== 'NOSE' ? row.relacion : 'relación indefinida'}
              </UTLabel>
            </div>
            <div className={styles.header}>
              <UTLabel className={styles.titular} shade="01" variant="subtitle2" weight="light">
                {row.titular}
              </UTLabel>
            </div>
            <div className={styles.tag}>
              <span className={situation[row.descripcion_estado].style}>
                {situation[row.descripcion_estado].text}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

AccountCards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  accounts: array,
  currentAccount: accountType
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts
});

export default connect(mapStateToProps)(memo(AccountCards));
