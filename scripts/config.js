/* 
Array of strings that defines customers' name, 
this is used to check whether it is a valid customer or not
*/
exports.CUSTOMERS = ['idinir', 'segba'];

exports.ENVIRONMENTS = ['dev'];

// You could add here specific environment customers variables
exports.CUSTOMER_ENVIRONMENTS_CONF = {
  idinir: {
    dev: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    }
  },
  segba: {
    dev: {
      REACT_APP_GMAPS_API_KEY: 'Your google maps api key',
      REACT_APP_ANALYTICS_TRACKING_ID: 'Your Analytics Tracking ID'
    }
  }
};

// You could add here multiple customers and their environment variables
exports.CUSTOMERS_CONF = {
  idinir: {
    REACT_APP_WEB_TITLE: 'Widergy - Oficina virtual - IDINIR'
  },
  segba: {
    REACT_APP_WEB_TITLE: 'Widergy - Oficina virtual - SEGBA'
  }
};

// You could add here specific environment variables
exports.ENVIRONMENTS_CONF = {
  dev: {
    REACT_APP_API_BASE_URL: 'Your api base url'
  }
};
