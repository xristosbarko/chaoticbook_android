import React, { Component } from 'react'
import {View, FlatList} from 'react-native'
import { onUsernamePressedHandler } from '../Users/Navigation'

import UserAcceptOrDecline from '../../components/PendingFollows/UserAcceptOrDecline'

class PendingFollows extends Component {

	render () {
		return (
			<View>
				<FlatList
					data={this.props.pendingFollows}
					renderItem={({ item }) => (
						<UserAcceptOrDecline
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

export default PendingFollows