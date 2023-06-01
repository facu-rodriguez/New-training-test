import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel, UTButton, UTLoading } from '@widergy/energy-ui';
import { arrayOf, bool } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import i18 from 'i18next';
import dayjs from 'dayjs';

import PaymentActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';

import styles from './styles.module.scss';
import { formatValue } from './utils';

const Payment = ({ payments, currentPayment, loading, dispatch }) => {
  const { paymentId } = useParams();
  const history = useHistory();

  const findPaymentById = id => payments.find(({ datetime }) => id === dayjs(datetime).format('DD-MM-YYYY'));

  useEffect(() => {
    if (!currentPayment) dispatch(PaymentActions.getPayments());
  }, []);

  const setCurrentPaymentIfNull = payment => {
    if (!payment) dispatch(PaymentActions.setCurrentPayment(findPaymentById(paymentId)));
  };

  return (
    <Fragment>
      {setCurrentPaymentIfNull(currentPayment)}
      <UTLoading loading={loading}>
        {currentPayment && (
          <div className={styles.container}>
            <div className={styles.card}>
              {Object.keys(currentPayment).map(
                key =>
                  currentPayment[key] && (
                    <div className={styles.item}>
                      <UTLabel classes={{ root: styles.itemTitle }}>{i18.t(`Payments:Item:${key}`)}:</UTLabel>
                      <UTLabel classes={{ root: styles.itemValue }}>
                        {formatValue(currentPayment[key])}
                      </UTLabel>
                    </div>
                  )
              )}
            </div>
            <UTButton classes={{ root: styles.backButton }} onClick={() => history.goBack()}>
              {i18.t('Payments:Item:goBack')}
            </UTButton>
          </div>
        )}
      </UTLoading>
    </Fragment>
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
