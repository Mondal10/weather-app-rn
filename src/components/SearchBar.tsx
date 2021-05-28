import React, { FC, useState } from 'react';
import { TextInput, View, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getWeatherByCityName } from '../api/fetchUrls';

export type Props = {
	setWeatherData: any; // todo: create interface
}

const SearchBar: FC<Props> = ({ setWeatherData }) => {
	const [inputText, setInputText] = useState('');

	const onSubmit = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
		console.log(event.nativeEvent.text);
		const cityName = event.nativeEvent.text;
		const response = await getWeatherByCityName(cityName);

		if (response.cod === 200) {
			setWeatherData(response);
		} else {
			// setErrorMsg(response.message);
		}

		setInputText('');
	};

	return (
		<View style={styles.searchSection}>
			<MaterialCommunityIcons
				style={styles.searchIcon}
				name="cloud-search-outline"
				size={24}
				color="#424242"
			/>
			<TextInput
				style={styles.input}
				value={inputText}
				placeholder="Enter City Name eg: Mumbai"
				underlineColorAndroid="transparent"
				onChangeText={(text) => { setInputText(text) }}
				onSubmitEditing={onSubmit}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	searchSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#424242',
		borderRadius: 50,
		marginHorizontal: 20,
	},
	searchIcon: {
		padding: 10,
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		height: 40,
	},
});

export default SearchBar;
