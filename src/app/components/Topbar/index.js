import React from 'react';
import { useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import { push } from 'connected-react-router';

import logo from 'app/assets/logoBlanco.png';
import { HOME } from 'constants/routes';

import styles from './styles.module.scss';

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <HomeIcon className={styles.homeIcon} onClick={() => dispatch(push(HOME))} />
      <img alt="logo" src={logo} className={styles.logo} />
    </div>
  );
};

export default Topbar;
