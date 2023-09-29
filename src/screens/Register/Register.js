import React, {Component} from 'react'
import FormElements from './Form'
import {onChangeHandler} from '../../utils/onChangeHandler'
import {formElementsToArray} from '../../utils/formElementsToArray'
import RenderForm from '../../utils/renderForm'
import { Alert, View, ScrollView, Text } from 'react-native'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { Navigation } from 'react-native-navigation'
import moment from 'moment'
import { errorMessages } from '../../utils/errorMessages'
import { resetForm } from '../../utils/resetForm'
import { styles } from './styles'
import { DefaultButton } from '../../utils/formElements/DefaultButton'


class Register extends Component {
	state = {
		form: FormElements(),
		buttonDisabled: false
	}

	inputChangedHandler = (text, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(text, inputIdentifier, this.state.form)
		})
	}

	register () {
		const register = {}
		for (let formElementIdentifier in this.state.form) {
			if (this.state.form[formElementIdentifier].elementType === 'date') {
				register[formElementIdentifier] = moment(this.state.form[formElementIdentifier].value).format('DD/MM/YYYY')
			} else {
				register[formElementIdentifier] = this.state.form[formElementIdentifier].value
			}
		}
		return register
	}

	registerHandler = () => {
		this.setState({
			buttonDisabled: true
		})
		const register = this.register()
		axios.post(API_ROOT + 'accounts/register', register)
			.then(response => {
				this.setState({
					form: resetForm(this.state.form),
					buttonDisabled: false
				})
				Navigation.mergeOptions(this.props.componentId, {
					bottomTabs: {
						currentTabId: "LoginScreenId"
					}
				})
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
			<View style={styles.container}>
				<ScrollView style={{width: "70%"}} contentContainerStyle={styles.scroll}>
					<View style={{alignItems: 'center'}}>
						<Text style={styles.header}>Εγγραφή</Text>
					</View>
					<RenderForm
						formElementsArray={formElementsArray}
						changed={(text, inputIdentifier) => this.inputChangedHandler(text, inputIdentifier)}
					/>
					<DefaultButton onPress={this.registerHandler} disabled={this.state.buttonDisabled}>
						Εγγραφή
					</DefaultButton>
				</ScrollView>
			</View>
		)
	}
}

export default Register