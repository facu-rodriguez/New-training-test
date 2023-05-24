import React from 'react';
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
import AccountsList from './components/AccountsList/AccountsList';

const Accounts = ({ accounts, accountsError, accountsLoading, currentAccount, dispatch }) => (
  <UTLoading loading={accountsLoading}>
    {accountsError ? (
      <UTLabel>{accountsError}</UTLabel>
    ) : isEmpty(accounts) && !accountsError && !accountsLoading ? (
      <div className={styles.accountsContainer}>
        <UTLabel>{i18.t('Home:noAccounts')}</UTLabel>
        <UTButton
          onClick={() => dispatch(AccountActions.getAccounts())}
          classNames={{ root: styles.accountsButton }}
        >
          {i18.t('Accounts:retry')}
        </UTButton>
      </div>
    ) : (
      <div className={styles.container}>
        <UTButton
          onClick={() => dispatch(push(HOME))}
          classNames={{ root: styles.accountsButton }}
          Icon={ArrowBackIosIcon}
        >
          {i18.t('Accounts:goBack')}
        </UTButton>

        <UTLabel className={styles.accountsTitle}>{i18.t('Accounts:title')}</UTLabel>
        <div className={styles.accountsContainer}>
          <AccountsList accounts={accounts} currentAccount={currentAccount} />
        </div>
      </div>
    )}
  </UTLoading>
);

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
