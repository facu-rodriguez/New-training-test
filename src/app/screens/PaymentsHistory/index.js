import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { UTTable } from '@widergy/energy-ui';
import i18 from 'i18next';
import { arrayOf, bool, string } from 'prop-types';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { push } from 'connected-react-router';

import { PAYMENTS_HISTORY } from 'constants/routes';
import UTLoading from 'app/components/UTLoading';
import PaymentsActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';
import appConfig from 'config/appConfig';
import { formatDate, formatAmount } from 'utils/formatUtils';

import styles from './styles.module.scss';

const PaymentsHistory = ({ payments, paymentsError, paymentsLoading, dispatch }) => {
  useEffect(() => {
    if (isEmpty(payments) && !paymentsError && !paymentsLoading) dispatch(PaymentsActions.getPayments());
  }, []);

  const formattedPayments = useMemo(
    () =>
      [...payments]
        .sort((a, b) => new Date(a.datetime.split('T')[0].trim()) - new Date(b.datetime.split('T')[0].trim()))
        .map(payment => {
          const formattedDate = formatDate(payment.datetime);
          const formattedAmount = formatAmount(payment.amount);

          return { ...payment, datetime: formattedDate, amount: formattedAmount };
        }),
    [payments]
  );

  const handleClick = (_, row) => {
    dispatch(PaymentsActions.setSelectedPayment(row));
    dispatch(push(`${PAYMENTS_HISTORY}/${row.datetime}`));
  };

  const handleReload = () => {
    dispatch(PaymentsActions.getPayments());
  };

  return (
    <UTLoading loading={paymentsLoading}>
      <div className={styles.container}>
        {!paymentsError ? (
          <UTTable
            classNames={{ rowContainerClickable: styles.clickable }}
            columns={appConfig.PaymentColumns}
            data={formattedPayments}
            disableAutoOrder
            tableTitle={i18.t('Payments:paymentsTitle')}
            disablePagination
            onRowClick={handleClick}
          />
        ) : (
          <div>
            {i18.t('Payments:error')}
            <button className={styles.reload} onClick={handleReload}>
              {' '}
              {i18.t('Payments:here')}
            </button>
          </div>
        )}
      </div>
    </UTLoading>
  );
};

PaymentsHistory.propTypes = {
  payments: arrayOf(paymentType),
  paymentsError: string,
  paymentsLoading: bool
};

const mapStateToProps = store => ({
  payments: store.payments.payments,
  paymentsError: store.payments.paymentsError,
  paymentsLoading: store.payments.paymentsLoading
});

export default connect(mapStateToProps)(PaymentsHistory);
