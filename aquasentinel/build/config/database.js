import env from '#start/env';
import { defineConfig } from '@adonisjs/lucid';
const dbConfig = defineConfig({
    connection: 'postgres',
    connections: {
        postgres: {
            client: 'pg',
            connection: env.get('NODE_ENV') === 'production' ? {
                connectionString: env.get('DATABASE_URL'),
                ssl: false, // Set to true if using SSL in production
            }
                : {
                    host: env.get('DB_HOST'),
                    port: env.get('DB_PORT'),
                    user: env.get('DB_USER'),
                    password: env.get('DB_PASSWORD'),
                    database: env.get('DB_DATABASE'),
                    ssl: false, // Set to true if using SSL in development  
                },
            migrations: {
                naturalSort: true,
                paths: ['database/migrations'],
            },
        },
    },
});
export default dbConfig;
