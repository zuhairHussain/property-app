import { constants } from "../../constants";
import Services from "../../services";

export function forkListRequest(id) {
    return dispatch => {

        dispatch(request());
        Services.fetchForkList(id)
            .then(data => {
                if (data.length) {
                    dispatch(success(data));
                } else {
                    dispatch(failure('No fork list found'));
                }
            }).catch(error => {
                console.log(error)
                dispatch(failure('No fork list found'));
            });
    };

    function request() { return { type: constants.FORK_REQUEST } }
    function success(data) { return { type: constants.FORK_SUCCESS, payload: data, loading: false } }
    function failure(error) { return { type: constants.FORK_FAILURE, error, loading: false } }
}