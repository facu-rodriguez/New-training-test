import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { arrayOf, bool, string } from 'prop-types';
import { push } from 'connected-react-router';
import { UTButton, UTLabel, UTLoading } from '@widergy/energy-ui';
import i18 from 'i18next';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import AccountActions from 'redux/accounts/actions';
import { HOME } from 'constants/routes';
import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';
import AccountCards from './components/AccountCards';

const Accounts = ({ accounts, accountsError, accountsLoading, currentAccount, dispatch }) => {
  useEffect(() => {
    if (isEmpty(accounts) && !accountsError && !accountsLoading) {
      dispatch(AccountActions.getAccounts());
    }
  }, []);
  return (
    <div className={styles.container}>
      <UTLoading loading={accountsLoading}>
        {accountsError ? (
          <UTLabel>{accountsError}</UTLabel>
        ) : isEmpty(accounts) ? (
          <UTLabel>{i18.t('Home:noAccounts')}</UTLabel>
        ) : (
          <Fragment>
            <>
              <UTButton
                onClick={() => dispatch(push(HOME))}
                classNames={{ root: styles.accountsButton }}
                Icon={ArrowBackIosIcon}
              >
                {i18.t('Accounts:goBack')}
              </UTButton>

              <h1 className={styles.accountsTitle}>Listado de todas las cuentas</h1>
              <div className={styles.accountsContainer}>
                <AccountCards accounts={accounts} currentAccount={currentAccount} />
              </div>
            </>
          </Fragment>
        )}
      </UTLoading>
    </div>
  );
};

Accounts.propTypes = {
  accounts: arrayOf(accountType),
  accountsError: string,
  accountsLoading: bool,
  currentAccount: accountType
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  accountsError: store.accounts.accountsError,
  accountsLoading: store.accounts.accountsLoading,
  currentAccount: store.accounts.currentAccount
});

export default connect(mapStateToProps)(Accounts);
