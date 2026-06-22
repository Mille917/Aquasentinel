import { Client } from 'pg'

const client = new Client({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'aquasentinel',
})

;(async () => {
  try {
    await client.connect()
    console.log('CONNECTED')
    await client.end()
  } catch (e) {
    console.error('ERR:', e.message)
    process.exit(1)
  }
})()
