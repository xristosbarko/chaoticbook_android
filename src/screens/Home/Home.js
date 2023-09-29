import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, ActivityIndicator } from 'react-native'
import PostDetails from '../../components/Posts/PostDetails'
import { homePostsLoadMore, homePosts } from '../../store/actions/homePosts'
import { styles } from './styles'

class Home extends Component {

	componentDidMount () {
		this.props.onHomePosts()
	}

	onRefresh = () => {
		this.props.onHomePosts()
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

	render () {

		return (
			<View style={styles.container}>
				<FlatList
					style={styles.list}
					data={this.props.posts}
					extraData={this.props.loading}
					onRefresh={this.onRefresh}
					refreshing={this.props.isFetching}
					onEndReachedThreshold={0.8}
					onEndReached={() => {
						if (!this.props.loading) {
							this.props.onHomePostsLoadMore()
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
		posts: state.homePosts.posts,
		loading: state.homePosts.loading,
		isFetching: state.homePosts.isFetching
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onHomePostsLoadMore: () => dispatch(homePostsLoadMore()),
		onHomePosts: () => dispatch(homePosts())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)