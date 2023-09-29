import React, {Component} from 'react'
import { connect } from 'react-redux'
import { authCheckState } from '../../store/actions/auth'
import { View, Text } from 'react-native'
import { APP_NAME } from '../../../appConfig'

class CheckAuth extends Component {
	componentDidMount () {
		this.props.authCheckState()
	}

	render () {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontSize: 32}}>{ APP_NAME }</Text>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		isAuthenticated: state.auth.user_id !== null &&
							state.auth.username !== null &&
							state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authCheckState: () => dispatch(authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth)