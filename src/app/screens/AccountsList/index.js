import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '@widergy/web-utils/lib/array';
import i18next from 'i18next';
import { UTButton, UTLabel, UTLoading } from '@widergy/energy-ui';

import AccountActions from 'redux/accounts/actions';

import AccountItem from './components/AccountItem';
import styles from './styles.module.scss';

const AccountsList = () => {
  const { accountsLoading, accounts, accountsError } = useSelector(store => store.accounts);
  const dispatch = useDispatch();

  const fetchAccounts = () => {
    dispatch(AccountActions.getAccounts());
  };

  useEffect(() => {
    if (isEmpty(accounts) && !accountsError && !accountsLoading) fetchAccounts();
  }, [accounts, accountsError, accountsLoading, dispatch]);

  const handleChangeCurrentAccount = account => {
    dispatch(AccountActions.setCurrentAccount(account));
  };

  const renderAccount = item => (
    <AccountItem account={item} setCurrentAccount={handleChangeCurrentAccount} key={item.cuenta_id} />
  );

  return (
    <UTLoading loading={accountsLoading} className={styles.loading}>
      {accountsError ? (
        <div className={styles.container}>
          <UTLabel>{accountsError}</UTLabel>
          <UTButton variant="outlined" onClick={() => fetchAccounts()}>
            {i18next.t('Commons:retry')}
          </UTButton>
        </div>
      ) : isEmpty(accounts) ? (
        <UTLabel>{i18next.t('Accounts:noAccountsAvailable')}</UTLabel>
      ) : (
        <div className={styles.container}>
          <UTLabel variant="title1" weight="medium" className={styles.title}>
            {i18next.t('Accounts:myAccounts')}
          </UTLabel>
          <div className={styles.accountsContainer}>{accounts?.map(account => renderAccount(account))}</div>
        </div>
      )}
    </UTLoading>
  );
};

export default AccountsList;
