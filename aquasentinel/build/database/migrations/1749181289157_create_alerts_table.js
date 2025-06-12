import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'alerts';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('forecast_id').unsigned().references('id').inTable('forecasts').onDelete('CASCADE');
            table.text('message');
            table.string('region');
            table.string('alert_type'); // 'sms', 'push', 'banner'
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
