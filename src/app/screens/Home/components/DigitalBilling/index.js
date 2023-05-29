import React, { Fragment } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { UTCard, UTLabel, UTButton, UTLoading } from '@widergy/energy-ui';
import i18 from 'i18next';

import { tagTypes } from 'types/tagTypes';
import IconTag from 'app/components/IconTag';

import styles from './styles.module.scss';

const DigitalBilling = ({
  emails,
  handleModify,
  handleSubscribe,
  handleUnsubscribe,
  loading,
  subscription,
  tagState
}) => (
  <UTCard classNames={{ base: styles.digitalBilling }}>
    <UTLoading loading={loading}>
      <UTLabel className={styles.title}>{i18.t('digitalBills:digitalBilling')}</UTLabel>
      <IconTag tagState={tagState} />
      {subscription && (
        <ul className={styles.emailList}>
          <span>Emails asociados:</span>
          {emails.map(email => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      )}
      <div className={styles.buttonsBox}>
        {subscription ? (
          <Fragment>
            <UTButton classNames={{ root: styles['digitalBillingButtons-modify'] }} onClick={handleModify}>
              {i18.t('digitalBills:digitalBillingModify')}
            </UTButton>
            <UTButton
              classNames={{ root: styles['digitalBillingButtons-unsubscribe'] }}
              onClick={handleUnsubscribe}
            >
              {i18.t('digitalBills:digitalBillingUnsubscribe')}
            </UTButton>
          </Fragment>
        ) : (
          <UTButton
            classNames={{ root: styles['digitalBillingButtons-subscribe'] }}
            onClick={handleSubscribe}
          >
            {i18.t('digitalBills:digitalBillingSubscribe')}
          </UTButton>
        )}
      </div>
    </UTLoading>
  </UTCard>
);

DigitalBilling.propTypes = {
  emails: arrayOf(string),
  handleModify: func,
  handleSubscribe: func,
  handleUnsubscribe: func,
  loading: bool,
  subscription: bool,
  tagState: tagTypes
};

export default DigitalBilling;
