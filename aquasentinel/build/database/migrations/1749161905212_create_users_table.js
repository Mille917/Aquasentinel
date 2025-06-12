import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table.string('first_name').nullable();
            table.string('last_name').nullable();
            table.string('username', 50).notNullable().unique();
            table.string('role', 20).notNullable().defaultTo('citizen'); // allowed: 'moderator', 'citizen'
            table.string('email', 254).notNullable().unique();
            table.string('password').notNullable();
            table.string('phone_number').notNullable().unique();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
