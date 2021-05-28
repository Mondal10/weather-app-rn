import { BASE_URL } from './config';
import { WEATHER_API_KEY } from '@env';

const fetchData = (url: string) => {
	console.log(WEATHER_API_KEY);
	return fetch(url).then(response => response.json()).then((data) => data);
};

export const getWeatherByLatLong = (latitude: number, longitude: number, unit: string = 'metric') => {
	const url = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${WEATHER_API_KEY}`
	const result = fetchData(url);

	return result;
};

export const getWeatherByCityName = (name: string, unit: string = 'metric') => {
	const url = `${BASE_URL}q=${name}&units=${unit}&appid=${WEATHER_API_KEY}`
	const result = fetchData(url);

	return result;
};
