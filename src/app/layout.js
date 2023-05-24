import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/store';
import { HOME, BILLS_HISTORY, PAYMENTS_HISTORY } from 'constants/routes';

import Topbar from './components/Topbar';
import Home from './screens/Home';
import BillsHistory from './screens/BillsHistory';
import styles from './styles.module.scss';
import PaymentsHistory from './screens/PaymentsHistory';
import PaymentDetail from './screens/PaymentsHistory/components/PaymentDetail';

const App = () => (
  <div className={styles.fullContainer}>
    <Topbar />
    <div className={styles.content}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={HOME} component={Home} />
          <Route exact path={BILLS_HISTORY} component={BillsHistory} />
          <Route exact path={PAYMENTS_HISTORY} component={PaymentsHistory} />
          <Route exact path={`${PAYMENTS_HISTORY}/:id`} component={PaymentDetail} />
          <Route render={() => <Redirect to={HOME} />} />
        </Switch>
      </ConnectedRouter>
    </div>
  </div>
);

export default App;
