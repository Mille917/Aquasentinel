import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'add_country_to_users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('country', 2).notNullable().defaultTo('US'); // 2-letter ISO code
        });
    }
    async down() {
        this.schema.alterTable('users', (table) => {
            table.dropColumn('country');
        });
    }
}
