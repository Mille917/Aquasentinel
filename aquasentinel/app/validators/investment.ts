import vine from '@vinejs/vine'

export const createInvestmentValidator = vine.compile(
  vine.object({
    amount: vine.number().positive(),
    category: vine.string().trim(),
    region: vine.string().trim(),
    justification: vine.string().trim(),
    forecastId: vine.number().positive(),
  })
)
