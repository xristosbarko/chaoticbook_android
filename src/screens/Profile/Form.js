const formElements = () => {
	let formElements = {
		profile_picture: {
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
		},
		bio: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'bio',
				multiline: true
			},
			value: '',
			errors: null
		}
	}

	return formElements
}

export default formElements