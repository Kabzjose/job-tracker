import { useState } from "react"
import api from "../services/api"

const AddJobModal = ({ onClose, onJobAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    date_applied: "",
    status: "Applied"
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post("/jobs", formData)
      onJobAdded(res.data)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    // backdrop
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#1e293b] rounded-2xl p-8 w-full max-w-md shadow-2xl">

        {/* modal header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Add new job</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* job title */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Job title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
              className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
              required
            />
          </div>

          {/* company */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Google"
              className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
              required
            />
          </div>

          {/* location */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Nairobi, Kenya"
              className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
              required
            />
          </div>

          {/* date applied */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Date applied
            </label>
            <input
              type="date"
              name="date_applied"
              value={formData.date_applied}
              onChange={handleChange}
              className="w-full bg-[#334155] text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
              required
            />
          </div>

          {/* status */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-[#334155] text-white rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f59e0b] transition"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg py-3 text-sm transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold rounded-lg py-3 text-sm transition duration-200 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobModal