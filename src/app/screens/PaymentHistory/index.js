import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { UTTable, UTLabel, UTButton } from '@widergy/energy-ui';
import i18 from 'i18next';
import { bool, arrayOf } from 'prop-types';
import { push } from 'connected-react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { HOME, LIST_OF_PAYMENTS } from 'constants/routes';
import UTLoading from 'app/components/UTLoading';
import PaymentActions from 'redux/payment/actions';
import { paymentType } from 'types/paymentsTypes';

import { columnsSegba, columnsIdinir } from './constants';
import styles from './styles.module.scss';

const columns = {
  idinir: columnsIdinir,
  segba: columnsSegba
};

const PaymentHistory = ({ payments, loading, paymentsError, currentPayment, dispatch }) => {
  const getDate = (date, type) => {
    const year = date.split('T')[0].split('-')[0];
    const month = date.split('T')[0].split('-')[1];
    const day = date.split('T')[0].split('-')[2];

    if (type === 'sort') {
      return `${day}-${month}-${year}`;
    }

    return `${year}-${month}-${day}`;
  };

  const formatNumber = amount => amount.toFixed(1).replace('.', ',');

  const formattedPayments = payments?.map(bill => ({
    ...bill,
    datetime: getDate(bill.datetime),
    amount: `$ ${formatNumber(bill.amount)}`
  }));

  const sortedPayments = [...formattedPayments]
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .map(bill => ({
      ...bill,
      datetime: getDate(bill.datetime, 'sort')
    }));

  const handleClick = paymentDetail => {
    dispatch(PaymentActions.setCurrentPayment(paymentDetail));
    dispatch(push(`${LIST_OF_PAYMENTS}/${paymentDetail.datetime}`));
  };

  useEffect(() => {
    if (isEmpty(payments) && !paymentsError && !loading) {
      dispatch(PaymentActions.getPayments());
    }

    if (currentPayment) {
      dispatch(PaymentActions.setCurrentPayment(null));
    }
  }, []);

  return (
    <>
      <UTButton
        onClick={() => dispatch(push(HOME))}
        classNames={{ root: styles.paymentsButton }}
        Icon={ArrowBackIosIcon}
      >
        {i18.t('Payments:goBack')}
      </UTButton>

      <div className={styles.container}>
        <UTLoading loading={loading}>
          {paymentsError ? (
            <UTLabel>{paymentsError}</UTLabel>
          ) : isEmpty(payments) ? (
            <UTLabel>{i18.t('Payments:noPayments')}</UTLabel>
          ) : (
            <>
              <UTTable
                classNames={{
                  table: styles.tableContainer,
                  headerCell: styles.headerCell,
                  rowCell: styles.rowElement,
                  responsiveRow: styles.rowHover
                }}
                columns={columns[process.env.REACT_APP_UTILITY_NAME]}
                data={sortedPayments}
                onRowClick={(_, row) => handleClick(row)}
                disableAutoOrder
                tableTitle={`${i18.t('Payments:tableTitle')} (click para ver detalle)`}
                disablePagination
              />
            </>
          )}
        </UTLoading>
      </div>
    </>
  );
};

PaymentHistory.propTypes = {
  payments: arrayOf(paymentType),
  loading: bool,
  paymentsError: bool,
  currentPayment: paymentType
};

const mapStateToProps = store => ({
  payments: store.payments.paymentHistory,
  loading: store.payments.paymentHistoryLoading,
  paymentsError: store.payments.paymentHistoryError,
  currentPayment: store.payments.currentPayment
});

export default connect(mapStateToProps)(PaymentHistory);
