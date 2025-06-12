import Forecast from '#models/forecast';
import AIAlertService from '#services/ai_alert_service';
import { DateTime } from 'luxon';
// Import VineJS validators
import { createForecastValidator, updateForecastValidator } from '#validators/forecast';
export default class ForecastController {
    async index({ response }) {
        const forecasts = await Forecast.query().preload('sensorData');
        return response.ok(forecasts);
    }
    async store({ request, response }) {
        // Validate request using VineJS
        const payload = await request.validateUsing(createForecastValidator);
        // Convert forecastDate to Luxon DateTime
        const forecastData = {
            ...payload,
            forecastDate: DateTime.fromJSDate(payload.forecastDate),
        };
        // Create forecast
        const forecast = await Forecast.create(forecastData);
        // Automatically generate alerts based on the forecast
        await AIAlertService.generateFromForecast(forecast);
        return response.created(forecast);
    }
    async show({ params, response }) {
        const forecast = await Forecast.find(params.id);
        if (!forecast)
            return response.notFound();
        await forecast.load('sensorData');
        return response.ok(forecast);
    }
    async update({ params, request, response }) {
        const forecast = await Forecast.find(params.id);
        if (!forecast)
            return response.notFound();
        // Validate update request using VineJS
        const data = await request.validateUsing(updateForecastValidator);
        // Convert forecastDate to Luxon DateTime if present
        const updateData = {
            ...data,
            forecastDate: data.forecastDate ? DateTime.fromJSDate(data.forecastDate) : data.forecastDate,
        };
        forecast.merge(updateData);
        await forecast.save();
        return response.ok(forecast);
    }
    async destroy({ params, response }) {
        const forecast = await Forecast.find(params.id);
        if (!forecast)
            return response.notFound();
        await forecast.delete();
        return response.ok({ message: 'Forecast deleted' });
    }
}
