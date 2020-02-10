import React, { useState } from 'react'
import { View, Text, Image, Button, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import * as actions from '../../store/actions/index'
import { styles } from './styles'
import { DefaultButton } from '../../utils/formElements/DefaultButton'

const UserDetails = (props) => {
	const { user } = props

	let initFollow = false
	if (user.follow) {
		initFollow = user.follow
	}
	const [follow, setFollow] = useState(initFollow)
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const onFollowHandler = () => {
		setButtonDisabled(true)
		setFollow(prevFollow => {
			if (prevFollow.sent == false) {
				return {
					sent: true,
					pending: true
				}
			} else {
				return {
					sent: false
				}
			}
		})
		const config = {
			headers: {
				Authorization: "Token " + props.token
			}
		}
		if (!follow.sent) {
			const url = 'follows/create'
			const data = {
				user_id: user.user_id
			}
			
			axios.post(API_ROOT + url, data, config)
				.then(response => {
					setButtonDisabled(false)
				})
				.catch(error => {
					console.log('Follow Error')
				})
		} else {
			const url = 'follows/delete/' + user.user_id
			axios.delete(API_ROOT + url, config)
				.then(response => {
					props.onUserProfile()
					setButtonDisabled(false)
				})
				.catch(error => {
					console.log('UnFollow Error')
				})
		}
	}

	let followButton = null

	if (user.follow) {
		if (follow.sent) {
			if (follow.pending) {
				followButton = (
					<DefaultButton onPress={() => onFollowHandler()} disabled={buttonDisabled}>
						Αίτημα Στάλθηκε
					</DefaultButton>
				)
			} else {
				followButton = (
					<DefaultButton onPress={() => onFollowHandler()} disabled={buttonDisabled}>
						Ακολουθείτε
					</DefaultButton>
				)
			}
		} else {
			followButton = (
				<DefaultButton onPress={() => onFollowHandler()} disabled={buttonDisabled}>
					Ακολουθήστε
				</DefaultButton>
			)
		}
	}

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={props.usernamePressed}>
				<View style={styles.user}>
					<View style={{paddingRight: 10}}>
						<Image source={{uri: user.profile_picture}} style={styles.profile_picture} />
					</View>
					<Text>
						{user.username}
					</Text>
				</View>
			</TouchableWithoutFeedback>
			{followButton ?
				<View style={styles.follow}>
					{followButton}
				</View> : null }
		</View>
	)
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUserProfile: () => dispatch(actions.userProfile())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)