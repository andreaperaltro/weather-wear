/**
 * Fallback data for the weather API in case the external API calls fail
 */
export const fallbackData = {
  location: {
    name: "Milan",
    country: "Italy",
    lat: 45.4642,
    lon: 9.19
  },
  current: {
    temp: 18.5,
    feelsLike: 17.6,
    condition: "Clear",
    conditionIcon: "01d",
    humidity: 68,
    wind: 7,
    precipitation: 0,
    uv: 0,
    date: "SAT, 20 APR",
    time: "12:34",
    hasRainOrSnow: false
  },
  forecast: [
    {
      date: "SAT, 20 APR",
      maxTemp: 20.2,
      minTemp: 12.4,
      condition: "Clear",
      precipitationProbability: 0,
      hasRainOrSnow: false
    },
    {
      date: "SUN, 21 APR",
      maxTemp: 21.5,
      minTemp: 13.1,
      condition: "Clear",
      precipitationProbability: 0,
      hasRainOrSnow: false
    },
    {
      date: "MON, 22 APR",
      maxTemp: 19.8,
      minTemp: 14.3,
      condition: "Rain",
      precipitationProbability: 60,
      hasRainOrSnow: true
    },
    {
      date: "TUE, 23 APR",
      maxTemp: 17.5,
      minTemp: 11.9,
      condition: "Drizzle",
      precipitationProbability: 30,
      hasRainOrSnow: true
    },
    {
      date: "WED, 24 APR",
      maxTemp: 18.7,
      minTemp: 12.5,
      condition: "Clear",
      precipitationProbability: 0,
      hasRainOrSnow: false
    }
  ]
}; 