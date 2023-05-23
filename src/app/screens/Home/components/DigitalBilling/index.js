import React, { Fragment } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { UTCard, UTLabel, UTButton } from '@widergy/energy-ui';
import i18 from 'i18next';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import styles from './styles.module.scss';

const DigitalBilling = ({ emails, handleModify, handleSubscribe, handleUnsubscribe, subscription }) => (
  <UTCard classNames={{ base: styles.digitalBilling }}>
    <UTLabel className={styles.title}>{i18.t('Home:digitalBilling')}</UTLabel>
    {subscription ? (
      <Fragment>
        <div className={styles['subscriptionTag-success']}>
          <CheckCircleIcon className={styles['icon-success']} />
          <span>{i18.t('Home:digitalBillSubscribed')}</span>
        </div>
        <ul className={styles.emailList}>
          <span>Emails asociados:</span>
          {emails.map(email => (
            <li key={email}>{email}</li>
          ))}
        </ul>
        <div className={styles.buttonsBox}>
          <UTButton classNames={{ root: styles['digitalBillingButtons-modify'] }} onClick={handleModify}>
            {i18.t('Home:digitalBillingModify')}
          </UTButton>
          <UTButton
            classNames={{ root: styles['digitalBillingButtons-unsubscribe'] }}
            onClick={handleUnsubscribe}
          >
            {i18.t('Home:digitalBillingUnsubscribe')}
          </UTButton>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className={styles['subscriptionTag-error']}>
          <CancelIcon className={styles['icon-error']} />
          <span>{i18.t('Home:digitalBillNotSubscribed')}</span>
        </div>
        <div className={styles.buttonsBox}>
          <UTButton
            classNames={{ root: styles['digitalBillingButtons-subscribe'] }}
            onClick={handleSubscribe}
          >
            {i18.t('Home:digitalBillingSubscribe')}
          </UTButton>
        </div>
      </Fragment>
    )}
  </UTCard>
);

DigitalBilling.propTypes = {
  emails: arrayOf(string),
  handleModify: func,
  handleSubscribe: func,
  handleUnsubscribe: func,
  subscription: bool
};

export default DigitalBilling;
