import { Navigation } from "react-native-navigation"
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CheckAuthStateScreen from './src/screens/Auth/CheckAuth'
import LoginScreen from './src/screens/Login/Login'
import RegisterScreen from './src/screens/Register/Register'
import HomeScreen from './src/screens/Home/Home'
import ProfileScreen from './src/screens/Profile/Profile'
import CommentsScreen from './src/screens/Comments/Comments'
import UsersScreen from './src/screens/Users/Users'
import SearchScreen from './src/screens/Search/Search'
import NotificationsScreen from './src/screens/Notifications/Notifications'
import PendingFollowsScreen from './src/screens/PendingFollows/PendingFollows'
import PostCreateScreen from './src/screens/Posts/PostCreate'
import ProfileEditScreen from './src/screens/Profile/ProfileEdit'
import MenuDrawerScreen from './src/screens/MenuDrawer/MenuDrawer'
import PostsScreen from './src/screens/Posts/Posts'

import reduxStoreWrapper from './src/hoc/reduxStoreWrapper'
import configureStore from './src/store/configureStore'

const store = configureStore()

AppRegistry.registerComponent(appName, reduxStoreWrapper(CheckAuthStateScreen, store))
Navigation.registerComponent('LoginScreen', reduxStoreWrapper(LoginScreen, store))
Navigation.registerComponent('RegisterScreen', reduxStoreWrapper(RegisterScreen, store))
Navigation.registerComponent('HomeScreen', reduxStoreWrapper(HomeScreen, store))
Navigation.registerComponent('ProfileScreen', reduxStoreWrapper(ProfileScreen, store))
Navigation.registerComponent('CommentsScreen', reduxStoreWrapper(CommentsScreen, store))
Navigation.registerComponent('UsersScreen', reduxStoreWrapper(UsersScreen, store))
Navigation.registerComponent('SearchScreen', reduxStoreWrapper(SearchScreen, store))
Navigation.registerComponent('NotificationsScreen', reduxStoreWrapper(NotificationsScreen, store))
Navigation.registerComponent('PendingFollowsScreen', reduxStoreWrapper(PendingFollowsScreen, store))
Navigation.registerComponent('PostCreateScreen', reduxStoreWrapper(PostCreateScreen, store))
Navigation.registerComponent('ProfileEditScreen', reduxStoreWrapper(ProfileEditScreen, store))
Navigation.registerComponent('MenuDrawerScreen', reduxStoreWrapper(MenuDrawerScreen, store))
Navigation.registerComponent('PostsScreen', reduxStoreWrapper(PostsScreen, store))

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: appName
			}
		}
	})
})