import React, { Fragment, useEffect, useMemo, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UTButton, UTLabel, UTLoading } from '@widergy/energy-ui';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { arrayOf, bool, string } from 'prop-types';
import { objectIsEmpty } from '@widergy/web-utils/lib/object';
import i18 from 'i18next';
import DescriptionIcon from '@material-ui/icons/Description';

import appConfig from 'config/appConfig';
import Modal from 'app/components/Modal';
import { BILLS_HISTORY } from 'constants/routes';
import AccountActions from 'redux/accounts/actions';
import BillsActions from 'redux/bills/actions';
import CurrentAccount from 'app/components/CurrentAccount';
import { billType } from 'types/billsTypes';
import { accountType } from 'types/accountTypes';

import DigitalBilling from './components/DigitalBilling';
import LastBill from './components/LastBill';
import styles from './styles.module.scss';

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

  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(`${inputValue}${e.target.value}`);
  };

  const validateEmail = useMemo(() => !!inputValue.match(/^\S+@\S+\.\S+$/), [inputValue]);

  const modalReducer = (modalState, action) => {
    switch (action.type) {
      case 'modify':
        return {
          showModal: true,
          cancelText: i18.t('Home:modal.cancel'),
          ctaText: i18.t('Home:modal.accept'),
          handleCta: (email, profile, close = () => {}) => {
            dispatch(AccountActions.digitalBillingUpdate(email, profile));
            close();
          },
          body: (
            <Fragment>
              <UTLabel classes={{ root: styles['modal-title'] }}>{i18.t('Home:modal.modifyTitle')}</UTLabel>
              <div className={styles['modal-body']}>
                <UTLabel classes={{ root: styles['modal-content'] }}>
                  {i18.t('Home:modal.modifyCurrent')}
                </UTLabel>
                {currentAccount.contact_emails.map(email => (
                  <UTLabel key={email} classes={{ root: styles['modal-emails'] }}>
                    {email}
                  </UTLabel>
                ))}
                <UTLabel classes={{ root: styles['modal-content'] }}>{i18.t('Home:modal.modifyNew')}</UTLabel>
              </div>
              <input
                type="email"
                onChange={handleInput}
                placeholder={i18.t('Home:modal.emailPlaceholder')}
                className={styles['modal-input']}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </Fragment>
          )
        };
      case 'unsubscribe':
        return {
          showModal: true,
          buttonDisable: false,
          cancelText: i18.t('Home:modal.cancel'),
          ctaText: i18.t('Home:modal.accept'),
          handleCta: (email, profile, close = () => {}) => {
            dispatch(AccountActions.digitalBillingUnsubscription(email, profile));
            close();
          },
          body: (
            <Fragment>
              <UTLabel classes={{ root: styles['modal-title'] }}>
                {i18.t('Home:modal.unsubscribeTitle')}
              </UTLabel>
              <div className={styles['modal-body']}>
                <UTLabel classes={{ root: styles['modal-content'] }}>
                  {i18.t('Home:modal.unsubscribeBody')}
                </UTLabel>
              </div>
            </Fragment>
          )
        };
      case 'subscribe':
        return {
          showModal: true,
          cancelText: i18.t('Home:modal.cancel'),
          ctaText: i18.t('Home:modal.accept'),
          handleCta: (email, profile, close = () => {}) => {
            dispatch(AccountActions.digitalBillingSubscription(email, profile));
            close();
          },
          body: (
            <Fragment>
              <UTLabel classes={{ root: styles['modal-title'] }}>
                {i18.t('Home:modal.subscribeTitle')}
              </UTLabel>
              <div className={styles['modal-body']}>
                <UTLabel classes={{ root: styles['modal-content'] }}>
                  {i18.t('Home:modal.subscribeBody')}
                </UTLabel>
              </div>
              <input
                type="email"
                onChange={handleInput}
                placeholder={i18.t('Home:modal.emailPlaceholder')}
                className={styles['modal-input']}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </Fragment>
          )
        };
      case 'close':
        setInputValue('');
        return {
          showModal: false
        };
      default:
        return modalState;
    }
  };

  const [modalState, reducerDispatch] = useReducer(modalReducer, { showModal: false });

  const handleCancel = () => reducerDispatch({ type: 'close' });
  const openModal = type => reducerDispatch({ type });

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
                  emails={currentAccount.contact_emails}
                  handleModify={() => openModal('modify')}
                  handleSubscribe={() => openModal('subscribe')}
                  handleUnsubscribe={() => openModal('unsubscribe')}
                  subscription={currentAccount.adherido_factura_digital}
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

      {modalState.showModal && currentAccount && (
        <Modal
          cancelText={modalState.cancelText}
          ctaText={modalState.ctaText}
          disableCta={modalState.buttonDisable ?? !validateEmail}
          handleCancel={handleCancel}
          handleCta={() =>
            modalState.handleCta(inputValue, currentAccount.perfil, reducerDispatch({ type: 'close' }))
          }
        >
          <div className={styles.modalBody}>{modalState.body}</div>
        </Modal>
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
