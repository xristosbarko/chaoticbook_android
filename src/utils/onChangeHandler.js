export const onChangeHandler = (value, inputIdentifier, form) => {
	const updatedForm = {
		...form
	}
	const updatedFormElement = { 
		...updatedForm[inputIdentifier]
	}
	updatedFormElement.value = value
	updatedForm[inputIdentifier] = updatedFormElement
	return updatedForm
}