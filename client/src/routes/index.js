import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';

let routes = [
    {
        path: "/",
        component: Dashboard,
        exact: true,
        private: true
    },
    {
        path: "/login",
        component: Login,
        exact: true
    }
]

export default routes;