
import { constants } from "../../constants";
const initialState = { url: '', error: '', forkList: [], loading: false }

const forkReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.FORK_REQUEST:
            return {...state, forkList: [], url: '', error: '', loading: true};
        case constants.FORK_SUCCESS:
            return {...state, forkList: [...action.payload], url: action.url, error: '', loading: false}
        case constants.FORK_FAILURE:
            return {...state, forkList: [], url: action.url, error: action.error, loading: false};
        default:
            return state;
    }
}

export default forkReducer;