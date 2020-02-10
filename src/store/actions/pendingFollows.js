import axios from 'axios'
import { API_ROOT } from '../../../appConfig'

import * as actionTypes from './actionTypes'

export const pendingFollowsStart = () => {
    return {
        type: actionTypes.PENDING_FOLLOWS_START
    }
}

export const pendingFollowsSuccess = (pendingFollows) => {
    return {
        type: actionTypes.PENDING_FOLLOWS_SUCCESS,
        pendingFollows: pendingFollows.results
    }
}

export const pendingFollowsFail = (error) => {
    return {
        type: actionTypes.PENDING_FOLLOWS_FAIL,
        error: error
    }
}

export const pendingFollowsLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const pendingFollows = () => {
    return (dispatch, getState) => {
        dispatch(pendingFollowsStart())
        const config = {
            headers: {
                Authorization: "Token " + getState().auth.token
            }
        }
        let url = API_ROOT + 'follows/getFollowers?pending=True'
        axios.get(url, config)
            .then(response => {
                dispatch(pendingFollowsSuccess(response.data))
            })
            .catch(error => {
                dispatch(pendingFollowsFail(err.response.data.error))
            })
    }
}