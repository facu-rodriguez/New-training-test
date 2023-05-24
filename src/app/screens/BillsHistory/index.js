import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UTTable } from '@widergy/energy-ui';
import i18 from 'i18next';
import { bool } from 'prop-types';

import UTLoading from 'app/components/UTLoading';
import BillsActions from 'redux/bills/actions';
import { billType } from 'types/billsTypes';

import { columns } from './constants';
import styles from './styles.module.scss';

const Bills = ({ bills, loading, dispatch }) => {
  useEffect(() => {
    dispatch(BillsActions.getBills());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <UTLoading loading={loading}>
        <UTTable
          classNames={{
            container: styles.container,
            fixedHeaderRowLeft: styles.fixedRowLeft,
            fixedHeaderRowRight: styles.fixedRowRight,
            fixedRowLeft: styles.fixedRowLeft,
            fixeduowRight: styles.fixedRowRight,
            headerContainer: styles.header,
            responsiveCell: styles.responsiveCell,
            responsiveCellTitle: styles.responsiveCellTitle,
            table: styles.tableContainer,
            scrollbar: styles.scrollbar
          }}
          columns={columns}
          data={bills}
          disableAutoOrder
          tableTitle={i18.t('Bills:billsHistoryTitle')}
          disablePagination
        />
      </UTLoading>
    </div>
  );
};

Bills.propTypes = {
  bills: billType,
  loading: bool
};

const mapStateToProps = store => ({
  bills: store.bills.billsHistory,
  loading: store.bills.billsHistoryLoading
});

export default connect(mapStateToProps)(Bills);
