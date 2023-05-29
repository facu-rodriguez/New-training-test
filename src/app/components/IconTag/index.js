import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { tagTypes } from 'types/tagTypes';

import styles from './styles.module.scss';

const IconTag = ({ tagState }) => (
  <div className={styles[`subscriptionTag-${tagState.status}`]}>
    {tagState.status === 'success' ? (
      <CheckCircleIcon className={styles['icon-success']} />
    ) : (
      <CancelIcon className={styles['icon-error']} />
    )}
    <span>{tagState.text}</span>
  </div>
);

IconTag.propTypes = {
  tagState: tagTypes
};

export default IconTag;
