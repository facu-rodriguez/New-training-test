import idinir from 'config/idinir/config';
import segba from 'config/segba/config';

const configs = {
  idinir,
  segba
};

export default configs[process.env.REACT_APP_UTILITY_NAME];
