import { Navigation } from 'react-native-navigation'
// import Ionicons from 'react-native-vector-icons/Ionicons'

export const startAuthTabs = () => {
	// Promise.all([
		// Ionicons.getImageSource("md-person", 30),
		// Ionicons.getImageSource("md-person-add", 30)
	// ]).then(sources => {
		Navigation.setRoot({
			root: {
				bottomTabs: {
					children: [
						{
							stack: {
								children: [{
									component: {
										id: 'LoginScreenId',
										name: 'LoginScreen'
									}
								}],
								options: {
									topBar: {
										title: {
											text: 'ChaoticBook'
										}
									},
									bottomTab: {
										text: 'Σύνδεση',
										// icon: sources[0],
										testID: 'LOGIN_TAB_BAR_BUTTON'
									}
								}
							}
						},
						{
							stack: {
								children: [{
									component: {
										name: 'RegisterScreen'
									}
								}],
								options: {
									topBar: {
										title: {
											text: 'ChaoticBook'
										}
									},
									bottomTab: {
										text: 'Εγγραφή',
										// icon: sources[1],
										testID: 'REGISTER_TAB_BAR_BUTTON'
									}
								}
							}
						}
					]
				}
			}
		})
	// })
}