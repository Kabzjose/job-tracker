import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // check passwords match before sending to backend
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match")
    }

    setLoading(true)
    try {
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      login(res.data.user, res.data.accessToken, res.data.refreshToken)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
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
            Create an account to start tracking your applications
          </p>
        </div>

        {/* card */}
        <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6">
            Create your account
          </h2>

          {/* error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* name */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>

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
              <label className="block text-sm text-slate-400 mb-1.5">
                Password
              </label>
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

            {/* confirm password */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>

            {/* password strength indicator */}
            {formData.password && (
              <div>
                <div className="flex gap-1 mt-1">
                  <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    formData.password.length > 0 ? "bg-red-500" : "bg-[#334155]"
                  }`} />
                  <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    formData.password.length >= 6 ? "bg-amber-500" : "bg-[#334155]"
                  }`} />
                  <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    formData.password.length >= 8 ? "bg-amber-400" : "bg-[#334155]"
                  }`} />
                  <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    formData.password.length >= 10 ? "bg-green-500" : "bg-[#334155]"
                  }`} />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {formData.password.length < 6 && "Weak — at least 6 characters"}
                  {formData.password.length >= 6 && formData.password.length < 8 && "Fair — getting stronger"}
                  {formData.password.length >= 8 && formData.password.length < 10 && "Good password"}
                  {formData.password.length >= 10 && "Strong password"}
                </p>
              </div>
            )}

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold rounded-lg py-3 text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* login link */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#f59e0b] hover:text-[#d97706] font-medium transition"
            >
              Sign in
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

export default Register