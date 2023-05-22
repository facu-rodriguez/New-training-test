import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTButton, UTLabel, UTLoading } from '@widergy/energy-ui';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { arrayOf, bool, string } from 'prop-types';
import { objectIsEmpty } from '@widergy/web-utils/lib/object';
import i18 from 'i18next';
import DescriptionIcon from '@material-ui/icons/Description';

import { ACCOUNTS_LIST, BILLS_HISTORY } from 'constants/routes';
import AccountActions from 'redux/accounts/actions';
import BillsActions from 'redux/bills/actions';
import CurrentAccount from 'app/components/CurrentAccount';
import { billType } from 'types/billsTypes';
import { accountType } from 'types/accountTypes';

import LastBill from './components/LastBill';
import styles from './styles.module.scss';

const Home = ({
  accounts,
  accountsError,
  accountsLoading,
  currentAccount,
  dispatch,
  lastBill,
  lastBillError,
  lastBillloading
}) => {
  useEffect(() => {
    if (isEmpty(accounts) && !accountsError && !accountsLoading) dispatch(AccountActions.getAccounts());
    if (objectIsEmpty(lastBill) && !lastBillError && !lastBillloading) dispatch(BillsActions.getLastBill());
  }, []);

  return (
    <div className={styles.container}>
      <UTLoading loading={accountsLoading || lastBillloading}>
        {accountsError ? (
          <UTLabel>{accountsError}</UTLabel>
        ) : isEmpty(accounts) ? (
          <UTLabel>{i18.t('Home:noAccounts')}</UTLabel>
        ) : (
          <Fragment>
            <CurrentAccount currentAccount={currentAccount} />
            <div className={styles.content}>
              <div className={styles.leftSection}>
                <UTButton
                  onClick={() => dispatch(push(BILLS_HISTORY))}
                  classNames={{ root: styles.billsListButton }}
                  Icon={DescriptionIcon}
                >
                  {i18.t('Bills:goToHistory')}
                </UTButton>
                <UTButton
                  onClick={() => dispatch(push(ACCOUNTS_LIST, accounts))}
                  classNames={{ root: styles.accountsListButton }}
                  Icon={DescriptionIcon}
                >
                  {i18.t('Account:goToList')}
                </UTButton>
              </div>
              <div className={styles.rightSection}>
                <LastBill currentBill={lastBill} loading={lastBillloading} />
              </div>
            </div>
          </Fragment>
        )}
      </UTLoading>
    </div>
  );
};

Home.propTypes = {
  accounts: arrayOf(accountType),
  accountsError: string,
  accountsLoading: bool,
  currentAccount: accountType,
  lastBill: billType,
  lastBillError: string,
  lastBillloading: bool
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  currentAccount: store.accounts.currentAccount,
  accountsError: store.accounts.accountsError,
  accountsLoading: store.accounts.accountsLoading,
  lastBill: store.bills.lastBill,
  lastBillError: store.bills.lastBillError,
  lastBillLoading: store.bills.lastBillLoading
});

export default connect(mapStateToProps)(Home);
