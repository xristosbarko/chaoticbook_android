import axios from 'axios'
import { API_ROOT } from '../../../appConfig'

import * as actionTypes from './actionTypes'

export const homePostsStart = () => {
    return {
        type: actionTypes.HOME_POSTS_START,
        isFetching: true,
        error: null
    }
}

export const homePostsSuccess = (posts) => {
    return {
        type: actionTypes.HOME_POSTS_SUCCESS,
        posts: posts.results,
        next: posts.next,
        isFetching: false,
        error: null
    }
}

export const homePostsFail = (error) => {
    return {
        type: actionTypes.HOME_POSTS_FAIL,
        loading: false,
        isFetching: false,
        error: error
    }
}

export const homePostsLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const homePosts = () => {
    return (dispatch, getState) => {
        dispatch(homePostsStart())
        const state = getState()
        const config = {
            headers: {
                Authorization: "Token " + state.auth.token
            }
        }
        let url = API_ROOT + 'posts/getFollowingsPosts'
        
        axios.get(url, config)
            .then(response => {
                dispatch(homePostsSuccess(response.data))
            })
            .catch(err => {
                dispatch(homePostsFail(err.response.data.error))
            })
    }
}

export const homePostsLoadMoreStart = () => {
    return {
        type: actionTypes.HOME_POSTS_LOAD_MORE_START,
        loading: true,
        error: null
    }
}

export const homePostsLoadMoreSuccess = (posts, prevPosts) => {
    const updatedPosts = [...prevPosts, ...posts.results]
    return {
        type: actionTypes.HOME_POSTS_LOAD_MORE_SUCCESS,
        posts: updatedPosts,
        next: posts.next,
        loading: false,
        error: null
    }
}

export const homePostsLoadMore = () => {
    return (dispatch, getState) => {
        const state = getState()
        const next = state.homePosts.next
        if (!next) {
            return
        }
        dispatch(homePostsLoadMoreStart())
        const config = {
            headers: {
                Authorization: "Token " + state.auth.token
            }
        }
        let url = next
        
        axios.get(url, config)
            .then(response => {
                dispatch(homePostsLoadMoreSuccess(response.data, state.homePosts.posts))
            })
            .catch(err => {
                dispatch(homePostsFail(err.response.data.error))
            })
    }
}