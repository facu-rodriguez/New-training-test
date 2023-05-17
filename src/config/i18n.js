import i18 from 'i18next';

import idinir from 'config/idinir/texts';
import segba from 'config/segba/texts';

const texts = {
  idinir,
  segba
};

i18.init({
  lng: 'es',
  initImmediate: false,
  resources: texts[process.env.REACT_APP_UTILITY_NAME]
});
