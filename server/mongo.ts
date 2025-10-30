import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

let client: MongoClient | null = null
let dbInstance: Db | null = null

export async function connectToDatabase() {
  if (dbInstance) return dbInstance
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not set')
  client = new MongoClient(uri)
  await client.connect()
  // Force exact DB name to avoid casing issues seen in Atlas
  dbInstance = client.db('Tradecraft')
  // Ensure users collection has unique index on email
  await dbInstance.collection('users').createIndex({ email: 1 }, { unique: true })
  return dbInstance
}

export function getDb(): Db {
  if (!dbInstance) throw new Error('Database not initialized')
  return dbInstance
}


