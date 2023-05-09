import React, { Fragment } from 'react';
import { UTLabel, UTLoading } from '@widergy/energy-ui';
import i18 from 'i18next';
import { bool } from 'prop-types';
import dayjs from 'dayjs';
import { objectIsEmpty } from '@widergy/web-utils/lib/object';

import { billTypes } from 'types/billsTypes';

import styles from './styles.module.scss';
import { DATE_FORMAT } from './constants';
import { statusLabelRenderer } from './utils';

const LastBill = ({ currentBill, loading, withIssueDate }) => {
  const { amount_to_pay: amount, expiration_date: rawFirstExpiration, issued_on: issuedOn } =
    currentBill || {};

  const thousandAmount = amount?.split(',')[0];
  const decimalAmount = amount?.split(',')[1];

  const dayToShow = withIssueDate ? issuedOn : rawFirstExpiration;

  const hasData = !objectIsEmpty(currentBill);

  const LastBillBody = () => (
    <Fragment>
      <div className={styles.dateColumn}>
        {hasData && (
          <Fragment>
            <UTLabel colorTheme="gray" variant="small" weight="bold">
              {withIssueDate ? i18.t('Bills:billsListIssueDate') : i18.t('Bills:billsListFirstExpiration')}
            </UTLabel>
            <UTLabel colorTheme="gray" variant="small">
              {dayjs(dayToShow).format(DATE_FORMAT)}
            </UTLabel>
          </Fragment>
        )}
      </div>
      <div className={styles.amountColumn}>
        {hasData && statusLabelRenderer(currentBill?.status, { value: styles.statusLabel })}
        <div className={styles.amountContainer}>
          <div className={styles.amount}>
            <UTLabel variant="subtitle1" weight="semibold">
              {thousandAmount}
            </UTLabel>
            {decimalAmount && (
              <UTLabel className={styles.decimalAmount} variant="xsmall" weight="semibold">
                {decimalAmount}
              </UTLabel>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className={styles.billsListContainer}>
      <UTLabel className={styles.header} variant="subtitle1" weight="semibold">
        {i18.t('Bills:billsListTitle')}
      </UTLabel>
      <UTLoading className={styles.loading} loading={loading}>
        <div className={styles.billsListItem}>
          <LastBillBody />
        </div>
      </UTLoading>
    </div>
  );
};

LastBill.propTypes = {
  currentBill: billTypes,
  loading: bool,
  withIssueDate: bool
};

export default LastBill;
