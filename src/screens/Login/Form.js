const formElements = () => {
	let formElements = {
		username: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Όνομα Χρήστη',
				autoFocus: true
			},
			value: ''
		},
		password: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Κωδικός',
				secureTextEntry: true
			},
			value: ''
		}
	}

	return formElements
}

export default formElements