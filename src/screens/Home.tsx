import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import { PermissionStatus, Units } from '../shared/enums';
import { IHomeStyle } from '../shared/styleInterfaces';
import { getWeatherByLatLong } from '../api/fetchUrls';
import Header from '../components/Header';
import WeatherWidget from '../components/WeatherWidget';
import WeatherInfo from '../components/WeatherInfo';
import SearchBar from '../components/SearchBar';

function Home() {
	const [errorMsg, setErrorMsg] = useState<null | string>(null);
	const [weatherData, setWeatherData] = useState<null | any>(null);
	const unit: Units = Units.METRIC;

	useEffect(() => {
		load();
	}, [])

	async function load() {
		try {
			if (weatherData) {
				setWeatherData(null);
				setErrorMsg(null);
			}

			const { status } = await requestForegroundPermissionsAsync();

			if (status !== PermissionStatus.GRANTED) {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			const location = await getCurrentPositionAsync({});
			const { latitude, longitude } = location.coords;
			const response = await getWeatherByLatLong(latitude, longitude, unit);

			if (response.cod === 200) {
			    setWeatherData(response);
			} else {
			    setErrorMsg(response.message);
			}
		} catch (error) {
			setErrorMsg(error.message);
			throw new Error(error);
		}
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.home}>
				<Header load={load}/>
				{
					(weatherData) ?
						<>
							{/* Weather Screen */}
							<View style={styles.WeatherWidget}>
								<SearchBar setWeatherData={setWeatherData}/>
								<WeatherWidget
									cityName={weatherData.name}
									icon={weatherData.weather[0].icon}
									temperature={weatherData.main.temp}
									description={weatherData.weather[0].description}
									timezone={weatherData.timezone}
									currentDate={weatherData.dt}
								/>
								<WeatherInfo
									pressure={weatherData.main.pressure}
									windSpeed={weatherData.wind.speed}
									windDegree={weatherData.wind.deg}
									sunrise={weatherData.sys.sunrise}
									sunset={weatherData.sys.sunset}
									humidity={weatherData.main.humidity}
									timezone={weatherData.timezone}
								/>
							</View>
						</> :
						<>
							<View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
								{/* Error Screen */}
								{
									(errorMsg) ? <Text>{errorMsg}</Text> : <ActivityIndicator size="large" color="#4f3cc9" />
								}
							</View>
						</>
				}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create<IHomeStyle>({
	home: {
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	WeatherWidget: {
		flexDirection: 'column',
		alignItems: 'center',
	}
});

export default Home;
