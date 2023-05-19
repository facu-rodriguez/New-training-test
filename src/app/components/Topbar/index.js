import React from 'react';
import { useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import PaymentsSharpIcon from '@material-ui/icons/PaymentSharp';
import { push } from 'connected-react-router';

import logo from 'app/assets/logoBlanco.png';
import { HOME, PAYMENTS_HISTORY } from 'constants/routes';

import styles from './styles.module.scss';

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <HomeIcon className={styles.icon} onClick={() => dispatch(push(HOME))} />
      <PaymentsSharpIcon className={styles.icon} onClick={() => dispatch(push(PAYMENTS_HISTORY))} />
      <img alt="logo" src={logo} className={styles.logo} />
    </div>
  );
};

export default Topbar;
