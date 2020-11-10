import { LOADER_REQUEST } from '../constants/commonConstants';
const initialState = {
    loading: false
}

export default function loaderReducer(state = initialState, action) {
    switch (action.type) {
        case LOADER_REQUEST:
            return { loading: action.show }
        default:
            return state
    }
}