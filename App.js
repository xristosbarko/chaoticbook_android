import { Navigation } from "react-native-navigation"
// import { AppRegistry } from 'react-native'
import { registerRootComponent } from 'expo';
import { name as appName } from './app.json'
import { StyleSheet, Text, View } from 'react-native';

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
import reduxStoreWrapperOld from "./src/hoc/reduxStoreWrapperOld";
import configureStore from './src/store/configureStore'

const store = configureStore()

// AppRegistry.registerComponent(appName, reduxStoreWrapper(CheckAuthStateScreen, store))
const CheckAuthStateScreen2 = reduxStoreWrapper(CheckAuthStateScreen, store)


const App = () => {
	return <CheckAuthStateScreen2/>;
};
  
export default App;

registerRootComponent(App);


Navigation.registerComponent('LoginScreen', reduxStoreWrapperOld(LoginScreen, store))
Navigation.registerComponent('RegisterScreen', reduxStoreWrapperOld(RegisterScreen, store))
Navigation.registerComponent('HomeScreen', reduxStoreWrapperOld(HomeScreen, store))
Navigation.registerComponent('ProfileScreen', reduxStoreWrapperOld(ProfileScreen, store))
Navigation.registerComponent('CommentsScreen', reduxStoreWrapperOld(CommentsScreen, store))
Navigation.registerComponent('UsersScreen', reduxStoreWrapperOld(UsersScreen, store))
Navigation.registerComponent('SearchScreen', reduxStoreWrapperOld(SearchScreen, store))
Navigation.registerComponent('NotificationsScreen', reduxStoreWrapperOld(NotificationsScreen, store))
Navigation.registerComponent('PendingFollowsScreen', reduxStoreWrapperOld(PendingFollowsScreen, store))
Navigation.registerComponent('PostCreateScreen', reduxStoreWrapperOld(PostCreateScreen, store))
Navigation.registerComponent('ProfileEditScreen', reduxStoreWrapperOld(ProfileEditScreen, store))
Navigation.registerComponent('MenuDrawerScreen', reduxStoreWrapperOld(MenuDrawerScreen, store))
Navigation.registerComponent('PostsScreen', reduxStoreWrapperOld(PostsScreen, store))

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: App
			}
		}
	})
})
