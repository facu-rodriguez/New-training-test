import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel } from '@widergy/energy-ui';
import { bool } from 'prop-types';

import UTLoading from 'app/components/UTLoading';
import AccountsActions from 'redux/accounts/actions';
import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

const Accounts = ({ accounts, loading, currentAccount, dispatch }) => {
  useEffect(() => {
    dispatch(AccountsActions.getAccounts());
  }, []);

  return (
    <>
      <UTLabel classes={{ root: styles.title }}>Listado de cuentas</UTLabel>
      <div className={styles.container}>
        <UTLoading loading={loading}>
          {// eslint-disable-next-line camelcase
          accounts.map(account => (
            <button
              className={account.cuenta_id === currentAccount.cuenta_id ? styles.currentItem : styles.item}
              onClick={() => dispatch(AccountsActions.setCurrentAccount(account))}
            >
              <div className={styles.cardTitle}>
                <UTLabel classes={{ root: styles.titular }}>{account.titular}</UTLabel>
                <UTLabel classes={{ root: styles.location }}>
                  {account.direccion}, {account.localidad}, {account.partido}
                </UTLabel>
              </div>
              <div className={styles.cardInfo}>
                <UTLabel>Relacion: {capitalize(account.relacion)}</UTLabel>
                <UTLabel>Estado: {account.descripcion_estado}</UTLabel>
              </div>
            </button>
          ))}
        </UTLoading>
      </div>
    </>
  );
};

Accounts.propTypes = {
  accounts: accountType,
  loading: bool,
  currentAccount: accountType
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  loading: store.accounts.accountsLoading,
  currentAccount: store.accounts.currentAccount
});

export default connect(mapStateToProps)(Accounts);
