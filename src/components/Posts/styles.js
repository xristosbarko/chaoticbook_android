import { StyleSheet, Dimensions } from 'react-native'

export const styles = (width, height) => StyleSheet.create({
	container: {
		marginVertical: 10
	},
	profile_picture: {
		height: 30,
		width: 30,
		borderRadius: 30 / 2
	},
	image: {
		resizeMode: 'contain',
		width: Dimensions.get('window').width,
		height: height * (Dimensions.get('window').width / width)
	},
	icon: {
		height: 30,
		width: 30
	},
	timestamp: {
		fontSize: 10,
		color: 'gray'
	},
	postTop: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
	}
})