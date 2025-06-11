import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'add_country_to_users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('country', 2).notNullable().defaultTo('US');
        });
    }
    async down() {
        this.schema.alterTable('users', (table) => {
            table.dropColumn('country');
        });
    }
}
//# sourceMappingURL=1749492144051_create_add_country_to_users_table.js.map