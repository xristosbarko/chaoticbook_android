import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    pendingFollows: []
}

const pendingFollowsStart = (state, action) => {
    return updateObject(state, {error: null})
}

const pendingFollowsSuccess = (state, action) => {
    return updateObject(state, {
        pendingFollows: action.pendingFollows,
        error: null
     })
}

const pendingFollowsFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        pendingFollows: []
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PENDING_FOLLOWS_START: return pendingFollowsStart(state, action)
        case actionTypes.PENDING_FOLLOWS_SUCCESS: return pendingFollowsSuccess(state, action)
        case actionTypes.PENDING_FOLLOWS_FAIL: return pendingFollowsFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        default:
            return state
    }
}

export default reducer