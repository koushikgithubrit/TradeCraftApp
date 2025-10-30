import { Router } from 'express'
import { getDb } from '../mongo.js'
import bcrypt from 'bcryptjs'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const db = getDb()
    const users = db.collection('users')

    const existing = await users.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await users.insertOne({ email, passwordHash, createdAt: new Date() })

    return res.status(201).json({ id: result.insertedId, email })
  } catch (err: any) {
    return res.status(500).json({ message: 'Registration failed', error: err?.message || String(err) })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const db = getDb()
    const users = db.collection('users')
    const user = await users.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    return res.status(200).json({ email: user.email })
  } catch (err: any) {
    return res.status(500).json({ message: 'Login failed', error: err?.message || String(err) })
  }
})

export default router


