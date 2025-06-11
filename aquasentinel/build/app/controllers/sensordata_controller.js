import SensorData from '#models/sensor_datum';
import { schema } from '@adonisjs/validator';
export default class SensorDataController {
    async index({ response }) {
        const data = await SensorData.all();
        return response.ok(data);
    }
    async store({ request, response }) {
        const sensorSchema = schema.create({
            location: schema.string(),
            temperature: schema.number.optional(),
            humidity: schema.number.optional(),
            rainfall: schema.number.optional(),
            waterLevel: schema.number.optional(),
            recordedAt: schema.date.optional(),
        });
        const payload = await request.validate({ schema: sensorSchema });
        const data = await SensorData.create(payload);
        return response.created(data);
    }
}
//# sourceMappingURL=sensordata_controller.js.map