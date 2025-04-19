/**
 * Fallback data for the weather API in case the external API calls fail
 */
export const fallbackData = {
  location: {
    name: "Milan",
    region: "Lombardy",
    country: "Italy",
    lat: 45.47,
    lon: 9.18
  },
  current: {
    temp_c: 18,
    condition: {
      text: "Partly cloudy",
      code: 1003
    },
    wind_kph: 15,
    humidity: 65,
    feelslike_c: 17.5
  },
  forecast: {
    forecastday: [
      {
        date: new Date().toISOString().split('T')[0],
        day: {
          maxtemp_c: 22,
          mintemp_c: 14,
          condition: {
            text: "Partly cloudy",
            code: 1003
          }
        },
        hour: [
          {
            time: `${new Date().toISOString().split('T')[0]} 08:00`,
            temp_c: 16,
            condition: {
              text: "Sunny",
              code: 1000
            }
          },
          {
            time: `${new Date().toISOString().split('T')[0]} 12:00`,
            temp_c: 20,
            condition: {
              text: "Partly cloudy",
              code: 1003
            }
          },
          {
            time: `${new Date().toISOString().split('T')[0]} 16:00`,
            temp_c: 22,
            condition: {
              text: "Partly cloudy",
              code: 1003
            }
          },
          {
            time: `${new Date().toISOString().split('T')[0]} 20:00`,
            temp_c: 18,
            condition: {
              text: "Clear",
              code: 1000
            }
          }
        ]
      }
    ]
  }
}; 