/* eslint-disable react/prop-types */
import { UTCard, UTLabel } from '@widergy/energy-ui';
import React from 'react';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { statusLabelRenderer } from './utils';

const AccountItem = ({ account, setCurrentAccount }) => {
  const { currentAccount } = useSelector(store => store?.accounts);
  const isAccountSelected = currentAccount?.cuenta_id === account?.cuenta_id;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.container} onClick={() => setCurrentAccount(account)}>
      <UTCard horizontal classNames={{ base: `${styles.card} ${isAccountSelected && styles.selectedCard}` }}>
        <div className={styles.tag} />
        <div className={styles.cardContent}>
          <div>
            <UTLabel variant="subtitle1" weight="semibold">
              {account.direccion}
            </UTLabel>
            <UTLabel
              variant="subtitle2"
              colorTheme={isAccountSelected ? 'light' : 'gray'}
              className={isAccountSelected ? styles.selectedAccount : ''}
            >
              {account.localidad}
            </UTLabel>
          </div>
          <div>
            <UTLabel colorTheme={isAccountSelected ? 'light' : 'gray'}>
              {account.cuenta_id} - {account.relacion}
            </UTLabel>
            <div className={styles.bottomRow}>
              <UTLabel colorTheme={isAccountSelected ? 'light' : 'gray'} className={styles.holder}>
                {account.titular}
              </UTLabel>
              <UTLabel>{statusLabelRenderer(account?.estado, { value: styles.statusLabel })}</UTLabel>
            </div>
          </div>
        </div>
      </UTCard>
    </div>
  );
};

export default AccountItem;
