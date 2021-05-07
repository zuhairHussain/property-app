import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from '../history';
import { PrivateRoute } from '../components/privateRoute';
import routes from '../routes'
import { useSelector } from 'react-redux';

function App() {
  const userList = useSelector(state => state.loginReducer);
  const { loading } = userList;

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {
            routes ? routes.map((route, i) => {
              let Component = route.private ? PrivateRoute : Route;
              return (
                <Component key={i} exact={route.exact ? true : false} path={route.path} component={route.component} />
              )
            }
            ) : ""
          }
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
      {loading && <div className="loader-wrapper"><div className="loader"/></div>}
    </div>
  );
}

export default App;