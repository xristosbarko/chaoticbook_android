import axios from 'axios'
import { API_ROOT } from '../../../appConfig'

import * as actionTypes from './actionTypes'

export const userProfileStart = () => {
    return {
        type: actionTypes.USER_PROFILE_START
    }
}

export const userProfileSuccess = (user) => {
    return {
        type: actionTypes.USER_PROFILE_SUCCESS,
        user: user
    }
}

export const userProfileFail = (error) => {
    return {
        type: actionTypes.USER_PROFILE_FAIL,
        error: error
    }
}

export const userProfileLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const userProfile = () => {
    return (dispatch, getState) => {
        dispatch(userProfileStart())
        const config = {
            headers: {
                Authorization: "Token " + getState().auth.token
            }
        }
        let url = API_ROOT + 'profiles/getUserProfile'
        axios.get(url, config)
            .then(response => {
                dispatch(userProfileSuccess(response.data))
            })
            .catch(err => {
                dispatch(userProfileFail(err.response.data.error))
            })
    }
}