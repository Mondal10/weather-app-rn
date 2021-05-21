import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Header() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Weather App</Text>
			<MaterialCommunityIcons name="reload" size={24} color="black" />
		</View>
	)
}

// Todo: make a separate styles interface file and import
interface IStyle {
	container: ViewStyle;
	title: TextStyle;
	reload: ViewStyle;
};

const styles = StyleSheet.create<IStyle>({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	reload: {

	}
});

export default Header;
