import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post("/auth/login", formData)
      
      login(res.data.user, res.data.accessToken, res.data.refreshToken)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
      console.log("full error:", err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Job <span className="text-[#f59e0b]">Tracker</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Sign in to manage your job applications
          </p>
        </div>

        {/* card */}
        <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6">
            Welcome back
          </h2>

          {/* error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* email */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>

            {/* password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm text-slate-400">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-[#f59e0b] hover:text-[#d97706] transition">
                Forgot password?
              </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold rounded-lg py-3 text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* register link */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#f59e0b] hover:text-[#d97706] font-medium transition"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © 2026 Job Tracker. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login