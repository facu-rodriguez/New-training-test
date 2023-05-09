import React, { memo, useMemo, useState } from 'react';
import i18 from 'i18next';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import { UTButton, UTTextInput } from '@widergy/energy-ui';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';
import { arrayOf, bool } from 'prop-types';

import AccountActions from 'redux/accounts/actions';
import { accountType } from 'types/accountTypes';

import AccountSelectOption from './components/AccountSelectOption';
import { getFilteredAccounts } from './utils';
import styles from './styles.module.scss';

const UTAccountSelect = ({ accounts = [], disabled, dispatch }) => {
  const [filter, setFilter] = useState('');
  const [menuAnchor, setMenuAnchor] = useState();

  const handleClick = event => setMenuAnchor(event.currentTarget);

  const handleClose = () => setMenuAnchor();

  const handleSelectAccount = account => {
    dispatch(AccountActions.setCurrentAccount(account));
    handleClose();
  };

  const filteredAccounts = useMemo(() => getFilteredAccounts(accounts, filter), [accounts, filter]);

  return (
    <div className={styles.accountSelect}>
      <UTButton
        classNames={{ icon: styles.arrow, root: styles.button }}
        disabled={disabled}
        Icon={ArrowDownwardIcon}
        onClick={handleClick}
        size="small"
      />
      <Menu
        anchorEl={menuAnchor}
        classes={{ paper: styles.menuPaper }}
        id="simple-menu"
        onClose={handleClose}
        open={Boolean(menuAnchor)}
      >
        <div>
          <div className={styles.searchField} onKeyDown={e => e.stopPropagation()} role="search">
            <SearchIcon className={styles.searchIcon} />
            <UTTextInput
              className={styles.input}
              input={{ value: filter, onChange: setFilter }}
              placeholder={i18.t('AccountStatus:accountFilter')}
              meta={{}}
            />
          </div>
        </div>
        {filteredAccounts.map(account => (
          <AccountSelectOption account={account} key={account.id} onSelectAccount={handleSelectAccount} />
        ))}
      </Menu>
    </div>
  );
};

UTAccountSelect.propTypes = {
  accounts: arrayOf(accountType),
  disabled: bool
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts
});

export default connect(mapStateToProps)(memo(UTAccountSelect));
