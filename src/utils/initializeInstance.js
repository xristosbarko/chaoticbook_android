export const initializeInstance = (form, data) => {
	const updatedForm = {
		...form
	}

	let updatedFormElement = null
	for (let formElementIdentifier in updatedForm) {
		updatedFormElement = {
			...updatedForm[formElementIdentifier]
		}
		if (updatedForm[formElementIdentifier].elementType === 'image') {
			updatedFormElement.value = {uri: data[formElementIdentifier]}
		} else {
			updatedFormElement.value = data[formElementIdentifier]
		}
		updatedForm[formElementIdentifier] = updatedFormElement
	}

	return updatedForm
}