const formElements = () => {
	let formElements = {
		username: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Όνομα Χρήστη *'
			},
			value: '',
			errors: null
		},
		last_name: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Επώνυμο'
			},
			value: '',
			erros: null
		},
		first_name: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Όνομα'
			},
			value: '',
			errors: null
		},
		birth_date: {
			elementType: 'date',
			elementConfig: {
				mode: 'date',
				label: 'Ημερομηνία Γέννησης'
			},
			value: new Date(),
			errors: null
		},
		gender: {
			elementType: 'select',
			elementConfig: {
				label: 'Φύλο',
				options: [
					{
						label: 'Άντρας',
						value: 'Α'
					},
					{
						label: 'Γυναίκα',
						value: 'Γ'
					}
				]
			},
			value: 'Α',
			errors: null
		},
		email: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'email *'
			},
			value: '',
			errors: null
		},
		password: {
			elementType: 'input',
			elementConfig: {
				placeholder: 'Κωδικός *',
				secureTextEntry: true
			},
			value: '',
			errors: null
		},
		// password2: {
		// 	elementType: 'input',
		// 	elementConfig: {
		// 		placeholder: 'Επανάληψη Κωδικού',
		// 		secureTextEntry: true
		// 	},
		// 	value: ''
		// }
	}

	return formElements
}

export default formElements