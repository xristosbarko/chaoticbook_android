const formElements = () => {
	let formElements = {
		title: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Τίτλος'
			},
			value: '',
			errors: null
		},
		description: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Περιραφή'
			},
			value: '',
			errors: null
		},
		picture: {
			elementType: 'image',
			elementConfig: {
				// placeholder: 'Όνομα'
				styles: {
					height: 150,
					width: 150
				}
			},
			value: null,
			errors: null
		}
	}

	return formElements
}

export default formElements