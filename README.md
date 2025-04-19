# WeatherWardrobe

A smart clothing recommendation app that suggests what to wear based on current weather conditions.

## Features

- **Real-time Weather Data**: Displays current weather conditions including temperature, precipitation, and forecasts.
- **Smart Outfit Recommendations**: Suggests appropriate clothing items categorized as:
  - **Essentials**: Core clothing items everyone needs
  - **Weather Protection**: Items to protect from current weather conditions
  - **Accessories**: Optional items that enhance comfort
- **5-Day Forecast**: View weather predictions and clothing recommendations for upcoming days.
- **Emoji-based Icons**: Visual representations of both weather conditions and clothing items.

## Technical Implementation

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Node.js Express server
- **Weather-adaptive Clothing Logic**: Custom algorithm that categorizes clothing based on temperature ranges and weather conditions
- **Responsive Design**: Optimized for both mobile and desktop views

## Architecture

The clothing recommendation system intelligently organizes items into three categories:
1. **Essentials**: Basic items like shirts, pants, and footwear
2. **Weather Protection**: Items specifically for current weather (umbrellas, warm hats, etc.)
3. **Accessories**: Additional items for comfort (sunglasses, water bottles, etc.)

## Weather-Based Logic

- **Cold Weather (<15°C)**: Prioritizes head covering and proper footwear
- **Warm Weather (≥15°C)**: Focuses on light clothing with sun protection
- **Precipitation**: Automatically prioritizes items like umbrellas
- **Extreme Temperatures**: Adjusts the minimum number of recommended items

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:5173

## Screenshots

(Screenshots will be added here)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons created with custom SVG elements