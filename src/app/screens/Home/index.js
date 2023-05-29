import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTButton, UTLabel, UTLoading } from '@widergy/energy-ui';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { arrayOf, bool, string } from 'prop-types';
import { objectIsEmpty } from '@widergy/web-utils/lib/object';
import i18 from 'i18next';
import DescriptionIcon from '@material-ui/icons/Description';

import appConfig from 'config/appConfig';
import { BILLS_HISTORY } from 'constants/routes';
import AccountActions from 'redux/accounts/actions';
import BillsActions from 'redux/bills/actions';
import CurrentAccount from 'app/components/CurrentAccount';
import { billType } from 'types/billsTypes';
import { accountType } from 'types/accountTypes';
import { digitalBillingType } from 'types/digitalBillingTypes';

import { modalState, tagState } from './constants';
import DigitalBilling from './components/DigitalBilling';
import LastBill from './components/LastBill';
import styles from './styles.module.scss';
import DigitalBillingModal from './components/DigitalBillingModal';

const Home = ({
  accounts,
  accountsError,
  accountsLoading,
  currentAccount,
  dispatch,
  lastBill,
  lastBillError,
  lastBillloading,
  digitalBilling,
  digitalBillingLoading
}) => {
  useEffect(() => {
    if (isEmpty(accounts) && !accountsError && !accountsLoading) dispatch(AccountActions.getAccounts());
    if (objectIsEmpty(lastBill) && !lastBillError && !lastBillloading) dispatch(BillsActions.getLastBill());
  }, []);

  useEffect(() => {
    if (!objectIsEmpty(currentAccount)) {
      dispatch(
        BillsActions.setDigitalBilling({
          adherido_factura_digital: currentAccount.adherido_factura_digital,
          contact_emails: currentAccount.contact_emails
        })
      );
    }
  }, [currentAccount]);

  const [tagStatus, setTagStatus] = useState({});

  useEffect(() => {
    if (digitalBilling.adherido_factura_digital) {
      setTagStatus(tagState.success);
    } else {
      setTagStatus(tagState.error);
    }
  }, [digitalBilling]);

  const [inputValue, setInputValue] = useState('');
  const [modalStatus, setModalStatus] = useState(modalState.closed);

  const handleCta = action => {
    if (action === 'modify') {
      dispatch(BillsActions.digitalBillingUpdate(inputValue));
      setModalStatus(modalState.closed);
    }

    if (action === 'subscribe') {
      dispatch(BillsActions.digitalBillingSubscription(inputValue));
      setModalStatus(modalState.closed);
    }

    if (action === 'unsubscribe') {
      dispatch(BillsActions.digitalBillingUnsubscription(inputValue));
      setModalStatus(modalState.closed);
    }
  };

  const openModal = action => {
    setModalStatus(modalState[action]);
  };

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const validateEmail = useMemo(() => !!inputValue.match(/^\S+@\S+\.\S+$/), [inputValue]);

  const handleCancel = () => {
    setModalStatus(modalState.closed);
    setInputValue('');
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <UTLoading loading={accountsLoading || lastBillloading}>
          {accountsError ? (
            <UTLabel>{accountsError}</UTLabel>
          ) : isEmpty(accounts) ? (
            <UTLabel>{i18.t('Home:noAccounts')}</UTLabel>
          ) : (
            <Fragment>
              <CurrentAccount currentAccount={currentAccount} />
              {appConfig.digitalBilling.enabled && (
                <DigitalBilling
                  loading={digitalBillingLoading}
                  emails={digitalBilling.contact_emails}
                  handleModify={() => openModal('modify')}
                  handleSubscribe={() => openModal('subscribe')}
                  handleUnsubscribe={() => openModal('unsubscribe')}
                  subscription={digitalBilling.adherido_factura_digital}
                  tagState={tagStatus}
                />
              )}
              <div className={styles.content}>
                <div className={styles.leftSection}>
                  <UTButton
                    classNames={{ root: styles.billsListButton }}
                    Icon={DescriptionIcon}
                    onClick={() => dispatch(push(BILLS_HISTORY))}
                  >
                    {i18.t('Bills:goToHistory')}
                  </UTButton>
                </div>
                <div className={styles.rightSection}>
                  <LastBill currentBill={lastBill} loading={lastBillloading} />
                </div>
              </div>
            </Fragment>
          )}
        </UTLoading>
      </div>

      {modalStatus.showModal && currentAccount && (
        <DigitalBillingModal
          contactEmails={currentAccount.contact_emails}
          disableCta={modalStatus.action === 'unsubscribe' ? false : !validateEmail}
          handleCancel={handleCancel}
          handleCta={handleCta}
          modalState={modalStatus}
        >
          {modalStatus.action !== 'unsubscribe' && (
            <Fragment>
              <UTLabel classes={{ root: styles['modal-content'] }}>
                {i18.t('digitalBills:modal.modifyNew')}
              </UTLabel>
              <input
                type="email"
                onChange={handleInput}
                placeholder={i18.t('digitalBills:modal.emailPlaceholder')}
                className={styles.input}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
              {!validateEmail && !!inputValue.length && (
                <span className={styles.validation}>Email invalido</span>
              )}
            </Fragment>
          )}
        </DigitalBillingModal>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  accounts: arrayOf(accountType),
  accountsError: string,
  accountsLoading: bool,
  currentAccount: accountType,
  lastBill: billType,
  lastBillError: string,
  lastBillloading: bool,
  digitalBilling: digitalBillingType,
  digitalBillingLoading: bool
};

const mapStateToProps = store => ({
  accounts: store.accounts.accounts,
  currentAccount: store.accounts.currentAccount,
  accountsError: store.accounts.accountsError,
  lastBill: store.bills.lastBill,
  lastBillError: store.bills.lastBillError,
  lastBillLoading: store.bills.lastBillLoading,
  accountsLoading: store.accounts.accountsLoading,
  digitalBilling: store.bills.digitalBilling,
  digitalBillingLoading: store.bills.digitalBillingLoading
});

export default connect(mapStateToProps)(Home);
