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

const dummy = {
  "coord": {
    "lon": 72.8479,
    "lat": 19.0144
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 32.99,
    "feels_like": 40.22,
    "temp_min": 31.94,
    "temp_max": 32.99,
    "pressure": 1006,
    "humidity": 62
  },
  "visibility": 5000,
  "wind": {
    "speed": 5.66,
    "deg": 310
  },
  "clouds": {
    "all": 40
  },
  "dt": 1621765297,
  "sys": {
    "type": 1,
    "id": 9052,
    "country": "IN",
    "sunrise": 1621729919,
    "sunset": 1621777142
  },
  "timezone": 19800,
  "id": 1275339,
  "name": "Mumbai",
  "cod": 200
};

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
			// const response = await getWeatherByLatLong(latitude, longitude, unit);

			// if (response.cod === 200) {
			//     setWeatherData(response);
			// } else {
			//     setErrorMsg(response.message);
			// }
			if (dummy.cod === 200) {
				setWeatherData(dummy);
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
