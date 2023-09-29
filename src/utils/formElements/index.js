import React from 'react'
import { InputElement, SelectElement, DateElement, ImageElement } from './InputElements'

const FormElement = (props) => {
	let formElement = null

	switch (props.elementType) {
		case ('input'):
			formElement = <InputElement {...props} />
			break
		case ('select'):
			formElement = <SelectElement {...props} />
			break
		case ('date'):
			formElement = <DateElement {...props} />
			break
		case ('image'):
			formElement = <ImageElement {...props} />
			break
		default:
			console.log("pass elementType to props", formElement)
	}

	return formElement
}

export default FormElement