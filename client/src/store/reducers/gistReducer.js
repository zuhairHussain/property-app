
import { constants } from "../../constants";
const initialState = { username: '', error: '', gistList: [], loading: false }

const gistReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GIST_REQUEST:
            return {...state, gistList: [], username: '', error: '', loading: true};
        case constants.GIST_SUCCESS:
            return {...state, gistList: [...action.payload], username: action.username, error: '', loading: false}
        case constants.GIST_FAILURE:
            return {...state, gistList: [], username: action.username, error: action.error, loading: false};
        default:
            return state;
    }
}

export default gistReducer;