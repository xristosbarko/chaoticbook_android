import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { userProfile } from '../../store/actions/userProfile'
import { DefaultButton } from '../../utils/formElements/DefaultButton'

const UserAcceptOrDecline = (props) => {
	const { user } = props

	const [accepted, setAccepted] = useState(null)
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const onAcceptOrDeclineHandler = (decline) => {
		setButtonDisabled(true)

		let url = API_ROOT + 'follows/accept_or_decline/' + user.user_id
		if (decline) {
			url += '?decline=True'
		}
		const config = {
			headers: {
				Authorization: "Token " + props.token
			}
		}

		axios.get(url, config)
			.then(response => {
				if (!decline) {
					setAccepted(true)
				} else {
					setAccepted(false)
				}
				setButtonDisabled(false)
			})
			.catch(error => {
				console.log("Accept Or Decline Error")
			})
	}

	let showButtons = (
		<>
			<DefaultButton onPress={() => onAcceptOrDeclineHandler()} disabled={buttonDisabled}>
				Αποδοχή
			</DefaultButton>
			<DefaultButton onPress={() => onAcceptOrDeclineHandler('decline')} disabled={buttonDisabled}>
				Διαγραφή
			</DefaultButton>
		</>
	)
	if (accepted !== null) {
		if (accepted) {
			props.onUserProfile()
			showButtons = <Text>Αποδέχτηκε</Text>
		} else {
			showButtons = <Text>Aπορρίφθηκε</Text>
		}
	}

	return (
		<View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
			<TouchableWithoutFeedback onPress={props.usernamePressed}>
				<View style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
					<Image source={{uri: user.profile_picture}} style={styles.profile_picture} />
					<Text>
						{user.username}
					</Text>
				</View>
			</TouchableWithoutFeedback>
			<View style={{flexDirection: 'row', width: '50%'}}>
				{showButtons}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	profile_picture: {
		height: 30,
		width: 30,
		borderRadius: 30 / 2
	}
})

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUserProfile: () => dispatch(userProfile())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAcceptOrDecline)