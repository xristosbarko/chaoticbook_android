import React from 'react'
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const PostDetails = (props) => {
	const { comment } = props
	return (
		<View style={{flexDirection: 'row'}}>
			<TouchableWithoutFeedback onPress={props.usernamePressed}>
				<View style={{flexDirection: 'row'}}>
					<Image source={{uri: comment.user.profile_picture}} style={styles.image} />
					<Text>
						{comment.user.username}
					</Text>
				</View>
			</TouchableWithoutFeedback>
			<Text>{comment.text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 30,
		width: 30,
		borderRadius: 30 / 2
	}
})

export default PostDetails