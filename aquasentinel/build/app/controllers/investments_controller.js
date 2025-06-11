import Investment from '#models/investment';
import Forecast from '#models/forecast';
import { schema } from '@adonisjs/validator';
export default class InvestmentController {
    async index({ response }) {
        const investments = await Investment.query().preload('forecast');
        return response.ok(investments);
    }
    async store({ request, response }) {
        const investmentSchema = schema.create({
            amount: schema.number(),
            category: schema.string(),
            region: schema.string(),
            justification: schema.string(),
            forecastId: schema.number(),
        });
        const payload = await request.validate({ schema: investmentSchema });
        const forecast = await Forecast.find(payload.forecastId);
        if (!forecast) {
            return response.badRequest({ message: 'Forecast not found' });
        }
        const investment = await Investment.create(payload);
        return response.created(investment);
    }
}
//# sourceMappingURL=investments_controller.js.map