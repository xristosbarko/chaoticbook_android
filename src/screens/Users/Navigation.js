import { Navigation } from 'react-native-navigation'

export const onUsernamePressedHandler = (props, user) => {
	Navigation.push(props.componentId, {
		component: {
			name: 'ProfileScreen',
			passProps: {
				user_id: user.user_id
			},
			options: {
				topBar: {
					title: {
						text: user.username
					}
				}
			}
		}
	})
}