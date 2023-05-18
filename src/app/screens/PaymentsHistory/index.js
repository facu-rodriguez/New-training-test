import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel, UTLoading } from '@widergy/energy-ui';
import { bool } from 'prop-types';

import PaymentsActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';

import styles from './styles.module.scss';

const Payments = ({ payments, loading, dispatch }) => {
  useEffect(() => {
    dispatch(PaymentsActions.getPayments());
  }, []);

  return (
    <>
      <div className={styles.container}>
        <UTLoading loading={loading}>
          <UTLabel>Listado de Pagos</UTLabel>
          {payments.map(payment => (
            <>
              <h1>{payment.client_number}</h1>
              <p>{payment.datetime}</p>
              <p>{payment.status}</p>
            </>
          ))}
        </UTLoading>
      </div>
    </>
  );
};

Payments.propTypes = {
  payments: paymentType,
  loading: bool
};

const mapStateToProps = store => ({
  payments: store.payments.paymentsHistory,
  loading: store.payments.paymentsHistoryLoading
});

export default connect(mapStateToProps)(Payments);
