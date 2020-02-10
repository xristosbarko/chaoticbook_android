export const errorMessages = (form, errors) => {
	let non_field_errors = null
	if (errors.non_field_errors) {
		non_field_errors = errors.non_field_errors
	}

	const updatedForm = {
		...form
	}

	let updatedFormElement = null
	for (let formElementIdentifier in updatedForm) {
		updatedFormElement = {
			...updatedForm[formElementIdentifier]
		}

		if (errors[formElementIdentifier]) {
			updatedFormElement.errors = errors[formElementIdentifier]
		} else {
			updatedFormElement.errors = null
		}

		updatedForm[formElementIdentifier] = updatedFormElement
	}

	return [updatedForm, non_field_errors]
}