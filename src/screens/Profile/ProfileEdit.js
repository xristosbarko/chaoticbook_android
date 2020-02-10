import React, { Component } from 'react'
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Alert } from 'react-native'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import FormElements from './Form'
import {onChangeHandler} from '../../utils/onChangeHandler'
import {initializeInstance} from '../../utils/initializeInstance'
import {formElementsToArray} from '../../utils/formElementsToArray'
import RenderForm from '../../utils/renderForm'
import * as actions from '../../store/actions/index'
import { errorMessages } from '../../utils/errorMessages'
import { DefaultButton } from '../../utils/formElements/DefaultButton'

class ProfileEdit extends Component {
	state = {
		form: FormElements(),
		img_changed: false,
		buttonDisabled: false
	}

	componentDidMount () {
		const url = API_ROOT + 'profiles/get'
		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}
		axios.get(url, config)
			.then(response => {
				const updatedForm = initializeInstance(this.state.form, response.data)
				this.setState({
					form: updatedForm
				})
			})
			.catch(error => {
				console.log("[ProfileEdit] Profile Error")
			})
	}

	inputChangedHandler = (value, inputIdentifier) => {
		if (inputIdentifier == 'profile_picture') {
			this.setState({
				form: onChangeHandler(value, inputIdentifier, this.state.form),
				img_changed: true
			})
		} else {
			this.setState({
				form: onChangeHandler(value, inputIdentifier, this.state.form)
			})
		}
		
	}

	profile () {
		if (this.state.img_changed) {
			let profile = new FormData()
			for (let formElementIdentifier in this.state.form) {
				profile.append(formElementIdentifier, this.state.form[formElementIdentifier].value)
			}
			return profile
		} else {
			const profile = {}
			for (let formElementIdentifier in this.state.form) {
				if (formElementIdentifier !== 'profile_picture') {
					profile[formElementIdentifier] = this.state.form[formElementIdentifier].value
				}
			}
			return profile
		}
	}

	onSubmitHandler = () => {
		this.setState({
			buttonDisabled: true
		})
		const profile = this.profile()
		const config = {
			headers: {
				Authorization: "Token " + this.props.token
			}
		}
		axios.put(API_ROOT + 'profiles/edit', profile, config)
			.then(response => {
				this.setState({
					buttonDisabled: false
				})
				this.props.onUserProfile()
				Navigation.pop(this.props.componentId)
			})
			.catch(error => {
				const [updatedForm, non_field_errors] = errorMessages(this.state.form, error.response.data)
				this.setState({
					form: updatedForm,
					buttonDisabled: false
				})
				if (non_field_errors) {
					for (let non_field_error of non_field_errors) {
						Alert.alert(
							'Σφάλμα',
							non_field_error,
							[
								{text: 'Εντάξει'}
							],
							{cancelable: false}
						)
					}
				}
			})
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<View>
				<RenderForm
					formElementsArray={formElementsArray}
					changed={(value, inputIdentifier) => this.inputChangedHandler(value, inputIdentifier)}
				/>
				<DefaultButton onPress={this.onSubmitHandler} disabled={this.state.buttonDisabled}>
					Αποθήκευση
				</DefaultButton>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUserProfile: () => dispatch(actions.userProfile())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)