import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},
	user: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 5,
	},
	profile_picture: {
		height: 30,
		width: 30,
		borderRadius: 30 / 2
	},
	follow: {
		justifyContent: 'flex-end',
		marginRight: 5
	}
})