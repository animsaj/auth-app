import { AUTHENTICATE, UNAUTHENTICATE, ERRORS, FETCH_RESPONSE } from '../actions/actionTypes';

const initialState = { authenticated: false, error: '', message: '' }

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return { ...state, authenticated: true }
        case UNAUTHENTICATE:
            return { ...state, authenticated: false }
        case ERRORS:
            return { ...state, error: action.payload }
        case FETCH_RESPONSE:
            return { ...state, message: action.payload }
        default:
            return state;
    }
}