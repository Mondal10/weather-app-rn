import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import { PermissionStatus, Units } from '../shared/enums';

import { getWeatherByLatLong, getWeatherByCityName } from '../api/fetchUrls';

const dummy = {
    "coord": {
        "lon": 72.8479,
        "lat": 19.0144
    },
    "weather": [
        {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
        },
        {
            "id": 711,
            "main": "Smoke",
            "description": "smoke",
            "icon": "50d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 308.66,
        "feels_like": 311.66,
        "temp_min": 308.15,
        "temp_max": 309.15,
        "pressure": 996,
        "humidity": 41
    },
    "visibility": 5000,
    "wind": {
        "speed": 3.6,
        "deg": 70
    },
    "rain": {
        "1h": 0.6
    },
    "clouds": {
        "all": 75
    },
    "dt": 1621159099,
    "sys": {
        "type": 1,
        "id": 9052,
        "country": "IN",
        "sunrise": 1621125234,
        "sunset": 1621172174
    },
    "timezone": 19800,
    "id": 1275339,
    "name": "Mumbai",
    "cod": 200
};

function Home() {
    const [errorMsg, setErrorMsg] = useState<null | string>(null);
    const [weatherData, setWeatherData] = useState<null | any>(null);
    const [unit, setUnit] = useState<Units>(Units.METRIC);

    useEffect(() => {
        load();
    }, [])

    async function load() {
        try {
            const { status } = await requestForegroundPermissionsAsync();

            if (status !== PermissionStatus.GRANTED) {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const location = await getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            // const response = await getWeatherByLatLong(latitude, longitude, unit);

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

    if (weatherData) {
        return ( 
            <View>
                <Text>{weatherData.main.temp}</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>{errorMsg}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        //   flex: 1,
        //   backgroundColor: '#fff',
        //   alignItems: 'center',
        //   justifyContent: 'center',
    },
});

export default Home;
