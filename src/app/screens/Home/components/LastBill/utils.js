import React from 'react';

import UTChip from 'app/components/UTChip';

const VENCIDO = 'Impaga';
const POR_VENCER = 'Por vencer';
const PAGADO = 'Pagado';

const labelVariantsByUtility = {
  [VENCIDO]: 'warning',
  [POR_VENCER]: 'gray',
  [PAGADO]: 'success'
};

export const statusLabelRenderer = (data, classNames) =>
  labelVariantsByUtility ? (
    <UTChip value={data} variant={labelVariantsByUtility[data]} classNames={classNames} />
  ) : (
    data
  );
