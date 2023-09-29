import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import axios from 'axios'
import { API_ROOT } from '../../../appConfig'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import FormElements from './Form'
import {onChangeHandler} from '../../utils/onChangeHandler'
import {formElementsToArray} from '../../utils/formElementsToArray'
import RenderForm from '../../utils/renderForm'
import { homePosts } from '../../store/actions/homePosts'
import { userProfile } from '../../store/actions/userProfile'
import { profilePosts } from '../../store/actions/profilePosts'
import { resetForm } from '../../utils/resetForm'
import { errorMessages } from '../../utils/errorMessages'
import { styles } from './styles'
import { DefaultButton } from '../../utils/formElements/DefaultButton'

class PostCreate extends Component {
  state = {
    form: FormElements(),
    buttonDisabled: false
  }

  inputChangedHandler = (value, inputIdentifier) => {
    this.setState({
      form: onChangeHandler(value, inputIdentifier, this.state.form)
    })
  }

  post = () => {
    let post = new FormData()
    for (let formElementIdentifier in this.state.form) {
      post.append(formElementIdentifier, this.state.form[formElementIdentifier].value)
    }
    return post
  }

  onSubmitHandler = () => {
    const post = this.post()

    if (this.state.form.picture.value) {
      this.setState({
        buttonDisabled: true
      })
      const config = {
        headers: {
          Authorization: "Token " + this.props.token
        }
      }

      axios.post(API_ROOT + 'posts/create', post, config)
        .then(response => {
          this.props.onHomePosts()
          this.props.onUserProfile()
          this.props.onProfilePosts()
          this.setState({
            form: resetForm(this.state.form),
            buttonDisabled: false
          })
          Navigation.mergeOptions(this.props.componentId, {
            bottomTabs: {
              currentTabId: "HomeScreenId"
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
    } else {
      Alert.alert(
          'Σφάλμα',
          'Η εισαγωγή εικόνας είναι υποχρεωτική',
          [
              {text: 'Εντάξει'}
          ],
          {cancelable: false}
      )
    }
    
  }

  render () {
    const formElementsArray = formElementsToArray(this.state.form)

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <RenderForm
            formElementsArray={formElementsArray}
            changed={(value, inputIdentifier) => this.inputChangedHandler(value, inputIdentifier)}
          />
          <DefaultButton onPress={this.onSubmitHandler} disabled={this.state.buttonDisabled}>
            Δημοσίευση
          </DefaultButton>
        </View>
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
    onHomePosts: () => dispatch(homePosts()),
    onUserProfile: () => dispatch(userProfile()),
    onProfilePosts: () => dispatch(profilePosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)