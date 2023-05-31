import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel, UTButton, UTLoading } from '@widergy/energy-ui';
import { arrayOf, bool } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import i18 from 'i18next';

import PaymentActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';

import styles from './styles.module.scss';

const Payment = ({ payments, currentPayment, loading, dispatch }) => {
  const { paymentId } = useParams();
  const history = useHistory();

  const findPaymentById = id => payments.find(({ datetime }) => id === datetime);

  useEffect(() => {
    if (!currentPayment) dispatch(PaymentActions.getPayments());
  }, []);

  const setIfNull = payment => {
    if (!payment) dispatch(PaymentActions.setCurrentPayment(findPaymentById(paymentId)));
  };

  const formatValue = value => {
    const isDate = Date.parse(value);
    if (isDate) {
      const newDate = new Date(isDate);
      const day = newDate
        .getDate()
        .toString()
        .padStart(2, '0');
      const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
      const year = newDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
    if (typeof value === 'number') {
      return value.toFixed(1).replace(/\./, ',');
    }
    return value;
  };

  return (
    <>
      {setIfNull(currentPayment)}
      <UTLoading loading={loading}>
        {currentPayment ? (
          <div className={styles.container}>
            <div className={styles.card}>
              {Object.keys(currentPayment).map(key =>
                currentPayment[key] ? (
                  <div className={styles.item}>
                    <UTLabel classes={{ root: styles.itemTitle }}>{i18.t(`Payments:Item:${key}`)}:</UTLabel>
                    <UTLabel classes={{ root: styles.itemValue }}>{formatValue(currentPayment[key])}</UTLabel>
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
            <UTButton classes={{ root: styles.backButton }} onClick={() => history.goBack()}>
              {i18.t('Payments:Item:goBack')}
            </UTButton>
          </div>
        ) : (
          <></>
        )}
      </UTLoading>
    </>
  );
};

Payment.propTypes = {
  payments: arrayOf(paymentType),
  currentPayment: paymentType,
  loading: bool
};

const mapStateToProps = store => ({
  payments: store.payments.paymentsHistory,
  currentPayment: store.payments.currentPayment,
  loading: store.payments.paymentsHistoryLoading
});

export default connect(mapStateToProps)(Payment);
