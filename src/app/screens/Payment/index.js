import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTCard, UTLabel, UTLoading } from '@widergy/energy-ui';
import i18next from 'i18next';
import { objectIsEmpty } from '@widergy/web-utils/lib/object';
import { push } from 'connected-react-router';

import PaymentsActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';
import { PAYMENTS_HISTORY } from 'constants/routes';

import styles from './styles.module.scss';

const Payment = ({ payment = {}, dispatch }) => {
  useEffect(() => {
    if (objectIsEmpty(payment)) {
      dispatch(push(PAYMENTS_HISTORY));
    }

    return () => dispatch(PaymentsActions.setSelectedPayment({}));
  }, []);

  return (
    <div className={styles.container}>
      <UTLoading loading={objectIsEmpty(payment)} className={styles.container}>
        <UTCard classNames={{ base: styles.account_card }}>
          <div className={styles.flare} />
          <UTLabel className={styles.title}>{i18next.t('Payments:detailsTitle')}</UTLabel>
          <div className={styles['detailsContainer-date']}>
            <UTLabel className={styles.label}>{i18next.t('Payments:datetime')}</UTLabel>
            <div className={styles.detail}>{payment.datetime}</div>
          </div>
          <div className={styles.detailsContainer}>
            <UTLabel className={styles.label}>{i18next.t('Payments:client_number')}</UTLabel>
            <div className={styles.detail}>{payment.client_number}</div>
          </div>
          <div className={styles.detailsContainer}>
            <UTLabel className={styles.label}>{i18next.t('Payments:payment_method')}</UTLabel>
            <div className={styles.detail}>{payment.payment_method}</div>
          </div>
          <div className={styles.detailsContainer}>
            <UTLabel className={styles.label}>{i18next.t('Payments:payment_code')}</UTLabel>
            <div className={styles.detail}>{payment.payment_code || '-'}</div>
          </div>
          <div className={styles['detailsContainer-amount']}>
            <UTLabel className={styles.label}>{i18next.t('Payments:amount')}</UTLabel>
            <div className={styles.detail}>{payment.amount}</div>
          </div>
          <div className={styles[`status-${payment.status}`]}>{payment.status_label}</div>
        </UTCard>
      </UTLoading>
    </div>
  );
};

Payment.propTypes = {
  payment: paymentType
};

const mapStateToProps = store => ({
  payment: store.payments.payment,
  paymentLoading: store.payments.paymentLoading
});

export default connect(mapStateToProps)(Payment);
