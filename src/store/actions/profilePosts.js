import axios from 'axios'
import { API_ROOT } from '../../../appConfig'

import * as actionTypes from './actionTypes'

export const profilePostsStart = () => {
    return {
        type: actionTypes.PROFILE_POSTS_START,
        isFetching: true,
        error: null
    }
}

export const profilePostsSuccess = (posts) => {
    return {
        type: actionTypes.PROFILE_POSTS_SUCCESS,
        posts: posts.results,
        next: posts.next,
        isFetching: false,
        error: null
    }
}

export const profilePostsFail = (error) => {
    return {
        type: actionTypes.PROFILE_POSTS_FAIL,
        loading: false,
        isFetching: false,
        error: error
    }
}

export const profilePostsLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const profilePosts = () => {
    return (dispatch, getState) => {
        dispatch(profilePostsStart())
        const state = getState()
        const config = {
            headers: {
                Authorization: "Token " + state.auth.token
            }
        }
        let url = API_ROOT + 'posts/'
        axios.get(url, config)
            .then(response => {
                dispatch(profilePostsSuccess(response.data))
            })
            .catch(error => {
                dispatch(profilePostsFail(err.response.data.error))
            })
    }
}

export const profilePostsLoadMoreStart = () => {
    return {
        type: actionTypes.PROFILE_POSTS_LOAD_MORE_START,
        loading: true,
        error: null
    }
}

export const profilePostsLoadMoreSuccess = (posts, prevPosts) => {
    const updatedPosts = [...prevPosts, ...posts.results]
    return {
        type: actionTypes.PROFILE_POSTS_LOAD_MORE_SUCCESS,
        posts: updatedPosts,
        next: posts.next,
        loading: false,
        error: null
    }
}

export const profilePostsLoadMore = () => {
    return (dispatch, getState) => {
        const state = getState()
        const next = state.profilePosts.next
        if (!next) {
            return
        }
        dispatch(profilePostsLoadMoreStart())
        const config = {
            headers: {
                Authorization: "Token " + state.auth.token
            }
        }
        let url = next
        
        axios.get(url, config)
            .then(response => {
                dispatch(profilePostsLoadMoreSuccess(response.data, state.profilePosts.posts))
            })
            .catch(err => {
                dispatch(profilePostsFail(err.response.data.error))
            })
    }
}