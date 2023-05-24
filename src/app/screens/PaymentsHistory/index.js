import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { UTTable, UTLabel, UTButton } from '@widergy/energy-ui';
import i18 from 'i18next';
import { bool, arrayOf } from 'prop-types';
import { push } from 'connected-react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import appConfig from 'config/appConfig';
import { HOME, PAYMENTS_HISTORY } from 'constants/routes';
import UTLoading from 'app/components/UTLoading';
import PaymentActions from 'redux/payment/actions';
import { paymentType } from 'types/paymentsTypes';

import { formatPaymentsUtils } from './utils/formatPaymentsUtils';
import styles from './styles.module.scss';

const PaymentsHistory = ({ payments, loading, paymentsError, dispatch }) => {
  const { PaymentDetailColumns } = appConfig;

  const handleClick = paymentDetail => {
    dispatch(PaymentActions.setCurrentPayment(paymentDetail));
    dispatch(push(`${PAYMENTS_HISTORY}/${paymentDetail.datetime}`));
  };

  useEffect(() => {
    if (isEmpty(payments) && !paymentsError && !loading) {
      dispatch(PaymentActions.getPayments());
    }
  }, [dispatch, loading, payments, paymentsError]);

  return (
    <Fragment>
      <UTButton
        onClick={() => dispatch(push(HOME))}
        classNames={{ root: styles.paymentsButton }}
        Icon={ArrowBackIosIcon}
      >
        {i18.t('Payments:goBack')}
      </UTButton>

      <UTLoading loading={loading}>
        {paymentsError ? (
          <UTLabel>{paymentsError}</UTLabel>
        ) : isEmpty(payments) ? (
          <UTLabel>{i18.t('Payments:noPayments')}</UTLabel>
        ) : (
          <div className={styles.container}>
            <UTTable
              classNames={{
                table: styles.tableContainer,
                headerCell: styles.headerCell,
                rowCell: styles.rowElement,
                responsiveRow: styles.rowHover
              }}
              columns={PaymentDetailColumns}
              data={payments}
              onRowClick={(_, row) => handleClick(row)}
              disableAutoOrder
              tableTitle={`${i18.t('Payments:tableTitle')} (click para ver detalle)`}
              disablePagination
            />
          </div>
        )}
      </UTLoading>
    </Fragment>
  );
};

PaymentsHistory.propTypes = {
  payments: arrayOf(paymentType),
  loading: bool,
  paymentsError: bool
};

const mapStateToProps = store => ({
  payments: formatPaymentsUtils(store.payments.payments),
  loading: store.payments.paymentsLoading,
  paymentsError: store.paymentsError
});

export default connect(mapStateToProps)(PaymentsHistory);
