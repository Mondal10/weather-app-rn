import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SearchBar() {
	return (
		<View style={{
			paddingVertical: 5,
			paddingHorizontal: 10,
		}}>
			<Text style={{
				fontSize: 20, borderColor: 'blue',
				borderWidth: 1,
			}}>
				Search Bar
      </Text>
		</View>
	)
}

const styles = StyleSheet.create({

});

export default SearchBar;
