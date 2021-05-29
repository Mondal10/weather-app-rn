import React, { FC } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getTimefromTimeZone, get12HTimefromDate, mpsTokmph, degreeTodirection } from '../utils/helper';
import { IWeatherInfoStyle } from '../shared/styleInterfaces';

const PURPLE = '#4f3cc9';

export type Props = {
	pressure: number;
	windSpeed: number;
	windDegree: number;
	sunrise: number;
	sunset: number;
	humidity: number;
	timezone: number;
}

const WeatherInfo: FC<Props> = ({
	pressure,
	windSpeed,
	windDegree,
	sunrise,
	sunset,
	humidity,
	timezone,
}) => {
	return (
		<View style={styles.container}>
			{/* 1st Row */}
			<View style={styles.infoRow}>
				<View style={styles.info}>
					<MaterialCommunityIcons name="speedometer" size={24} color={PURPLE} />
					<Text style={styles.infoValue}>{pressure} mBar</Text>
					<Text style={styles.infoTitle}>Pressure</Text>
				</View>
				<View style={styles.info}>
					<MaterialCommunityIcons name="weather-windy" size={24} color={PURPLE} />
					<Text style={styles.infoValue}>{mpsTokmph(windSpeed)} km/h</Text>
					<Text style={styles.infoTitle}>Wind</Text>
				</View>
				<View style={styles.info}>
					<MaterialCommunityIcons name="navigation" size={24} color={PURPLE} />
					<Text style={styles.infoValue}>{degreeTodirection(windDegree)}</Text>
					<Text style={styles.infoTitle}>Direction</Text>
				</View>
			</View>
			{/* Separator */}
			<View
				style={{
					borderBottomColor: 'lightgray',
					borderBottomWidth: 1,
					marginHorizontal: 20,
				}}
			/>
			{/* 2nd Row */}
			<View style={styles.infoRow}>
				<View style={styles.info}>
					<MaterialCommunityIcons name="water" size={24} color={PURPLE} />
					<Text style={styles.infoValue}>{humidity} %</Text>
					<Text style={styles.infoTitle}>Humidity</Text>
				</View>
				<View style={styles.info}>
					<MaterialCommunityIcons name="weather-sunset-up" size={24} color={PURPLE} />
					<Text style={styles.infoValue}>{get12HTimefromDate(getTimefromTimeZone(sunrise, timezone))} am</Text>
					<Text style={styles.infoTitle}>Sunrise</Text>
				</View>
				<View style={styles.info}>
					<MaterialCommunityIcons name="weather-sunset-down" size={24} color={PURPLE} />
					<Text style={styles.infoValue}>{get12HTimefromDate(getTimefromTimeZone(sunset, timezone))} pm</Text>
					<Text style={styles.infoTitle}>Sunset</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create<IWeatherInfoStyle>({
	container: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 20,
		backgroundColor: '#fdfdff',
		borderRadius: 10,
		...Platform.select({
			default: {
				shadowColor: '#000',
				shadowOffset: { width: 2, height: 4 },
				shadowOpacity: 0.4,
				shadowRadius: 4,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	info: {
		margin: 10,
		alignItems: 'center',
	},
	infoValue: {
		fontWeight: 'bold',
		color: '#424242',
	},
	infoTitle: {
		color: '#6e6d7a',
	},
});

export default WeatherInfo;
