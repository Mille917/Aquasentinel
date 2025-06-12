import Investment from '#models/investment';
import Forecast from '#models/forecast';
// Import VineJS validators
import { createInvestmentValidator } from '#validators/investment';
export default class InvestmentController {
    async index({ response }) {
        const investments = await Investment.query().preload('forecast');
        return response.ok(investments);
    }
    async store({ request, response }) {
        // Validate request using VineJS
        const payload = await request.validateUsing(createInvestmentValidator);
        // Ensure forecast exists
        const forecast = await Forecast.find(payload.forecastId);
        if (!forecast) {
            return response.badRequest({ message: 'Forecast not found' });
        }
        // Create investment
        const investment = await Investment.create(payload);
        return response.created(investment);
    }
}
