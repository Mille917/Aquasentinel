import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'sensor_data';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('location');
            table.float('temperature');
            table.float('humidity');
            table.float('rainfall');
            table.float('water_level');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1749181203713_create_sensor_data_table.js.map