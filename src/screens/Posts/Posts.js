import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import PostDetails from '../../components/Posts/PostDetails'

class Posts extends Component {
	state = {
		posts: this.props.posts,
		next: this.props.next,
		loading: false
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

	onPostsLoadMore = () => {
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
				console.log('[Posts.js Get More Error]')
			})
	}

	render () {
		const { posts, next, loading } = this.state

		return (
			<View>
				<FlatList
					data={posts}
					extraData={loading}
					onEndReachedThreshold={0.8}
					onEndReached={() => {
						if (!loading) {
							this.onPostsLoadMore()
						}
					}}
					ListFooterComponent={this.renderFooter}
					renderItem={({ item }) => (
						<PostDetails
							post={item}
							{...this.props}
						/>
					)}
					keyExtractor={item => item.id.toString()}
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

export default connect(mapStateToProps)(Posts)