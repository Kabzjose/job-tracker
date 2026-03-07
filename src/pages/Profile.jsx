import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import api from "../services/api"

const Profile = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [nameData, setNameData] = useState({ name: user?.name || "" })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [nameSuccess, setNameSuccess] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [passwordSuccess, setPasswordSuccess] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [nameLoading, setNameLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const handleNameUpdate = async (e) => {
    e.preventDefault()
    setNameLoading(true)
    setNameError(null)
    setNameSuccess(null)
    try {
      const res = await api.put("/auth/profile", { name: nameData.name })
      // update user in context and localStorage
      const updatedUser = { ...user, name: res.data.user.name }
      login(updatedUser, localStorage.getItem("accessToken"), localStorage.getItem("refreshToken"))
      setNameSuccess("Name updated successfully")
    } catch (err) {
      setNameError(err.response?.data?.message || "Something went wrong")
    } finally {
      setNameLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordError("Passwords do not match")
    }

    setPasswordLoading(true)
    try {
      await api.put("/auth/profile", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      setPasswordSuccess("Password updated successfully")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Something went wrong")
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* page header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white transition text-sm"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <p className="text-slate-400 text-sm mt-1">Manage your account settings</p>
          </div>
        </div>

        {/* account info card */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 mb-6">
          <h3 className="text-white font-semibold mb-4">Account Info</h3>
          <div className="flex items-center gap-4">
            {/* avatar */}
            <div className="w-14 h-14 rounded-full bg-[#f59e0b] flex items-center justify-center text-[#0f172a] font-bold text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-slate-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* update name card */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 mb-6">
          <h3 className="text-white font-semibold mb-4">Update Name</h3>

          {nameSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg px-4 py-3 mb-4">
              {nameSuccess}
            </div>
          )}
          {nameError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {nameError}
            </div>
          )}

          <form onSubmit={handleNameUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={nameData.name}
                onChange={(e) => setNameData({ name: e.target.value })}
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={nameLoading}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold px-6 py-2.5 rounded-lg text-sm transition duration-200 disabled:opacity-50"
            >
              {nameLoading ? "Saving..." : "Save name"}
            </button>
          </form>
        </div>

        {/* update password card */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-white font-semibold mb-4">Update Password</h3>

          {passwordSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg px-4 py-3 mb-4">
              {passwordSuccess}
            </div>
          )}
          {passwordError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Current password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                New password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Confirm new password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold px-6 py-2.5 rounded-lg text-sm transition duration-200 disabled:opacity-50"
            >
              {passwordLoading ? "Saving..." : "Save password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile