import React, { Component } from 'react'
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { onUsernamePressedHandler } from './../Users/Navigation'
import { connect } from 'react-redux'
import UserDetails from '../../components/Users/UserDetails'
import { Navigation } from 'react-native-navigation'
import { FlatListItemSeparator } from '../../shared/FlatListItemSeparator'

class Search extends Component {
	state = {
		users: [],
		next: null,
		loading: false,
		userInput: null
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.state.userInput !== '' && this.state.userInput !== prevState.userInput) {
			const config = {
				headers: {
					Authorization: "Token " + this.props.token
				}
			}

			axios.get(API_ROOT + 'accounts/search?search=' + this.state.userInput, config)
				.then(response => {
					this.setState({
						users: response.data.results,
						next: response.data.next
					})
				})
				.catch(error => {
					console.log("Search Error")
				})
		}
	}

	onSearchChangedHandler (text) {
		this.setState({
			userInput: text
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

	onSearchLoadMore = () => {
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
				console.log('[Search Get More Error]')
			})
	}

	render () {
		const { users, next, loading, userInput } = this.state

		return (
			<View>
				<TextInput
					placeholder='Όνομα Χρήστη'
					value={userInput}
					onChangeText={text => this.onSearchChangedHandler(text)}
				/>
				<FlatList
					data={users}
					extraData={loading}
					onEndReachedThreshold={0.8}
					onEndReached={() => {
						if (!loading) {
							this.onSearchLoadMore()
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

export default connect(mapStateToProps)(Search)