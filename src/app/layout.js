import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/store';
import { HOME, BILLS_HISTORY, LIST_OF_ACCOUNTS } from 'constants/routes';

import Topbar from './components/Topbar';
import Home from './screens/Home';
import BillsHistory from './screens/BillsHistory';
import styles from './styles.module.scss';
import Accounts from './screens/Accounts';

const App = () => (
  <div className={styles.fullContainer}>
    <Topbar />
    <div className={styles.content}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={HOME} component={Home} />
          <Route exact path={BILLS_HISTORY} component={BillsHistory} />
          <Route exact path={LIST_OF_ACCOUNTS} component={Accounts} />
          <Route render={() => <Redirect to={HOME} />} />
        </Switch>
      </ConnectedRouter>
    </div>
  </div>
);

export default App;
