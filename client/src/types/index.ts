export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  wind: number;
  uv: number;
  date: string;
  time: string;
}
