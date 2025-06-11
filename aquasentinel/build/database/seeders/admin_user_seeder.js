import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
import { DateTime } from 'luxon';
export default class AdminUserSeeder extends BaseSeeder {
    async run() {
        const existingAdmin = await User.query().where('role', 'admin').first();
        if (existingAdmin) {
            console.log('An admin user already exists. No action taken.');
            return;
        }
        await User.create({
            createdAt: DateTime.now(),
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            password: 'securepassword',
            role: 'admin',
            updatedAt: DateTime.now(),
            username: 'adminuser',
            phoneNumber: '+243812345678',
        });
        console.log('Admin user created successfully.');
    }
}
//# sourceMappingURL=admin_user_seeder.js.map