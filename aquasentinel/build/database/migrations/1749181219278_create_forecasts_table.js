import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'forecasts';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('risk_type');
            table.string('risk_level');
            table.text('message');
            table.integer('based_on_sensor').unsigned().references('id').inTable('sensor_data').onDelete('SET NULL');
            table.string('region').notNullable();
            table.float('water_level').nullable();
            table.float('rainfall').nullable();
            table.float('soil_moisture').nullable();
            table.float('temperature').nullable();
            table.timestamp('forecast_date').nullable();
            table.decimal('latitude', 10, 8).nullable();
            table.decimal('longitude', 11, 8).nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1749181219278_create_forecasts_table.js.map