import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'educational_contents';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('title');
            table.text('content');
            table.string('category');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('forecast_id').unsigned().references('id').inTable('forecasts').onDelete('SET NULL');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1749181273128_create_educational_contents_table.js.map