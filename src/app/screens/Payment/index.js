import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTLabel, UTLoading } from '@widergy/energy-ui';
import { arrayOf, bool } from 'prop-types';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

import PaymentActions from 'redux/payments/actions';
import { paymentType } from 'types/paymentTypes';

const Payment = ({ payments, currentPayment, loading, dispatch }) => {
  const { paymentId } = useParams();

  const findPaymentById = id => payments.find(({ datetime }) => id === datetime);

  useEffect(() => {
    if (!currentPayment) dispatch(PaymentActions.getPayments());
  }, []);

  const setIfNull = payment => {
    if (!payment) dispatch(PaymentActions.setCurrentPayment(findPaymentById(paymentId)));
  };

  return (
    <>
      {setIfNull(currentPayment)}
      <UTLoading loading={loading}>
        {console.log(currentPayment)}
        {currentPayment ? (
          <>
            {Object.keys(currentPayment).map(key => (
              <UTLabel>
                {key}: {currentPayment[key]}
              </UTLabel>
            ))}
          </>
        ) : (
          <p>Please reload</p>
        )}
        <UTLabel>Buenos dias</UTLabel>
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
