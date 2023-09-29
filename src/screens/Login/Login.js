import React, {Component} from 'react'
import FormElements from './Form'
import {onChangeHandler} from '../../utils/onChangeHandler'
import {formElementsToArray} from '../../utils/formElementsToArray'
import RenderForm from '../../utils/renderForm'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'
import { Text, Keyboard, Alert, View } from 'react-native'
import { styles } from './styles'
import { DefaultButton } from '../../utils/formElements/DefaultButton'

class Login extends Component {
	state = {
		form: FormElements()
	}

	inputChangedHandler = (text, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(text, inputIdentifier, this.state.form)
		})
	}

	login () {
		const login = {}
		for (let formElementIdentifier in this.state.form) {
			login[formElementIdentifier] = this.state.form[formElementIdentifier].value
		}
		return login
	}

	loginHandler = () => {
		Keyboard.dismiss()
		const login = this.login()
		if (login.username === '' || login.password === '') {
			Alert.alert(
				'Σφάλμα',
				'Το όνομα χρήστη και ο κωδικός δεν πρέπει να είναι κενά.',
				[
					{text: 'Εντάξει'}
				],
				{cancelable: false}
			)
			this.setState({
				buttonDisabled: false
			})
		} else {
			this.props.onAuth(login.username, login.password)
		}
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<View style={styles.container}>
				<Text style={styles.header}>Σύνδεση</Text>
				<View style={styles.form}>
					<RenderForm
						formElementsArray={formElementsArray}
						changed={(text, inputIdentifier) => this.inputChangedHandler(text, inputIdentifier)}
					/>
					<DefaultButton onPress={this.loginHandler} disabled={this.props.buttonDisabled}>
						Σύνδεση
					</DefaultButton>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		buttonDisabled: state.auth.buttonDisabled
	}
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)