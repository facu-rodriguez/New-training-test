import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel } from '@widergy/energy-ui';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { bool, string } from 'prop-types';
import i18 from 'i18next';

import UTLoading from 'app/components/UTLoading';
import AccountActions from 'redux/accounts/actions';
import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

const Accounts = ({ accounts, accountsError, accountsLoading, loading, currentAccount, dispatch }) => {
  useEffect(() => {
    if (isEmpty(accounts) && !accountsError && !accountsLoading) dispatch(AccountActions.getAccounts());
  }, []);

  return (
    <Fragment>
      <UTLabel classes={{ root: styles.title }}>{i18.t('Account:accountsListTitle')}</UTLabel>
      <div className={styles.container}>
        <UTLoading loading={loading}>
          {// eslint-disable-next-line camelcase
          accounts.map(account => (
            <button
              className={account.cuenta_id === currentAccount.cuenta_id ? styles.currentItem : styles.item}
              onClick={() => dispatch(AccountActions.setCurrentAccount(account))}
            >
              <div className={styles.cardTitle}>
                <UTLabel classes={{ root: styles.titular }}>{account.titular}</UTLabel>
                <UTLabel classes={{ root: styles.location }}>
                  {account.direccion}, {account.localidad}, {account.partido}
                </UTLabel>
              </div>
              <div className={styles.cardInfo}>
                <UTLabel>
                  {i18.t('Account:relacion')}
                  {capitalize(account.relacion)}
                </UTLabel>
                <UTLabel>
                  {i18.t('Account:status')}
                  {account.descripcion_estado}
                </UTLabel>
              </div>
            </button>
          ))}
        </UTLoading>
      </div>
    </Fragment>
  );
};

Accounts.propTypes = {
  accounts: accountType,
  accountsError: string,
  accountsLoading: bool,
  loading: bool,
  currentAccount: accountType
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  loading: store.accounts.accountsLoading,
  currentAccount: store.accounts.currentAccount,
  accountsError: store.accounts.accountsError,
  accountsLoading: store.accounts.accountsLoading
});

export default connect(mapStateToProps)(Accounts);
