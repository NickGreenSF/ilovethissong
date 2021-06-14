import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { createConnection } from 'typeorm'

export const createNewConnection = async () => {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // dropSchema: true,
    synchronize: true,
    logging: true,
    entities: ['dist/database/entities/*.js'],
  })
  console.log(
    connection.isConnected
      ? 'successfully connected to database!'
      : 'failed to connect to database.'
  )
}
