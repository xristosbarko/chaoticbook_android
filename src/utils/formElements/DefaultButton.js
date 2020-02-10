import React from 'react'
import {TouchableNativeFeedback, View, Text, ActivityIndicator} from 'react-native'

export const DefaultButton = props => {
	return (
		<TouchableNativeFeedback onPress={props.onPress} disabled={props.disabled}>
			<View style={[{
				padding: 10,
				alignItems: 'center',
				margin: 5,
				padding: 8,
				borderRadius: 5
			}, props.disabled ? {backgroundColor: '#d3d3d3'} : {backgroundColor: '#24a0ed'}]}>
			{props.disabled ?
				<ActivityIndicator style={{ color: '#000' }}/> :
				<Text style={{color: 'white', fontSize: 15}}>{props.children}</Text>
			}
			</View>
		</TouchableNativeFeedback>
	)
}