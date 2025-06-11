import Forecast from '#models/forecast';
import { schema } from '@adonisjs/validator';
import AIAlertService from '#services/ai_alert_service';
export default class ForecastController {
    async index({ response }) {
        const forecasts = await Forecast.query().preload('sensorData');
        return response.ok(forecasts);
    }
    async store({ request, response }) {
        const forecastSchema = schema.create({
            region: schema.string(),
            waterLevel: schema.number.optional(),
            rainfall: schema.number.optional(),
            soilMoisture: schema.number.optional(),
            temperature: schema.number.optional(),
            forecastDate: schema.date(),
            riskType: schema.string(),
            riskLevel: schema.string(),
            message: schema.string(),
        });
        const payload = await request.validate({ schema: forecastSchema });
        const forecast = await Forecast.create(payload);
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
        const updateSchema = schema.create({
            riskType: schema.string.optional(),
            riskLevel: schema.string.optional(),
            message: schema.string.optional(),
            sensorId: schema.number.optional(),
            region: schema.string.optional(),
            forecastDate: schema.date.optional(),
        });
        const data = await request.validate({ schema: updateSchema });
        forecast.merge(data);
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
//# sourceMappingURL=forecasts_controller.js.map