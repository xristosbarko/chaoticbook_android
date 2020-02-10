import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/el'
import { styles } from './styles'

const PostDetails = (props) => {
	const { post } = props

	const [like, setLike] = useState(post.liked)

	const [imageSize, setImageSize] = useState({
		width: null,
		height: null
	})

	useEffect(() => {
		Image.getSize(post.picture, (width, height) => {
			setImageSize({
				width,
				height
			})
		})
	}, [])

	const onUsernamePressedHandler = () => {
		Navigation.push(props.componentId, {
			component: {
				name: 'ProfileScreen',
				passProps: {
					user_id: post.user.id
				},
				options: {
					topBar: {
						title: {
							text: post.user.username
						}
					}
				}
			}
		})
	}

	const onCommentHandler = () => {
		Navigation.push(props.componentId, {
			component: {
				name: 'CommentsScreen',
				passProps: {
					post_id: post.id
				},
				options: {
					topBar: {
						title: {
							text: 'Σχόλια'
						}
					}
				}
			}
		})
	}

	const onUsersLikedHandler = () => {
		Navigation.push(props.componentId, {
			component: {
				name: 'UsersScreen',
				passProps: {
					post_id: post.id,
					screenType: 'usersLiked'
				},
				options: {
					topBar: {
						title: {
							text: 'Σε ποιους αρέσει'
						}
					}
				}
			}
		})
	}

	const onLikeHandler = () => {
		setLike(prevLike => !prevLike)
		const config = {
			headers: {
				Authorization: "Token " + props.token
			}
		}
		if (!like) {
			const url = 'likes/create'
			const data = {
				post: post.id
			}
			
			axios.post(API_ROOT + url, data, config)
				.catch(error => {
					console.log('Like Error')
				})
		} else {
			const url = 'likes/delete/' + post.id
			axios.delete(API_ROOT + url, config)
				.catch(error => {
					console.log('Unlike Error')
				})
		}
	}

	moment.locale('el')

	return (
		<>
			{imageSize.width ? <View style={styles().container}>
				<View style={styles().postTop}>
					<Image source={{uri: post.user.profile_picture}} style={styles().profile_picture} />
					<View style={{paddingHorizontal: 5}}>
						<TouchableWithoutFeedback onPress={onUsernamePressedHandler}>
							<Text>
								{post.user.username}
							</Text>
						</TouchableWithoutFeedback>
						{post.title ?
						<Text style={{fontSize: 12}}>
							{post.title}
						</Text> : null}
					</View>
				</View>
				<Image
					source={{uri: post.picture}}
					style={styles(imageSize.width, imageSize.height).image}
				/>
				<View style={{flexDirection: 'row'}}>
					<View style={{paddingHorizontal: 10}}>
						<TouchableWithoutFeedback onPress={onLikeHandler}>
							{ like ?
								<Icon size={30} name={"md-heart"} color='red' /> :
								<Icon size={30} name={"md-heart-empty"} />
							}
						</TouchableWithoutFeedback>
					</View>
					<View style={{paddingHorizontal: 5}}>
						<TouchableWithoutFeedback onPress={onCommentHandler}>
							<Icon size={30} name={"md-text"} />
						</TouchableWithoutFeedback>
					</View>
				</View>
				<View style={{paddingHorizontal: 10}}>
					{post.liked_by_count !== 0 ?
						<TouchableWithoutFeedback onPress={onUsersLikedHandler}>
							<Text>
								Άρέσει σε { post.liked_by_count }
							 </Text>
						 </TouchableWithoutFeedback> :
					 null }
					{post.description ?
						<Text>
							{post.description}
						</Text> : null}
					<Text style={styles().timestamp}>
						{moment(post.timestamp).fromNow()}
					</Text>
				</View>
			</View> : null }
		</>
	)
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(PostDetails)