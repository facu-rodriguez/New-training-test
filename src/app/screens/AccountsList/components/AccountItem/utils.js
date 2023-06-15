import React from 'react';

import UTChip from 'app/components/UTChip';

const ACTIVE = 'activo';
const INACTIVE = 'inactivo';
const SUSPENDED = 'suspendidoimpago';
const DROP_IN_PROGRESS = 'bajaentratamiento';

const labelVariants = {
  [ACTIVE]: 'success',
  [INACTIVE]: 'gray',
  [SUSPENDED]: 'warning',
  [DROP_IN_PROGRESS]: 'error'
};

export const statusLabelRenderer = (data, classNames) =>
  labelVariants ? <UTChip value={data} variant={labelVariants[data]} classNames={classNames} /> : data;
