import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from '../routes'
import { useSelector } from 'react-redux';

function App() {
  const userList = useSelector(state => state.gistReducer);
  const { loading } = userList;

  return (
    <div className="App">
      <Router>
          {
            routes ? routes.map((route, i) => {
                return (
                  <Route key={i} exact={route.exact ? true : false} path={route.path} component={route.component} />
                )
              }
            ) : ""
          }
      </Router>
      {loading && <div className="loader-wrapper"><div className="loader"/></div>}
    </div>
  );
}

export default App;