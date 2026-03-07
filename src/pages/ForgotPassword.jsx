import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const res = await api.post("/auth/forgot-password", { email })
      setMessage(res.data.message)
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
            Reset your password
          </p>
        </div>

        {/* card */}
        <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-2">
            Forgot your password?
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Enter your email and we'll send you a reset link.
          </p>

          {/* success message */}
          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg px-4 py-3 mb-5">
              {message}
            </div>
          )}

          {/* error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          {/* only show form if no success message yet */}
          {!message && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold rounded-lg py-3 text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-slate-400 mt-6">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#f59e0b] hover:text-[#d97706] font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword