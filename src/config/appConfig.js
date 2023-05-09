import customer1 from 'config/customer1/config';
import customer2 from 'config/customer2/config';

const configs = {
  customer1,
  customer2
};

export default configs[process.env.REACT_APP_UTILITY_NAME];
