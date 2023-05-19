import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { push } from 'connected-react-router';
import { UTButton } from '@widergy/energy-ui';
import i18 from 'i18next';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { LIST_OF_PAYMENTS } from 'constants/routes';
import { paymentType } from 'types/paymentsTypes';

import styles from './styles.module.scss';

const PaymentDetail = ({ currentPayment, dispatch }) => {
  useEffect(() => {
    if (isEmpty(currentPayment)) {
      dispatch(push(`${LIST_OF_PAYMENTS}`));
    }
  }, []);

  return (
    <>
      <UTButton
        onClick={() => dispatch(push(LIST_OF_PAYMENTS))}
        classNames={{ root: styles.paymentsButton }}
        Icon={ArrowBackIosIcon}
      >
        {i18.t('Payments:goBack')}
      </UTButton>

      <div className={styles.detailPaymentContainer}>
        <div className={styles.detailPaymentTitile}>
          <h1>{i18.t('Payments:detailTitle')}</h1>
        </div>

        <div className={styles.detailPaymentRow}>
          <div className={styles.detailPaymentColumnLeft}>
            <span>
              {i18.t('Payments:keys:client_number')}: {currentPayment?.client_number}
            </span>
          </div>
          <div className={styles.detailPaymentColumnRight}>
            <span>
              {i18.t('Payments:keys:datetime')}: {currentPayment?.datetime}
            </span>
          </div>
        </div>

        <div className={styles.detailPaymentRow}>
          <div className={styles.detailPaymentColumnLeft}>
            <span>
              {i18.t('Payments:keys:status_label')}: {currentPayment?.status_label}
            </span>
          </div>
          <div className={styles.detailPaymentColumnRight}>
            <span>
              {i18.t('Payments:keys:payment_method')}: {currentPayment?.payment_method}
            </span>
          </div>
        </div>

        <div className={styles.detailPaymentTotal}>
          <span>
            {i18.t('Payments:detailTotal')}: {currentPayment?.amount}
          </span>
        </div>
      </div>
    </>
  );
};

PaymentDetail.propTypes = {
  currentPayment: paymentType
};

const mapStateToProps = store => ({
  currentPayment: store.payments.currentPayment
});

export default connect(mapStateToProps)(PaymentDetail);
