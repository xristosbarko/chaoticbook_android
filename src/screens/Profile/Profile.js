import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import * as actions from '../../store/actions/index'
import { Navigation } from 'react-native-navigation'

import ProfilePostDetails from '../../components/Posts/ProfilePostDetails'
import ProfileDetails from '../../components/Profiles/ProfileDetails'

import {
	onPostsCountPressedHandler,
	onFollowersCountPressedHandler,
	onFollowingsCountPressedHandler,
	onProfileEditPressedHandler
	} from './Navigation'

class Profile extends Component {
	state = {
		user: undefined,
		posts: [],
		next: null,
		loading: false,
		isFetching: false
	}

	componentDidMount () {
		this.navigationEventListener = Navigation.events().bindComponent(this)

		if (!this.props.user_id) {
			this.props.onUserProfile()
			this.props.onProfilePosts()
		} else {
			const config = {
				headers: {
					Authorization: "Token " + this.props.token
				}
			}

			let url = API_ROOT + 'profiles/getUserProfile?user=' + this.props.user_id
			axios.get(url, config)
				.then(response => {
					this.setState({
						user: response.data
					})
				})
				.catch(error => {

					console.log("Profile Error")
				})

			this.setState({
				isFetching: true
			})

			url = API_ROOT + 'posts/?user=' + this.props.user_id
			axios.get(url, config)
				.then(response => {
					this.setState({
						posts: response.data.results,
						next: response.data.next,
						isFetching: false
					})
				})
				.catch(error => {
					this.setState({
						isFetching: false
					})
					console.log("Posts Error")
				})
		}
	}

	navigationButtonPressed = ({ buttonId }) => {
		if (buttonId === 'MenuDrawerButton') {
			Navigation.mergeOptions(this.props.componentId, {
				sideMenu: {
					right: {
						visible: true
					}
				}
			})
		}
	}

	onRefresh = () => {
		this.props.onProfilePosts()
	}

	onStatePostsRefresh = () => {
		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}
		this.setState({
			isFetching: true
		})

		const url = API_ROOT + 'posts/?user=' + this.props.user_id
		axios.get(url, config)
			.then(response => {
				this.setState({
					posts: response.data.results,
					next: response.data.next,
					isFetching: false
				})
			})
			.catch(error => {
				this.setState({
					isFetching: false
				})
				console.log("Posts Error")
			})
	}

	renderFooter = () => {
		if (!this.props.loading) return null
		return (
			<View style={{height: 80}}>
				<ActivityIndicator
					style={{ color: '#000' }}
				/>
			</View>
		)
	}

	onProfilePostsLoadMore = () => {
		if (!this.state.next) {
			return
		}
		this.setState({
			loading: true
		})
		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}
		let url = this.state.next

		axios.get(url, config)
			.then(response => {
				this.setState(prevState => {
					const updatedPosts = [...prevState.posts, ...response.data.results]
					return {
						posts: updatedPosts,
						next: response.data.next,
						loading: false
					}
				})
			})
			.catch(err => {
				this.setState({
					loading: false
				})
				console.log('[Profile Posts Get More Error]')
			})
	}

	render () {
		let profileDetails = null
		let profilePosts = null

		if (!this.props.user_id && this.props.user) {
			profileDetails = (
				<ProfileDetails
					user={this.props.user}
					postCountPressed={() => onPostsCountPressedHandler(this.props, this.props.user, this.props.posts, this.props.next)}
					followersCountPressed={() => onFollowersCountPressedHandler(this.props, this.props.user)}
					followingsCountPressed={() => onFollowingsCountPressedHandler(this.props, this.props.user)}
					profileEditPressed={() => onProfileEditPressedHandler(this.props)}
				/>
			)
			profilePosts = (
				<FlatList
					data={this.props.posts}
					extraData={this.props.loading}
					onRefresh={this.onRefresh}
					refreshing={this.props.isFetching}
					onEndReachedThreshold={0.8}
					onEndReached={() => {
						if (!this.props.loading) {
							this.props.onProfilePostsLoadMore()
						}
					}}
					ListFooterComponent={this.renderFooter}
					numColumns={3}
					renderItem={({ item, index }) => (
						<ProfilePostDetails
							post={item}
							index={index}
							{...this.props}
						/>
					)}
					keyExtractor={item => item.id.toString()}
				/>
			)
		} else if (this.state.user) {
			profileDetails = (
				<ProfileDetails
					user={this.state.user}
					postCountPressed={() => onPostsCountPressedHandler(this.props, this.state.user, this.state.posts, this.state.next)}
					followersCountPressed={() => onFollowersCountPressedHandler(this.props, this.state.user)}
					followingsCountPressed={() => onFollowingsCountPressedHandler(this.props, this.state.user)}
					profileEditPressed={() => onProfileEditPressedHandler(this.props)}
				/>
			)
			profilePosts = (
				<FlatList
					data={this.state.posts}
					extraData={this.state.loading}
					onRefresh={this.onStatePostsRefresh}
					refreshing={this.state.isFetching}
					onEndReachedThreshold={0.8}
					onEndReached={() => {
						if (!this.state.loading) {
							this.onProfilePostsLoadMore()
						}
					}}
					ListFooterComponent={this.renderFooter}
					numColumns={3}
					renderItem={({ item, index }) => (
						<ProfilePostDetails
							post={item}
							index={index}
							{...this.props}
						/>
					)}
					keyExtractor={item => item.id.toString()}
				/>
			)
		}

		return (
			<View style={{flex: 1}}>
				<View>
					{profileDetails}
				</View>
				<View style={{flex: 1}}>
					{profilePosts}
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.userProfile.user,
		token: state.auth.token,
		posts: state.profilePosts.posts,
		next: state.profilePosts.next,
		loading: state.profilePosts.loading,
		isFetching: state.profilePosts.isFetching
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUserProfile: () => dispatch(actions.userProfile()),
		onProfilePostsLoadMore: () => dispatch(actions.profilePostsLoadMore()),
		onProfilePosts: () => dispatch(actions.profilePosts())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)