import { constants } from "../../constants";
import Services from "../../services";
import { history } from '../../history';

export function loginRequest(user) {
    return dispatch => {

        dispatch(request());
        Services.login(user)
            .then(data => {
                if (!data.error) {
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/');
                    dispatch(success(data));
                } else {
                    localStorage.removeItem('user');
                    dispatch(failure(data.error));
                }
            }).catch(error => {
                localStorage.removeItem('user');
                dispatch(failure(error));
            });
    };

    function request() { return { type: constants.LOGIN_REQUEST } }
    function success(data) { return { type: constants.LOGIN_SUCCESS, payload: data, loading: false } }
    function failure(error) { return { type: constants.LOGIN_FAILURE, error, loading: false } }
}