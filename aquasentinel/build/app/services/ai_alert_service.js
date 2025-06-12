import Alert from '#models/alert';
import axios from 'axios';
export default class AIAlertService {
    // Utility to fetch weather forecast from Open-Meteo
    static async fetchOpenMeteoData(latitude, longitude) {
        try {
            const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m,precipitation,soil_moisture',
                    daily: 'precipitation_sum,temperature_2m_max,temperature_2m_min',
                    timezone: 'auto',
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Open-Meteo API error:', error.message);
            }
            else {
                console.error('Open-Meteo API error:', error);
            }
            return null;
        }
    }
    static async generateFromForecast(forecast) {
        // Example: assume forecast has lat & long (you'll need to add these fields in your DB/models)
        const latitude = forecast.latitude || 0;
        const longitude = forecast.longitude || 0;
        // Fetch weather data
        const weatherData = await this.fetchOpenMeteoData(latitude, longitude);
        if (!weatherData) {
            // Fallback to old logic if API fails
            return this.simpleRuleAlerts(forecast);
        }
        // Example: Use Open-Meteo daily precipitation sum & temperature to create alerts
        const precipitation = weatherData.daily.precipitation_sum[0]; // mm
        const tempMax = weatherData.daily.temperature_2m_max[0]; // °C
        const tempMin = weatherData.daily.temperature_2m_min[0]; // °C
        // Example alert logic
        if (tempMin < 0) {
            await Alert.create({
                forecastId: forecast.id,
                message: `❄️ Freezing temperatures expected (${tempMin}°C). Risk of frost or ice!`,
                region: forecast.region || 'Unknown',
                alertType: 'push',
            });
        }
        if (precipitation > 50) {
            await Alert.create({
                forecastId: forecast.id,
                message: `🚨 Heavy rainfall forecasted (${precipitation} mm). Flood risk high!`,
                region: forecast.region || 'Unknown',
                alertType: 'banner',
            });
        }
        else if (precipitation < 5 && tempMax > 40) {
            await Alert.create({
                forecastId: forecast.id,
                message: `🔥 Hot and dry weather predicted (max ${tempMax}°C). Drought risk!`,
                region: forecast.region || 'Unknown',
                alertType: 'push',
            });
        }
        else {
            // If no extreme weather, run simple threshold checks
            return this.simpleRuleAlerts(forecast);
        }
    }
    static async simpleRuleAlerts(forecast) {
        // Your original logic for fallback
        if (forecast.waterLevel && forecast.waterLevel > 3.0) {
            await Alert.create({
                forecastId: forecast.id,
                message: '🚨 Potential flood risk detected. Stay alert!',
                region: forecast.region || 'Unknown',
                alertType: 'banner',
            });
        }
        if (forecast.rainfall && forecast.soilMoisture && forecast.rainfall < 0.1 && forecast.soilMoisture < 10) {
            await Alert.create({
                forecastId: forecast.id,
                message: '🔥 Drought warning: Low rainfall and dry soil conditions.',
                region: forecast.region || 'Unknown',
                alertType: 'push',
            });
        }
    }
}
