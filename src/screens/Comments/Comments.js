import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { onUsernamePressedHandler } from './../Users/Navigation'
import { connect } from 'react-redux'
import CommentCreate from '../../components/Comments/CommentCreate'
import CommentDetails from '../../components/Comments/CommentDetails'

class Comments extends Component {
	state = {
		comments: [],
		next: null,
		loading: false
	}

	componentDidMount () {
		const url = API_ROOT + 'comments/getPostCommentsList/' + this.props.post_id
		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}
		axios.get(url, config)
		.then(response => {
			this.setState({
				comments: response.data.results,
				next: response.data.next
			})
		})
		.catch(error => {
			console.log('Comments Error')
		})
	}

	onPostCommentHandler = (comment) => {
		const data = {
			post: this.props.post_id,
			text: comment
		}

		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}

		axios.post(API_ROOT + 'comments/create', data, config)
			.then(response => {
				this.setState(prevState => ({
					comments: [response.data, ...prevState.comments]
				}))
			})
			.catch(error => {
				console.log("Comment Create Error")
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

	onCommentsLoadMore = () => {
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
					const updatedComments = [...prevState.comments, ...response.data.results]
					return {
						comments: updatedComments,
						next: response.data.next,
						loading: false
					}
				})
			})
			.catch(err => {
				this.setState({
					loading: false
				})
				console.log('[Comments Get More Error]')
			})
	}

	render () {
		const { comments, next, loading } = this.state

		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<FlatList
						data={comments}
						extraData={loading}
						onEndReachedThreshold={0.8}
						onEndReached={() => {
							if (!loading) {
								this.onCommentsLoadMore()
							}
						}}
						ListFooterComponent={this.renderFooter}
						renderItem={({ item }) => (
							<CommentDetails
								comment={item}
								usernamePressed={() => onUsernamePressedHandler(this.props, item)}
							/>
						)}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
				<View style={{justifyContent: 'flex-end'}}>
					<CommentCreate onPostComment={(comment) => this.onPostCommentHandler(comment)} />
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Comments)