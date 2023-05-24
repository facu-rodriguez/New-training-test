import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLoading } from '@widergy/energy-ui';
import { arrayOf, bool } from 'prop-types';

import AccountActions from 'redux/accounts/actions';
import { accountType } from 'types/accountTypes';

import AccountCard from './components/AccountCard';
import styles from './styles.module.scss';

const AccountsList = ({ accounts, loading, currentAccount, dispatch }) => {
  useEffect(() => {
    if (!accounts.length) dispatch(AccountActions.getAccounts());
  }, []);

  const handleClick = account => {
    dispatch(AccountActions.setCurrentAccount(account));
  };

  return (
    <UTLoading loading={loading}>
      <div className={styles.list_container}>
        {accounts.map(account => (
          <AccountCard
            key={account.cuenta_id}
            account={account}
            currentId={currentAccount.cuenta_id}
            handleClick={handleClick}
          />
        ))}
      </div>
    </UTLoading>
  );
};

AccountsList.propTypes = {
  accounts: arrayOf(accountType),
  loading: bool,
  currentAccount: accountType
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  loading: store.accounts.accountsLoading,
  currentAccount: store.accounts.currentAccount
});

export default connect(mapStateToProps)(AccountsList);
