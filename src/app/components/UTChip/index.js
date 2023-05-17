import React from 'react';
import { elementType, shape, string } from 'prop-types';
import { UTLabel } from '@widergy/energy-ui';

import styles from './styles.module.scss';

const UTChip = ({ classNames = {}, content, Icon, value, variant = 'gray' }) => (
  <div className={`${styles[`${variant}Container`]} ${classNames.container}`}>
    {Icon && <Icon className={`${styles.icon} ${classNames.icon}`} />}
    {value ? (
      <UTLabel
        className={`${styles[`${variant}Label`]} ${classNames.value}`}
        colorTheme={variant}
        variant="small"
        weight="medium"
      >
        {value}
      </UTLabel>
    ) : (
      content
    )}
  </div>
);

UTChip.propTypes = {
  classNames: shape({ string }),
  content: elementType,
  Icon: elementType,
  variant: string,
  value: string
};

export default UTChip;
