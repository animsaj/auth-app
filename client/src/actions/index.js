
import axios from 'axios';
import history from '../history';
import { AUTHENTICATE, ERRORS, UNAUTHENTICATE, FETCH_RESPONSE } from './actionTypes';

const ROOT_URL = 'http://localhost:3030';

export function signinUser({ email, password }) {
    return dispatch => {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTHENTICATE });
                localStorage.setItem('token', response.data.token);
                history.push('/secretPage');
            })
            .catch(() => {
                dispatch(authError('Bad login info'))
            })
    }
}

export function signupUser({ email, password }) {
    return dispatch => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTHENTICATE });
                localStorage.setItem('token', response.data.token);
                history.push('/secretPage');
            })
            .catch((err) => {
                dispatch(authError(err.message))
            })
    }
}

export function signoutUser() {
    return dispatch => {
        dispatch({ type: UNAUTHENTICATE });
        localStorage.removeItem('token');
    }
}

export function authError(error) {
    return {
        type: ERRORS,
        payload: error
    }
}

export function fetchResponse() {
    return dispatch => {
        axios.get(ROOT_URL, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => dispatch({ type: FETCH_RESPONSE, payload: response.data.message }))
    }
}