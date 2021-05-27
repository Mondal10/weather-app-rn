import React, { FC } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Platform } from 'react-native';
import { IWeatherWidgetStyle } from '../shared/styleInterfaces';

import meshGradient from '../../assets/images/mesh-gradient.jpg';
// Todo: make dynamic images as per weather
import dummy from '../../assets/images/all.png';
import dummy2 from '../../assets/images/sun.png';

import { roundedTemperature } from '../utils/helper';
import AnimatedCountup from './AnimatedCountup';

export type Props = {
	cityName: string;
	temperature: number;
	description: string;
}

const WeatherWidget: FC<Props> = ({ cityName, temperature, description }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.cityName}>
				{cityName}
			</Text>
			<ImageBackground
				imageStyle={styles.gradientBG}
				style={styles.gradientDimension}
				source={meshGradient}
			>
				<Text style={styles.description}>{description}</Text>
				<AnimatedCountup customStyle={styles.temperature} value={temperature} symbol={"°"} />
			</ImageBackground>
			<Image style={styles.weatherImg} source={dummy} />
		</View>
	)
}

const styles = StyleSheet.create<IWeatherWidgetStyle>({
	container: {
		height: 450,
		flexDirection: 'column',
		alignItems: 'center',
	},
	cityName: {
		position: 'relative',
		top: 15,
		zIndex: 1,
		backgroundColor: '#f6e9fb',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
		fontSize: 18,
		textAlign: 'center',
		color: '#6e6d7a',
	},
	gradientBG: {
		resizeMode: 'cover',
		borderRadius: 50,
	},
	gradientDimension: {
		height: 300,
		width: 300,
		padding: 20,
	},
	description: {
		textAlign: 'center',
		textTransform: 'capitalize',
		color: '#f9e6f9',
		fontSize: 20,
		paddingTop: 20
	},
	temperature: {
		textAlign: 'center',
		color: '#f9e6f9',
		fontSize: 160,
		opacity: 0.8
	},
	weatherImg: {
		resizeMode: 'contain',
		height: 250,
		width: 250,
		position: 'relative',
		bottom: 120
	},
});

export default WeatherWidget;
