import i18 from 'i18next';

import customer1 from 'config/customer1/texts';
import customer2 from 'config/customer2/texts';

const texts = {
  customer1,
  customer2
};

i18.init({
  lng: 'es',
  initImmediate: false,
  resources: texts[process.env.REACT_APP_UTILITY_NAME]
});
