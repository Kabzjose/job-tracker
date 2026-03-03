import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      await api.post("/auth/logout", { token: refreshToken })
    } catch (err) {
      console.log(err)
    } finally {
      logout()
      navigate("/login")
    }
  }

  return (
    <nav className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Job <span className="text-[#f59e0b]">Tracker</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            Hey, <span className="text-white font-medium">{user?.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar