import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    posts: [],
    next: null,
    loading: false,
    isFetching: false,
    error: null
}

const homePostsStart = (state, action) => {
    return updateObject(state, {
        isFetching: action.isFetching,
        error: action.error
    })
}

const homePostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        next: action.next,
        isFetching: action.isFetching,
        error: action.error
     })
}

const homePostsFail = (state, action) => {
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

const homePostsLoadMoreStart = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error
    })
}

const homePostsLoadMoreSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        next: action.next,
        loading: action.loading,
        error: action.error
     })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HOME_POSTS_START: return homePostsStart(state, action)
        case actionTypes.HOME_POSTS_SUCCESS: return homePostsSuccess(state, action)
        case actionTypes.HOME_POSTS_FAIL: return homePostsFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.HOME_POSTS_LOAD_MORE_START: return homePostsLoadMoreStart(state, action)
        case actionTypes.HOME_POSTS_LOAD_MORE_SUCCESS: return homePostsLoadMoreSuccess(state, action)
        default:
            return state
    }
}

export default reducer