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
            table.string('region').notNullable(); // Geographic area
            table.float('water_level').nullable(); // From sensors or AI
            table.float('rainfall').nullable(); // mm or cm
            table.float('soil_moisture').nullable(); // %
            table.float('temperature').nullable(); // °C
            table.timestamp('forecast_date').nullable();
            table.decimal('latitude', 10, 8).nullable(); // Optional: for geographic data
            table.decimal('longitude', 11, 8).nullable(); // Optional: for geographic data
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
