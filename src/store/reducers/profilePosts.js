import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    posts: [],
    next: null,
    loading: false,
    isFetching: false,
    error: null
}

const profilePostsStart = (state, action) => {
    return updateObject(state, {
        isFetching: action.isFetching,
        error: action.error
    })
}

const profilePostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        next: action.next,
        isFetching: action.isFetching,
        error: action.error
     })
}

const profilePostsFail = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        isFetching: action.isFetching,
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        posts: [],
        next: null,
        loading: false,
        isFetching: false,
        error: null
    })
}

const profilePostsLoadMoreStart = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error
    })
}

const profilePostsLoadMoreSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        next: action.next,
        loading: action.loading,
        error: action.error
     })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROFILE_POSTS_START: return profilePostsStart(state, action)
        case actionTypes.PROFILE_POSTS_SUCCESS: return profilePostsSuccess(state, action)
        case actionTypes.PROFILE_POSTS_FAIL: return profilePostsFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.PROFILE_POSTS_LOAD_MORE_START: return profilePostsLoadMoreStart(state, action)
        case actionTypes.PROFILE_POSTS_LOAD_MORE_SUCCESS: return profilePostsLoadMoreSuccess(state, action)
        default:
            return state
    }
}

export default reducer