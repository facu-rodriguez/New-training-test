import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel, UTLoading } from '@widergy/energy-ui';
import { bool } from 'prop-types';

import PaymentsActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';
import AppConfig from 'config/appConfig';

import styles from './styles.module.scss';

const Payments = ({ payments, loading, dispatch }) => {
  useEffect(() => {
    dispatch(PaymentsActions.getPayments());
  }, []);

  const filterObject = (obj, filters) =>
    Object.entries(
      Object.keys(obj)
        .filter(key => filters.includes(key))
        .reduce((newObj, key) => {
          newObj[key] = obj[key];
          return newObj;
        }, {})
    );

  const newPayments = [...payments];

  return (
    <>
      <UTLoading loading={loading}>
        <UTLabel classes={{ root: styles.title }}>Listado de Pagos</UTLabel>
        <div className={styles.container}>
          {newPayments.map(payment => (
            <div className={styles.tableRow}>
              {filterObject(payment, AppConfig.paymentsHistory.fields).map(property => (
                <UTLabel classes={{ root: styles.rowItem }}>{property[1]}</UTLabel>
              ))}
            </div>
          ))}
        </div>
      </UTLoading>
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
