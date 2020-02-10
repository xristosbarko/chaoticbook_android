import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Navigation } from "react-native-navigation"
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'

const ProfilePostDetails = (props) => {
	const { post } = props

	return (
		<View style={styles.container}>
			<Image source={{uri: post.picture}} style={styles.image} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex:1
	},
	image: {
		margin: 2.5,
		width: (Dimensions.get('window').width / 3) - 5,
		height: (Dimensions.get('window').width / 3) - 5
	}
})

export default ProfilePostDetails