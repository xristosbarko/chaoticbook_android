import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    user: undefined
}

const userProfileStart = (state, action) => {
    return updateObject(state, {error: null})
}

const userProfileSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        error: null
     })
}

const userProfileFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        user: undefined
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_START: return userProfileStart(state, action)
        case actionTypes.USER_PROFILE_SUCCESS: return userProfileSuccess(state, action)
        case actionTypes.USER_PROFILE_FAIL: return userProfileFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        default:
            return state
    }
}

export default reducer