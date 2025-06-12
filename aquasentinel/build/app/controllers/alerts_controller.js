import Alert from '#models/alert';
import Forecast from '#models/forecast';
// Import VineJS validators
import { createAlertValidator, updateAlertValidator } from '#validators/alert';
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
            ]; // This disables TS type-checking for mock alerts
        }
        return view.render('pages/alerts', { alerts });
    }
    async store({ request, response }) {
        // Validate request using VineJS
        const payload = await request.validateUsing(createAlertValidator);
        // Ensure forecast exists
        const forecast = await Forecast.find(payload.forecastId);
        if (!forecast) {
            return response.badRequest({ message: 'Prévision introuvable.' });
        }
        // Create alert
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
        // Validate update request using VineJS
        const payload = await request.validateUsing(updateAlertValidator);
        alert.merge(payload);
        await alert.save();
        return response.ok(alert);
    }
}
