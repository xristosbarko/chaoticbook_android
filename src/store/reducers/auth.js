import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    user_id: null,
    username: null,
    token: null,
    error: null,
    buttonDisabled: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        buttonDisabled: action.buttonDisabled
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        user_id: action.user_id,
        username: action.username,
        token: action.token,
        error: null,
        buttonDisabled: action.buttonDisabled
     })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        buttonDisabled: action.buttonDisabled
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        user_id: null,
        username: null,
        token: null,
        error: null,
        buttonDisabled: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        default:
            return state
    }
}

export default reducer