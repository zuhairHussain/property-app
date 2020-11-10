import React, { useEffect, useState } from "react";
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import ErrorPage from './errorPage/errorPage';
import Loader from '../includes/loader'
import { history } from '../history';
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { verifyToken, loader } from '../actions/actions';
import PrivateRoute from '../includes/privateRoute';

function App(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(function () {
    props.verifyToken();
    setLoaded(true);
  }, [loaded]);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} authed={props.auth.isLogin} />
          <Route path="*">
            <ErrorPage errCode="404" />
          </Route>
        </Switch>
      </Router>
      <Loader show={props.loading} />
    </div>
  );
}

function mapState(state) {
  const { loaderReducer, authReducer } = state;
  return { loading: loaderReducer.loading, auth: authReducer };
}
const actionCreators = {
  loader: loader,
  verifyToken: verifyToken
};

export default connect(mapState, actionCreators)(App);
