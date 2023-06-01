import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTLabel, UTLoading, UTTable } from '@widergy/energy-ui';
import { bool } from 'prop-types';
import dayjs from 'dayjs';
import i18 from 'i18next';

import PaymentsActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';
import { PAYMENTS_HISTORY } from 'constants/routes';

import styles from './styles.module.scss';
import { columns } from './constants';

const Payments = ({ payments, loading, dispatch }) => {
  useEffect(() => {
    dispatch(PaymentsActions.getPayments());
  }, []);

  const handleClick = async payment => {
    await dispatch(PaymentsActions.setCurrentPayment(payment));
    dispatch(push(`${PAYMENTS_HISTORY}/${payment.datetime}`));
  };

  return (
    <UTLoading loading={loading}>
      <UTLabel classes={{ root: styles.title }}>{i18.t('Payments:paymentsHistory')}</UTLabel>
      <UTTable
        classNames={{
          table: styles.tableContainer,
          headerCell: styles.headerCell,
          rowCell: styles.rowCell,
          responsiveRow: styles.rowHover
        }}
        data={payments.map(payment => ({
          ...payment,
          datetime: dayjs(payment.datetime).format('DD-MM-YYYY')
        }))}
        columns={columns}
        onRowClick={(_, payment) => handleClick(payment)}
        disablePagination
      />
    </UTLoading>
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
