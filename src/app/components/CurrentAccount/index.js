import React from 'react';

import { accountType } from 'types/accountTypes';

import UTAccountSelect from '../UTAccountSelect';

import AccountCard from './Components/AccountCard';
import styles from './styles.module.scss';

const CurrentAccount = ({ currentAccount }) => (
  <div className={styles.container}>
    <AccountCard account={currentAccount} />
    <UTAccountSelect />
  </div>
);

CurrentAccount.propTypes = {
  currentAccount: accountType
};

export default CurrentAccount;
