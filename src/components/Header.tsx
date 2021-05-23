import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IHeaderStyle } from '../shared/styleInterfaces';

function Header() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Weather App</Text>
			<MaterialCommunityIcons name="reload" size={24} color="#424242" onPress={() => console.log('Reload')} />
		</View>
	)
}

const styles = StyleSheet.create<IHeaderStyle>({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#424242',
	},
});

export default Header;
