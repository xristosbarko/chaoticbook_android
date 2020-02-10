export const formElementsToArray = (form) => {
	const formElementsArray = []
	for (let key in form) {
		formElementsArray.push({
			id: key,
			config: form[key]
		})
	}
	return formElementsArray
}