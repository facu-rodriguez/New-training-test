import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { UTLabel } from '@widergy/energy-ui';

import appConfig from 'config/appConfig';
import { accountType } from 'types/accountTypes';

import styles from './styles.module.scss';

class AccountSelectOption extends PureComponent {
  handleSelect = () => this.props.onSelectAccount(this.props.account);

  render() {
    return (
      <MenuItem onClick={this.handleSelect} className={styles.item}>
        <UTLabel variant="small" className={styles.label}>
          {`${
            appConfig.accountSelect.withAccountId
              ? this.props.account.cuenta_id
              : this.props.account.direccion
          } - ${this.props.account.titular}`}
        </UTLabel>
      </MenuItem>
    );
  }
}

AccountSelectOption.propTypes = {
  account: accountType,
  onSelectAccount: func
};

export default AccountSelectOption;
