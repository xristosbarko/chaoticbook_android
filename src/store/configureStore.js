import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import authReducer from "./reducers/auth"
import homePostsReducer from './reducers/homePosts'
import userProfileReducer from './reducers/userProfile'
import profilePostsReducer from './reducers/profilePosts'
import pendingFollowsReducer from './reducers/pendingFollows'

const rootReducer = combineReducers({
  auth: authReducer,
  homePosts: homePostsReducer,
  userProfile: userProfileReducer,
  profilePosts: profilePostsReducer,
  pendingFollows: pendingFollowsReducer
})

let composeEnhancers = compose

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore