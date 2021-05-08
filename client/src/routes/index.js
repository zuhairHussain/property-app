import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import EditUser from '../components/User/EditUser'

let routes = [
    {
        path: "/",
        component: Dashboard,
        exact: true,
        private: true
    },
    {
        path: "/edituser",
        component: EditUser,
        exact: true,
        private: true
    },
    {
        path: "/login",
        component: Login,
        exact: true
    },
]

export default routes;