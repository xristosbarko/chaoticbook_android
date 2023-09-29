import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DefaultButton } from '../../utils/formElements/DefaultButton'


const ProfileDetails = (props) => {
	const { user } = props

	const checkCount = (count, type) => {
		if (count !== 0) {
			if (type == 'followers') {
				props.followersCountPressed()
			} else if (type == 'followings') {
				props.followingsCountPressed()
			} else {
				console.log('[ProfileDetails] Check followers or following count')
			}
		}
	}

	return (
		<View>
			<View style={{flexDirection: 'row', margin: 5}}>
				<Image source={{uri: user.profile_picture}} style={styles.profile_picture} />
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<TouchableWithoutFeedback onPress={props.postCountPressed}>
						<View style={{margin: 5}}>
							<Text style={{textAlign: 'center'}}>{user.posts_count}</Text>
							<Text style={{textAlign: 'center'}}>Δημοσιεύσεις</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => checkCount(user.followers_count, 'followers')}>
						<View style={{margin: 5}}>
							<Text style={{textAlign: 'center'}}>{user.followers_count}</Text>
							<Text style={{textAlign: 'center'}}>Ακόλουθοι</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => checkCount(user.followings_count, 'followings')}>
						<View style={{margin: 5}}>
							<Text style={{textAlign: 'center'}}>{user.followings_count}</Text>
							<Text style={{textAlign: 'center'}}>Ακολουθείτε</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
			{user.last_name || user.first_name ? <Text>{user.last_name} {user.first_name}</Text> : null}
			{user.bio ? <Text>{user.bio}</Text> : null }
			{props.user_id === user.id ?
				<DefaultButton onPress={props.profileEditPressed}>
					Επεξεργασία Προφίλ
				</DefaultButton> :
			 null}
		</View>
	)
}

const styles = StyleSheet.create({
	profile_picture: {
		height: 60,
		width: 60,
		borderRadius: 60 / 2
	}
})

const mapStateToProps = state => {
	return {
		user_id: state.auth.user_id,
		token: state.auth.token,
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(ProfileDetails)