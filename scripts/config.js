/* 
Array of strings that defines customers' name, 
this is used to check whether it is a valid customer or not
*/
exports.CUSTOMERS = ['customer1', 'customer2'];

exports.ENVIRONMENTS = ['dev', 'qa', 'prod'];

// You could add here specific environment customers variables
exports.CUSTOMER_ENVIRONMENTS_CONF = {
  customer1: {
    dev: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    },
    qa: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    },
    prod: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    }
  },
  customer2: {
    dev: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    },
    qa: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    },
    prod: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    }
  }
};

// You could add here multiple customers and their environment variables
exports.CUSTOMERS_CONF = {
  customer1: {
    REACT_APP_WEB_TITLE: 'Widergy - Cliente 1'
  },
  customer2: {
    REACT_APP_WEB_TITLE: 'Widergy - Cliente 2'
  }
};

// You could add here specific environment variables
exports.ENVIRONMENTS_CONF = {
  dev: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  },
  qa: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  },
  prod: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  }
};
