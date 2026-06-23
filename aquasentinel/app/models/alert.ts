import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Forecast from '#models/forecast'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
// Alert model for weather alerts related to forecasts

  @column()
  declare forecastId: number

  @column()
  declare message: string

  @column()
  declare region: string

  @column()
  declare alertType: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Forecast, {
    foreignKey: 'forecastId',
    localKey: 'id',
  })
  declare forecast: BelongsTo<typeof Forecast>
}
