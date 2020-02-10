import { Navigation } from 'react-native-navigation'

export const onPostsCountPressedHandler = (props, user, posts, next) => {
	Navigation.push(props.componentId, {
		component: {
			name: 'PostsScreen',
			passProps: {
				user_id: user.id,
				posts: posts,
				next: next
			},
			options: {
				topBar: {
					title: {
						text: 'Δημοσιεύσεις'
					},
					rightButtons: []
				}
			}
		}
	})
}

export const onFollowersCountPressedHandler = (props, user) => {
	Navigation.push(props.componentId, {
		component: {
			name: 'UsersScreen',
			passProps: {
				user_id: user.id,
				screenType: 'followers'
			},
			options: {
				topBar: {
					title: {
						text: user.username
					},
					rightButtons: []
				}
			}
		}
	})
}

export const onFollowingsCountPressedHandler = (props, user) => {
	Navigation.push(props.componentId, {
		component: {
			name: 'UsersScreen',
			passProps: {
				user_id: user.id,
				screenType: 'followings'
			},
			options: {
				topBar: {
					title: {
						text: user.username
					},
					rightButtons: []
				}
			}
		}
	})
}

export const onProfileEditPressedHandler = (props) => {
	Navigation.push(props.componentId, {
		component: {
			name: 'ProfileEditScreen',
			options: {
				topBar: {
					title: {
						text: 'Επεξεργασία Προφίλ'
					},
					rightButtons: []
				}
			}
		}
	})
}