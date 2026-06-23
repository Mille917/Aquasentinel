import vine from '@vinejs/vine'

export const createAlertValidator = vine.compile(
  vine.object({
    forecastId: vine.number(),
    message: vine.string().trim(),
    region: vine.string().trim(),
    alertType: vine.enum(['sms', 'push', 'banner'] as const),
  })
)

export const updateAlertValidator = vine.compile(
  vine.object({
    message: vine.string().trim().optional(),
    region: vine.string().trim().optional(),
    alertType: vine.enum(['sms', 'push', 'banner'] as const).optional(),
  })
)
