import React, { useState } from 'react'
import { TextInput, Picker, Text, View, TouchableWithoutFeedback, Image, Button, StyleSheet, FlatList } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import ImagePicker from 'react-native-image-picker'
import moment from 'moment'
import { styles } from './styles'
import { DefaultButton } from './DefaultButton'

const errorMessages = (errors) => {
	let messages = null
	if (errors) {
		messages = (
			<FlatList
				data={errors}
				renderItem={({ item }) => (
					<View>
						<Text style={{fontSize: 8, color: 'red'}}>• {item}</Text>
					</View>
				)}
				keyExtractor={item => item}
			/>
		)
	}
	return messages
}

export const InputElement = (props) => {
	const errors = errorMessages(props.errors)
	return (
		<View>
			<TextInput
				{...props.elementConfig}
				style={styles.inputElement}
				value={props.value}
				onChangeText={props.changed}
			/>
			{errors}
		</View>
	)
}

export const SelectElement = (props) => {
	const errors = errorMessages(props.errors)
	return (
		<>
			<Text>{props.elementConfig.label}: </Text>
			<Picker
				selectedValue={props.value}
				onValueChange={props.changed}
			>
				{props.elementConfig.options.map(option => (
					<Picker.Item label={option.label} value={option.value} key={option.value} />
				))}
			</Picker>
			{errors}
		</>
	)
}

export const DateElement = (props) => {
	const [show, setShow] = useState(false)

	const showDate = () => {
		setShow(true)
	}

	const closeAndChange = (date) => {
		setShow(false)
		props.changed(date)
	}
	const errors = errorMessages(props.errors)

	return (
		<>
			<TouchableWithoutFeedback onPress={showDate}>
				<Text>{props.elementConfig.label}: {moment(props.value).format('DD/MM/YYYY')}</Text>
			</TouchableWithoutFeedback>
			{show ?
				<DateTimePicker
					{...props.elementConfig.mode}
					value={new Date(props.value)}
					onChange={(event, date) => closeAndChange(date)}
				/> : null}
			{errors}
		</>
	)
}

export const ImageElement = (props) => {

	const pickImageHandler = () => {
		const options = {
			title: 'Επιλογές',
			takePhotoButtonTitle: 'Τράβηξε Φωτογραφία...',
			chooseFromLibraryButtonTitle: 'Επιλογή από την Βιβλιοθήκη',
			cancelButtonTitle: 'Ακύρωση',
			maxWidth: 1280,
			maxHeight: 1280
		}

		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker')
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error)
			} else {
				props.changed({
					uri: response.uri,
					name: response.fileName,
					type: response.type
				})
			}
		})
	}
	const styles = StyleSheet.create(
		{...props.elementConfig.styles}
	)

	const errors = errorMessages(props.errors)

	return (
		<View>
			{props.value ?
				<Image source={{uri: props.value.uri}} style={styles} /> : null }
			<DefaultButton onPress={pickImageHandler}>
				Επιλογή εικόνας
			</DefaultButton>
			{errors}
		</View>
	)
}