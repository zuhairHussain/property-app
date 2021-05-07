
import { constants } from "../../constants";
const initialState = { error: '', userData: null, loading: false }

let localUserData = localStorage.getItem('user') ? localStorage.getItem('user') : null;
if(localUserData)
    initialState['userData'] = JSON.parse(localUserData);

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.LOGIN_REQUEST:
            return {...state, userData: null, error: '', loading: true};
        case constants.LOGIN_SUCCESS:
            return {...state, userData: action.payload, error: '', loading: false}
        case constants.LOGIN_FAILURE:
            return {...state, userData: null, error: action.error, loading: false};
        default:
            return state;
    }
}

export default loginReducer;