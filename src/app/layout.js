import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { history } from 'redux/store';
import { HOME, BILLS_HISTORY, LIST_OF_PAYMENTS } from 'constants/routes';
import PaymentActions from 'redux/payment/actions';

import Topbar from './components/Topbar';
import Home from './screens/Home';
import BillsHistory from './screens/BillsHistory';
import styles from './styles.module.scss';
import PaymentHistory from './screens/PaymentHistory';
import PaymentDetail from './screens/PaymentDetail';

const App = () => {
  const dispatch = useDispatch();

  const onChangeRouteSetCurrentPayment = () => {
    if (!history.location.pathname.includes(LIST_OF_PAYMENTS)) {
      dispatch(PaymentActions.setCurrentPayment(null));
    }
  };

  useEffect(() => {
    onChangeRouteSetCurrentPayment();
    history.listen(onChangeRouteSetCurrentPayment);
  }, [dispatch]);

  return (
    <div className={styles.fullContainer}>
      <Topbar />
      <div className={styles.content}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route exact path={BILLS_HISTORY} component={BillsHistory} />
            <Route exact path={LIST_OF_PAYMENTS} component={PaymentHistory} />
            <Route exact path={`${LIST_OF_PAYMENTS}/:id`} component={PaymentDetail} />
            <Route render={() => <Redirect to={HOME} />} />
          </Switch>
        </ConnectedRouter>
      </div>
    </div>
  );
};

export default App;
