import React, { Fragment, useEffect, useRef } from 'react';
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
import UpdateModal from './components/UpdateModal';
import styles from './styles.module.scss';
import CreateModal from './components/CreateModal';
import DeleteModal from './components/DeleteModal';

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

  const updateRef = useRef(null);
  const deleteRef = useRef(null);
  const createRef = useRef(null);

  const openModal = modalType => {
    document.getElementById('modal').style.display = 'block';

    modalType.current.style.display = 'block';

    const modal = document.getElementById(`modal-content`);
    modal.style.display = 'block';
    setTimeout(() => {
      modal.style.opacity = 1;
      modal.style.marginTop = `${10}%`;
    }, 10);
  };

  const closeModal = modalBg => {
    updateRef.current.style.display = 'none';
    deleteRef.current.style.display = 'none';
    createRef.current.style.display = 'none';
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

  const handleUpdateEmails = async (emails, id) => {
    await dispatch(AccountActions.updateEmails(emails, id));
    closeModal(document.getElementById('modal'));
  };

  const handleCreateEmails = async (emails, id) => {
    await dispatch(AccountActions.createEmails(emails, id));
    closeModal(document.getElementById('modal'));
  };

  const handleDeleteEmails = async (emails, id) => {
    await dispatch(AccountActions.deleteEmails(emails, id));
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
                      <>
                        <UTButton
                          variant="outlined"
                          classNames={{ root: styles.facturaDigitalButton }}
                          onClick={() => openModal(updateRef)}
                        >
                          {i18.t('Home:modifyEmail')}
                        </UTButton>
                        <UTButton
                          variant="outlined"
                          classNames={{ root: styles.facturaDigitalButton }}
                          onClick={() => openModal(deleteRef)}
                        >
                          {i18.t('Home:deleteEmail')}
                        </UTButton>
                      </>
                    ) : (
                      <UTButton
                        variant="outlined"
                        classNames={{ root: styles.facturaDigitalButton }}
                        onClick={() => openModal(createRef)}
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
                <UpdateModal
                  ref={updateRef}
                  account={currentAccount}
                  onUpdateEmails={handleUpdateEmails}
                  onCancel={() => closeModal(document.getElementById('modal'))}
                />
                <CreateModal
                  ref={createRef}
                  account={currentAccount}
                  onCreateEmails={handleCreateEmails}
                  onCancel={() => closeModal(document.getElementById('modal'))}
                />
                <DeleteModal
                  ref={deleteRef}
                  account={currentAccount}
                  onDeleteEmails={handleDeleteEmails}
                  onCancel={() => closeModal(document.getElementById('modal'))}
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
