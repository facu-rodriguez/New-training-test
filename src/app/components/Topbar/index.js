import React from 'react';
import { useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import { push } from 'connected-react-router';

import logo from 'app/assets/logoBlanco.png';
import { HOME, ACCOUNTS_LIST } from 'constants/routes';

import styles from './styles.module.scss';

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <HomeIcon className={styles.icon} onClick={() => dispatch(push(HOME))} />
      <ListAltSharpIcon className={styles.icon} onClick={() => dispatch(push(ACCOUNTS_LIST))} />
      <img alt="logo" src={logo} className={styles.logo} />
    </div>
  );
};

export default Topbar;
