import { constants } from "../../constants";
import Services from "../../services";

export function gistRequest(username) {
    return dispatch => {

        dispatch(request());
        Services.fetchAllGists(username)
            .then(users => {
                if (users.length) {
                    dispatch(success(users, username));
                } else {
                    dispatch(failure(`No gists found for user: ${username}`));
                }
            }).catch(error => {
                console.log(error)
                dispatch(failure(`No gists found for user: ${username}`));
            });
    };

    function request() { return { type: constants.GIST_REQUEST } }
    function success(data, username) { return { type: constants.GIST_SUCCESS, payload: data, username, loading: false } }
    function failure(error) { return { type: constants.GIST_FAILURE, error, loading: false } }
}