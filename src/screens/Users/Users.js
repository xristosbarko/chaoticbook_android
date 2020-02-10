import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import UserDetails from '../../components/Users/UserDetails'
import { onUsernamePressedHandler } from './Navigation'
import { FlatListItemSeparator } from '../../shared/FlatListItemSeparator'

class Users extends Component {
	state = {
		users: [],
		next: null,
		loading: false
	}

	componentDidMount () {
		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}

		let url = null

		if (this.props.screenType == 'followers') {
			url = API_ROOT + 'follows/getFollowers?user_id=' + this.props.user_id
		} else if (this.props.screenType == 'followings') {
			url = API_ROOT + 'follows/getFollowings?user_id=' + this.props.user_id
		} else if (this.props.screenType == 'usersLiked') {
			url = API_ROOT + 'posts/getUsersLiked/' + this.props.post_id
		} else {
			console.log('No screenType prop.')
		}
		axios.get(url, config)
			.then(response => {
				this.setState({
					users: response.data.results,
					next: response.data.next
				})
			})
			.catch(error => {
				console.log("Users Error")
			})
	}

	renderFooter = () => {
		if (!this.state.loading) return null
		return (
			<View style={{height: 80}}>
				<ActivityIndicator
					style={{ color: '#000' }}
				/>
			</View>
		)
	}

	onUsersLoadMore = () => {
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
					const updatedUsers = [...prevState.users, ...response.data.results]
					return {
						users: updatedUsers,
						next: response.data.next,
						loading: false
					}
				})
			})
			.catch(err => {
				this.setState({
					loading: false
				})
				console.log('[Users.js Get More Error]')
			})
	}

	render () {
		const { users, next, loading, userInput } = this.state

		return (
			<View>
				<FlatList
					data={users}
					extraData={loading}
					onEndReachedThreshold={0.8}
					onEndReached={() => {
						if (!loading) {
							this.onUsersLoadMore()
						}
					}}
					ListFooterComponent={this.renderFooter}
					ItemSeparatorComponent={FlatListItemSeparator}
					renderItem={({ item }) => (
						<UserDetails
							user={item}
							usernamePressed={() => onUsernamePressedHandler(this.props, item)}
						/>
					)}
					keyExtractor={item => item.user_id.toString()}
				/>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(Users)