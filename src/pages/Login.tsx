import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    // First try server auth
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true')
        window.dispatchEvent(new Event('authChanged'))
        navigate('/dashboard')
        return
      }
      // If server returns invalid, fall through to local check
    } catch (err) {
      // Network/server down: fallback to local
    }

    // Fallback local login check
    const validEmail = 'koushikadak@gmail.com'
    const validPassword = '456456'
    if (email === validEmail && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true')
      window.dispatchEvent(new Event('authChanged'))
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-gray-900 text-white border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-gray-900 text-white border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full text-gray-300 hover:text-white text-sm"
          >
            Need an account? Register
          </button>
        </form>
      </div>
    </div>
  )
}


