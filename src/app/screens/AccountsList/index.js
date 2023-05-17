import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel } from '@widergy/energy-ui';
import { bool } from 'prop-types';

import UTLoading from 'app/components/UTLoading';
import AccountsActions from 'redux/accounts/actions';
import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

const Accounts = ({ accounts, loading, dispatch }) => {
  useEffect(() => {
    dispatch(AccountsActions.getAccounts());
  }, []);

  return (
    <>
      <UTLabel classes={{ root: styles.title }}>Listado de cuentas</UTLabel>
      <div className={styles.container}>
        <UTLoading loading={loading}>
          {// eslint-disable-next-line camelcase
          accounts.map(({ titular, direccion, localidad, partido, relacion, descripcion_estado: status }) => (
            <div className={styles.item}>
              <div className={styles.cardTitle}>
                <UTLabel classes={{ root: styles.titular }}>{titular}</UTLabel>
                <UTLabel classes={{ root: styles.location }}>
                  {direccion}, {localidad}, {partido}
                </UTLabel>
              </div>
              <div className={styles.cardInfo}>
                <UTLabel>Relacion: {capitalize(relacion)}</UTLabel>
                <UTLabel>Estado: {status}</UTLabel>
              </div>
            </div>
          ))}
        </UTLoading>
      </div>
    </>
  );
};

Accounts.propTypes = {
  accounts: accountType,
  loading: bool
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  loading: store.accounts.accountsLoading
});

export default connect(mapStateToProps)(Accounts);
