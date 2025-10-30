import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

let client = null
let dbInstance = null

export async function connectToDatabase() {
  if (dbInstance) return dbInstance
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not set')
  client = new MongoClient(uri)
  await client.connect()
  // Force exact DB name to avoid casing issues seen in Atlas
  dbInstance = client.db('Tradecraft')
  await dbInstance.collection('users').createIndex({ email: 1 }, { unique: true })
  return dbInstance
}

export function getDb() {
  if (!dbInstance) throw new Error('Database not initialized')
  return dbInstance
}


