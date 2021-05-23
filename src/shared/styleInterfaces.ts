import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface IHeaderStyle {
  container: ViewStyle;
  title: TextStyle;
};

export interface IHomeStyle {
  home: ViewStyle;
  WeatherWidget: ViewStyle;
}

export interface IWeatherWidgetStyle {
  container: ViewStyle;
  cityName: TextStyle;
  gradientBG: ImageStyle;
  gradientDimension: ImageStyle;
  description: TextStyle;
  temperature: TextStyle;
  weatherImg: ImageStyle;
}

export interface IWeatherInfoStyle {
  container: ViewStyle;
  infoRow: ViewStyle;
  info: ViewStyle;
  infoValue: ViewStyle;
  infoTitle: ViewStyle;
}
