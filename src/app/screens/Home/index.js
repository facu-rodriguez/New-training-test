import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTButton, UTLabel, UTLoading } from '@widergy/energy-ui';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { arrayOf, bool, string } from 'prop-types';
import { objectIsEmpty } from '@widergy/web-utils/lib/object';
import i18 from 'i18next';
import DescriptionIcon from '@material-ui/icons/Description';

import { BILLS_HISTORY } from 'constants/routes';
import AccountActions from 'redux/accounts/actions';
import BillsActions from 'redux/bills/actions';
import CurrentAccount from 'app/components/CurrentAccount';
import { billType } from 'types/billsTypes';
import { accountType } from 'types/accountTypes';

import LastBill from './components/LastBill';
import styles from './styles.module.scss';
import EmailModal from './components/EmailModal';

const Home = ({
  accounts,
  accountsError,
  accountsLoading,
  currentAccount,
  dispatch,
  lastBill,
  lastBillError,
  lastBillloading
}) => {
  useEffect(() => {
    if (isEmpty(accounts) && !accountsError && !accountsLoading) dispatch(AccountActions.getAccounts());
    if (objectIsEmpty(lastBill) && !lastBillError && !lastBillloading) dispatch(BillsActions.getLastBill());
  }, []);

  const [modalType, setModalType] = useState('');

  const openModal = type => {
    document.getElementById('modal').style.display = 'block';

    setModalType(type);

    const modal = document.getElementById(`modal-content`);
    modal.style.display = 'block';
    setTimeout(() => {
      modal.style.opacity = 1;
      modal.style.marginTop = `${10}%`;
    }, 10);
  };

  const closeModal = modalBg => {
    const modal = document.getElementById('modal-content');
    modal.style.opacity = 0;
    modal.style.marginTop = `${13}%`;
    modalBg.style.display = 'none';
  };

  window.onclick = event => {
    const modalBg = document.getElementById('modal');
    if (modalBg && event.target === modalBg) {
      closeModal(modalBg);
    }
  };

  const handleAccept = async (emails, id) => {
    switch (modalType) {
      case 'update':
        await dispatch(AccountActions.updateEmails(emails, id));
        break;
      case 'delete':
        await dispatch(AccountActions.deleteEmails(emails, id));
        break;
      case 'create':
        await dispatch(AccountActions.createEmails(emails, id));
        break;
      default:
        break;
    }
    closeModal(document.getElementById('modal'));
  };

  return (
    <div className={styles.container}>
      <UTLoading loading={accountsLoading || lastBillloading}>
        {accountsError ? (
          <UTLabel>{accountsError}</UTLabel>
        ) : isEmpty(accounts) ? (
          <UTLabel>{i18.t('Home:noAccounts')}</UTLabel>
        ) : (
          <Fragment>
            <CurrentAccount currentAccount={currentAccount} />
            <div className={styles.content}>
              <div className={styles.leftSection}>
                <UTButton
                  onClick={() => dispatch(push(BILLS_HISTORY))}
                  classNames={{ root: styles.billsListButton }}
                  Icon={DescriptionIcon}
                >
                  {i18.t('Bills:goToHistory')}
                </UTButton>
              </div>
              <div className={styles.rightSection}>
                <LastBill currentBill={lastBill} loading={lastBillloading} />
              </div>
              <div className={styles.facturaDigital}>
                <div className={styles.facturaDigitalBefore}>
                  <div className={styles.facturaDigitalAfter}>
                    <UTLabel classes={{ root: styles.facturaDigitalTitle }}>
                      {currentAccount.adherido_factura_digital
                        ? i18.t('Home:hasEmail')
                        : i18.t('Home:noEmail')}
                    </UTLabel>
                    {currentAccount.adherido_factura_digital ? (
                      <Fragment>
                        <UTButton
                          variant="outlined"
                          classNames={{ root: styles.facturaDigitalButton }}
                          onClick={() => openModal('update')}
                        >
                          {i18.t('Home:modifyEmail')}
                        </UTButton>
                        <UTButton
                          variant="outlined"
                          classNames={{ root: styles.facturaDigitalButton }}
                          onClick={() => openModal('delete')}
                        >
                          {i18.t('Home:deleteEmail')}
                        </UTButton>
                      </Fragment>
                    ) : (
                      <UTButton
                        variant="outlined"
                        classNames={{ root: styles.facturaDigitalButton }}
                        onClick={() => openModal('create')}
                      >
                        {i18.t('Home:createEmail')}
                      </UTButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="modal" className={styles.modal}>
              <div id="modal-content" className={styles.modalContent}>
                <EmailModal
                  account={currentAccount}
                  modalType={modalType}
                  onCancel={() => closeModal(document.getElementById('modal'))}
                  onAccept={handleAccept}
                />
              </div>
            </div>
          </Fragment>
        )}
      </UTLoading>
    </div>
  );
};

Home.propTypes = {
  accounts: arrayOf(accountType),
  accountsError: string,
  accountsLoading: bool,
  currentAccount: accountType,
  lastBill: billType,
  lastBillError: string,
  lastBillloading: bool
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  currentAccount: store.accounts.currentAccount,
  accountsError: store.accounts.accountsError,
  lastBill: store.bills.lastBill,
  lastBillError: store.bills.lastBillError,
  lastBillLoading: store.bills.lastBillLoading,
  accountsLoading: store.accounts.accountsLoading
});

export default connect(mapStateToProps)(Home);
