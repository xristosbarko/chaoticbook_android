import React from 'react'
import FormElement from './formElements'
import {View} from 'react-native'

const renderForm = (props) => {
    const form = props.formElementsArray.map(formElement => {
        let updatedFormElement = (
                <FormElement
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    errors={formElement.config.errors}
                    value={formElement.config.value}
                    changed={value => props.changed(value, formElement.id)}
                />
            )

        return (
            <View key={formElement.id}>
                {updatedFormElement}
            </View>
        )
    })
    return form
}

export default renderForm