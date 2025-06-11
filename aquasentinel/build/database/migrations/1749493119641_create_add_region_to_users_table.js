import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'add_region_to_users';
    async up() {
        this.schema.alterTable('users', (table) => {
            table.string('region').nullable();
        });
    }
    async down() {
        this.schema.alterTable('users', (table) => {
            table.dropColumn('region');
        });
    }
}
//# sourceMappingURL=1749493119641_create_add_region_to_users_table.js.map