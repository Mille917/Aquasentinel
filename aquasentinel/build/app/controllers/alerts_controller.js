import Alert from '#models/alert';
import Forecast from '#models/forecast';
import { schema } from '@adonisjs/validator';
export default class AlertController {
    async index({ view }) {
        let alerts = await Alert.query().preload('forecast');
        if (alerts.length === 0) {
            alerts = [
                {
                    message: 'Flash flood warning for river-adjacent regions.',
                    region: 'River Valley',
                    alertType: 'banner',
                    forecast: { title: 'Heavy Rain Expected' }
                },
                {
                    message: 'Drought conditions expected over the next week.',
                    region: 'Lake Shore',
                    alertType: 'push',
                    forecast: { title: 'Prolonged Dry Spell' }
                },
                {
                    message: 'Elevated sea levels and strong winds predicted.',
                    region: 'Coastal Plains',
                    alertType: 'sms',
                    forecast: { title: 'Storm Surge Risk' }
                }
            ];
        }
        return view.render('pages/alerts', { alerts });
    }
    async store({ request, response }) {
        const alertSchema = schema.create({
            forecastId: schema.number(),
            message: schema.string(),
            region: schema.string(),
            alertType: schema.enum(['sms', 'push', 'banner']),
        });
        const payload = await request.validate({ schema: alertSchema });
        const forecast = await Forecast.find(payload.forecastId);
        if (!forecast) {
            return response.badRequest({ message: 'Prévision introuvable.' });
        }
        const alert = await Alert.create(payload);
        return response.created(alert);
    }
    async byLocation({ request, response }) {
        const latitude = request.input('lat');
        const longitude = request.input('lon');
        if (!latitude || !longitude) {
            return response.badRequest({ message: 'Latitude and longitude are required.' });
        }
        const alerts = await Alert.query()
            .where('latitude', latitude)
            .where('longitude', longitude)
            .preload('forecast');
        if (alerts.length === 0) {
            return response.notFound({ message: 'No alerts found for this location.' });
        }
        return response.ok(alerts);
    }
    async show({ params, view }) {
        const alert = await Alert.query()
            .where('id', params.id)
            .preload('forecast')
            .firstOrFail();
        return view.render('pages/alerts', { alert });
    }
    async destroy({ params, response }) {
        const alert = await Alert.findOrFail(params.id);
        await alert.delete();
        return response.noContent();
    }
    async update({ params, request, response }) {
        const alert = await Alert.findOrFail(params.id);
        const alertSchema = schema.create({
            message: schema.string.optional(),
            region: schema.string.optional(),
            alertType: schema.enum.optional(['sms', 'push', 'banner']),
        });
        const payload = await request.validate({ schema: alertSchema });
        alert.merge(payload);
        await alert.save();
        return response.ok(alert);
    }
}
//# sourceMappingURL=alerts_controller.js.map