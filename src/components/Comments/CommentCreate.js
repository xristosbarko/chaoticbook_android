import React, { useState } from 'react'
import {View, Text, TextInput, Button, Keyboard, Alert} from 'react-native'
import { DefaultButton } from '../../utils/formElements/DefaultButton'

const CommentCreate = (props) => {
	const [comment, setComment] = useState('')

	const onCommentChangedHandler = text => {
		setComment(text)
	}

	const resetCommentBeforePosting = () => {
		if (comment !== '') {
			Keyboard.dismiss()
			props.onPostComment(comment)
			setComment('')
		} else {
			Alert.alert(
				'Σφάλμα',
				'Το σχόλιο δεν πρέπει να είναι κενό.',
				[
					{text: 'Εντάξει'}
				],
				{cancelable: false}
			)
		}
	}

	return (
		<View style={{flexDirection: 'row'}}>
			<View style={{width: '70%'}}>
				<TextInput
					placeholder='Προσθέστε σχόλιο...'
					autoFocus
					value={comment}
					onChangeText={text => onCommentChangedHandler(text)}
				/>
			</View>
			<View style={{width: '30%'}}>
				<DefaultButton onPress={resetCommentBeforePosting}>
					Δημοσίευση
				</DefaultButton>
			</View>
		</View>
	)
}

export default CommentCreate