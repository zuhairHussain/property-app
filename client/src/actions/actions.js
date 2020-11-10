import { authConstants, LOADER_REQUEST } from '../constants/commonConstants';
import { history } from '../history';
import Service from '../services/services';
let service = new Service();

export function loginRequest(data) {
    return dispatch => {
        dispatch(loader(true));
        dispatch(request());
        service.login(data)
            .then(response => response.json())
            .then(result => {
                if (result.auth) {
                    localStorage.setItem("token", result.token)
                    dispatch(success(result));
                    history.push("/");
                    dispatch(loader(false));
                } else {
                    if (result.error) {
                        dispatch(failure(result.error));
                    } else {
                        dispatch(failure("Unable to login!"));
                    }
                    dispatch(loader(false));
                }
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(loader(false));
            });
    };

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}
export function verifyToken() {
    let token = localStorage.getItem("token");
    if (token) {
        return dispatch => {
            dispatch(loader(true));
            dispatch(request());
            service.verifyToken(token)
                .then(response => response.json())
                .then(result => {
                    if (result.auth) {
                        dispatch(success(result.user));
                        history.push("/");
                        dispatch(loader(false));
                    } else {
                        localStorage.removeItem(token);
                        dispatch(loader(false));
                    }
                })
                .catch(error => {
                    localStorage.removeItem(token);
                    dispatch(loader(false));
                });
        };
    } else {
        return dispatch => {
            dispatch(loader(false));
        }
    }

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
}
export function loader(show) {
    return { type: LOADER_REQUEST, show }
}