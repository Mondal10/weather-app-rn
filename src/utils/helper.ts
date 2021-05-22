/**
 * Convert unix timestamp to date
 * @param unixTimestamp unix timestamp
 * @returns calculated date object
 */
export const unixTimestampToDate = (unixTimestamp: number): Date => {
	return new Date(unixTimestamp * 1000);
};

/**
 * Converts wind degree to compass direction
 * @param windDegree
 * @returns direction in string
 */
export const degreeTodirection = (windDegree: number): string => {
	const compassPoints = ["North", "North North East", "North East", "East North East",
		"East", "East South East", "South East", "South South East",
		"South", "South South West", "South West", "West South West",
		"West", "West North West", "North West", "North North West"];
	const rawPosition = Math.floor((windDegree / 22.5) + 0.5);
	const arrayPosition = (rawPosition % 16);

	return compassPoints[arrayPosition];
};

/**
 * convert meter/second to kilometer/hour
 * @param mps meter/second
 * @returns kilometer/hour
 */
 export const mpsTokmph = (mps: number): number => {
	return mps * 3.6;
};

/**
 * Convert decimal temperature value to rounded temperature value with degree symbol
 * @param temperature Temperature in Degree celcius
 * @returns formatted and rounded value
 */
 export const roundedTemperature = (temperature: number): string => {
	return `${Math.round(temperature)}°`;
}
