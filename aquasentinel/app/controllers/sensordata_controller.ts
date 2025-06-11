import type { HttpContext } from '@adonisjs/core/http'
import SensorData from '#models/sensor_datum'

// Import VineJS validators
import { createSensorDataValidator } from '#validators/sensor_datum'

export default class SensorDataController {
  async index({ response }: HttpContext) {
    const data = await SensorData.all()
    return response.ok(data)
  }

  async store({ request, response }: HttpContext) {
    // Validate request using VineJS
    const payload = await request.validateUsing(createSensorDataValidator)

    // Create sensor data entry
    const data = await SensorData.create(payload)
    return response.created(data)
  }
}
