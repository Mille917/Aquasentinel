import vine from '@vinejs/vine'

export const createForecastValidator = vine.compile(
  vine.object({
    region: vine.string().trim(),
    waterLevel: vine.number().optional(),
    rainfall: vine.number().optional(),
    soilMoisture: vine.number().optional(),
    temperature: vine.number().optional(),
    forecastDate: vine.date(),
    riskType: vine.string().trim(),
    riskLevel: vine.string().trim(),
    message: vine.string().trim(),
  })
)

export const updateForecastValidator = vine.compile(
  vine.object({
    region: vine.string().trim().optional(),
    waterLevel: vine.number().optional(),
    rainfall: vine.number().optional(),
    soilMoisture: vine.number().optional(),
    temperature: vine.number().optional(),
    forecastDate: vine.date().optional(),
    riskType: vine.string().trim().optional(),
    riskLevel: vine.string().trim().optional(),
    message: vine.string().trim().optional(),
    sensorId: vine.number().optional(),
  })
)
