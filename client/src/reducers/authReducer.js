import { authConstants } from '../constants/commonConstants';
const initialState = {
    isLogin: false,
    loginErrorMessage: "",
    user: "",
    loading: false
}

export default function authReducer(state = initialState, action) {
    console.log("action", action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return { isLogin: false, loginErrorMessage: "", user: '', loading: true }
        case authConstants.LOGIN_SUCCESS:
            return { isLogin: true, loginErrorMessage: "", user: action.user, loading: false }
        case authConstants.LOGIN_FAILURE:
            return { isLogin: false, loginErrorMessage: action.error, user: '', loading: false }
        default:
            return state
    }
}