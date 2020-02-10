import axios from 'axios'
import { API_ROOT } from '../../../appConfig'

import * as actionTypes from './actionTypes'
import {homePostsLogout, userProfileLogout, profilePostsLogout, pendingFollowsLogout } from './index'
import { startAuthTabs, startMainTabs } from '../../screens/Tabs/index'
import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from 'react-native'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        buttonDisabled: true
    };
};

export const authSuccess = (user_data) => {
    AsyncStorage.setItem('user_id', user_data.user_id.toString())
    AsyncStorage.setItem('username', user_data.username)
    AsyncStorage.setItem('token', user_data.token)
    startMainTabs(user_data.username)
    return {
        type: actionTypes.AUTH_SUCCESS,
        user_id: parseInt(user_data.user_id),
        username: user_data.username,
        token: user_data.token,
        buttonDisabled: false
    };
};

export const authFail = (error) => {
    if (error.non_field_errors) {
        for (let non_field_error of error.non_field_errors) {
            Alert.alert(
                'Σφάλμα',
                non_field_error,
                [
                    {text: 'Εντάξει'}
                ],
                {cancelable: false}
            )
        }
    }
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        buttonDisabled: false
    };
};

export const logout = () => {
    AsyncStorage.removeItem('user_id')
    AsyncStorage.removeItem('username')
    AsyncStorage.removeItem('token')
    homePostsLogout()
    userProfileLogout()
    profilePostsLogout()
    pendingFollowsLogout()
    startAuthTabs()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            username: username,
            password: password
        }
        let url = API_ROOT + 'accounts/login'
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                dispatch(authFail(err.response.data))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const getData = async () => {
            const user_id = await AsyncStorage.getItem('user_id')
            const username = await AsyncStorage.getItem('username')
            const token = await AsyncStorage.getItem('token')
            if (!user_id || !username || !token) {
                dispatch(logout())
            } else {
                dispatch(authSuccess({
                    user_id: user_id,
                    username: username,
                    token: token
                }))
            }
        }
        getData()
    }
}