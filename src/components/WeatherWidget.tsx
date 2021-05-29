import React, { FC } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { IWeatherWidgetStyle } from '../shared/styleInterfaces';

import { WEATHER_ICONS } from '../shared/constants';
import meshGradient from '../../assets/images/mesh-gradient.jpg';

import AnimatedCountup from './AnimatedCountup';
import { getTimefromTimeZone, getFormattedDate } from '../utils/helper';

export type Props = {
	cityName: string;
	icon: string;
	temperature: number;
	description: string;
	timezone: number;
	currentDate: number;
}

const WeatherWidget: FC<Props> = ({ cityName, icon, temperature, description, timezone, currentDate }) => {
	return (
		<View style={styles.container}>
			<View style={styles.nameTimeContainer}>
				<Text style={styles.cityName}>
					{cityName}
				</Text>
				<Text style={styles.time}>
					{getFormattedDate(getTimefromTimeZone(currentDate, timezone))}
				</Text>
			</View>
			<ImageBackground
				imageStyle={styles.gradientBG}
				style={styles.gradientDimension}
				source={meshGradient}
			>
				<Text style={styles.description}>{description}</Text>
				<AnimatedCountup customStyle={styles.temperature} value={temperature} symbol={"°"} />
			</ImageBackground>
			<Image style={styles.weatherImg} source={WEATHER_ICONS[icon as keyof typeof WEATHER_ICONS]} />
		</View>
	)
}

const styles = StyleSheet.create<IWeatherWidgetStyle>({
	container: {
		height: 450,
		flexDirection: 'column',
		alignItems: 'center',
	},
	nameTimeContainer: {
		position: 'relative',
		top: 25,
		zIndex: 1,
		backgroundColor: '#f6e9fb',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
		fontSize: 18,
		textAlign: 'center',
		color: '#6e6d7a',
	},
	cityName: {
		color: '#6e6d7a',
		fontSize: 24,
		textAlign: 'center'
	},
	time: {
		color: '#6e6d7a',
		textAlign: 'center'
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
