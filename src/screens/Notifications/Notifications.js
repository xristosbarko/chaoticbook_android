import React, { Component } from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import * as actions from '../../store/actions/index'

class Notifications extends Component {

	componentDidMount () {
		this.props.onPendingFollows()
	}

	onPendingFollowsPressedHandler () {
		Navigation.push(this.props.componentId, {
			component: {
				name: 'PendingFollowsScreen',
				passProps: {
					pendingFollows: this.props.pendingFollows
				},
				options: {
					topBar: {
						title: {
							text: 'Αιτήματα ακολούθησης'
						}
					}
				}
			}
		})
	}

	render () {
		return (
			<View>
			{this.props.pendingFollows.length > 0 ?
				<TouchableWithoutFeedback onPress={() => this.onPendingFollowsPressedHandler()}>
					<Text>
						{this.props.pendingFollows.length} Αιτήματα ακολούθησης
					</Text>
				</TouchableWithoutFeedback>
			: null}
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		pendingFollows: state.pendingFollows.pendingFollows
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPendingFollows: () => dispatch(actions.pendingFollows())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)