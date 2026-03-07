import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import StatsCard from "../components/StatsCard"
import Jobcard from "../components/Jobcard"
import api from "../services/api"

const statusColors = {
  Applied: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Interview: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Offer: "bg-green-500/10 text-green-400 border border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border border-red-500/20"
}

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs")
      setJobs(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs])
  }
  const handleUpdate = async (id) =>{
    try {
   
    const { title, company, location, date_applied, status } = editingJob
    
      const res = await api.put(`/jobs/${id}`,{
        title,
        company,
        location,
        date_applied,
        status
      })
      setJobs(jobs.map(job => job.job_id === id ? res.data : job))
      setEditingJob(null)
    } catch (error) {
      console.error("Error updating job:", error)
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`)
      setJobs(jobs.filter(job => job.job_id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  // stats
  const stats = {
    total: jobs.length,
    interview: jobs.filter(j => j.status === "Interview").length,
    offers: jobs.filter(j => j.status === "Offer").length,
    rejected: jobs.filter(j => j.status === "Rejected").length
  }

  // filtered jobs
  const filteredJobs = filter === "All"
    ? jobs
    : jobs.filter(job => job.status === filter)

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* page title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1">
              Track and manage your job applications
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold px-5 py-2.5 rounded-lg text-sm transition duration-200"
          >
            + Add job
          </button>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total Applied" count={stats.total} color="text-white" />
          <StatsCard label="Interviewing" count={stats.interview} color="text-amber-400" />
          <StatsCard label="Offers" count={stats.offers} color="text-green-400" />
          <StatsCard label="Rejected" count={stats.rejected} color="text-red-400" />
        </div>

        {/* filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "Applied", "Interview", "Offer", "Rejected"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                filter === tab
                  ? "bg-[#f59e0b] text-[#0f172a]"
                  : "bg-[#1e293b] text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* jobs table */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 overflow-hidden">
          {loading ? (
            <div className="text-center text-slate-400 py-16 text-sm">
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-slate-400 py-16 text-sm">
              No jobs found. Click <span className="text-[#f59e0b]">+ Add job</span> to get started.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Role</th>
                  <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Company</th>
                  <th className="text-left text-xs text-slate-400 font-medium px-6 py-4 hidden md:table-cell">Location</th>
                  <th className="text-left text-xs text-slate-400 font-medium px-6 py-4 hidden md:table-cell">Date Applied</th>
                  <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Status</th>
                  <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
  {filteredJobs.map((job, index) => (
    <tr
      key={job.job_id}
      className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition ${
        index === filteredJobs.length - 1 ? "border-none" : ""
      }`}
    >
      {/* title */}
      <td className="px-6 py-4">
        {editingJob?.job_id === job.job_id ? (
          <input
            value={editingJob.title}
            onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
            className="bg-[#334155] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f59e0b] w-full"
          />
        ) : (
          <p className="text-white text-sm font-medium">{job.title}</p>
        )}
      </td>

      {/* company */}
      <td className="px-6 py-4">
        {editingJob?.job_id === job.job_id ? (
          <input
            value={editingJob.company}
            onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })}
            className="bg-[#334155] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f59e0b] w-full"
          />
        ) : (
          <p className="text-slate-300 text-sm">{job.company}</p>
        )}
      </td>

      {/* location */}
      <td className="px-6 py-4 hidden md:table-cell">
        {editingJob?.job_id === job.job_id ? (
          <input
            value={editingJob.location}
            onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
            className="bg-[#334155] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f59e0b] w-full"
          />
        ) : (
          <p className="text-slate-400 text-sm">{job.location}</p>
        )}
      </td>

      {/* date applied */}
      <td className="px-6 py-4 hidden md:table-cell">
        {editingJob?.job_id === job.job_id ? (
          <input
            type="date"
            value={editingJob.date_applied?.split("T")[0]}
            onChange={(e) => setEditingJob({ ...editingJob, date_applied: e.target.value })}
            className="bg-[#334155] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f59e0b] w-full"
          />
        ) : (
          <p className="text-slate-400 text-sm">
            {new Date(job.date_applied).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </p>
        )}
      </td>

      {/* status */}
      <td className="px-6 py-4">
        {editingJob?.job_id === job.job_id ? (
          <select
            value={editingJob.status}
            onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value })}
            className="bg-[#334155] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f59e0b]"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        ) : (
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[job.status]}`}>
            {job.status}
          </span>
        )}
      </td>

      {/* actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {editingJob?.job_id === job.job_id ? (
            <>
              <button
                onClick={() => handleUpdate(job.job_id)}
                className="text-xs text-green-400 hover:text-green-300 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditingJob(null)}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditingJob({ ...job })}
                className="text-xs text-[#f59e0b] hover:text-[#d97706] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.job_id)}
                className="text-xs text-slate-500 hover:text-red-400 transition"
              >
                    Delete
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
      </table>
        )}
        </div>
        </div>

          {/* modal */}
          {showModal && (
        <Jobcard
          onClose={() => setShowModal(false)}
          onJobAdded={handleJobAdded}
        />
      )}
    </div>
  )
}

export default Dashboard