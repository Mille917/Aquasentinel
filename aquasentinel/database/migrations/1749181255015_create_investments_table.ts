import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'investments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('amount')
      table.string('category') // 'prevention', 'response', 'repair'
      table.string('region')
      table.text('justification')
      table.integer('forecast_id').unsigned().references('id').inTable('forecasts').onDelete('SET NULL')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}