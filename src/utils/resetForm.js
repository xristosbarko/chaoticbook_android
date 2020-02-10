export const resetForm = (form) => {
	const updatedForm = {
		...form
	}

	let updatedFormElement = null
	for (let formElementIdentifier in updatedForm) {
		updatedFormElement = {
			...updatedForm[formElementIdentifier]
		}
		if (updatedForm[formElementIdentifier].elementType === 'image') {
			updatedFormElement.value = null
		} else if (updatedForm[formElementIdentifier].elementType === 'date') {
			updatedFormElement.value = new Date()
		} else if (updatedForm[formElementIdentifier].elementType !== 'select') {
			updatedFormElement.value = ''
		} else {
			console.log('[ResetForm.js] out of bounds.')
		}
		updatedFormElement.errors = null
		updatedForm[formElementIdentifier] = updatedFormElement
	}

	return updatedForm
}