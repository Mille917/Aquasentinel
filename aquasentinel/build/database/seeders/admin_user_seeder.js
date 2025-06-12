import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
import { DateTime } from 'luxon';
export default class AdminUserSeeder extends BaseSeeder {
    async run() {
        // Check if an admin already exists
        const existingAdmin = await User.query().where('role', 'admin').first();
        if (existingAdmin) {
            console.log('An admin user already exists. No action taken.');
            return;
        }
        // Create a new admin user
        await User.create({
            createdAt: DateTime.now(), // Use Luxon DateTime instance for AdonisJS models
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            password: 'securepassword', // Make sure User model hashes passwords!
            role: 'admin', // Ensure this is set to 'admin' to avoid conflicts
            updatedAt: DateTime.now(),
            username: 'adminuser',
            phoneNumber: '+243812345678', // Use a valid phone number format
        });
        console.log('Admin user created successfully.');
    }
}
