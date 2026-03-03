const StatsCard = ({ label, count, color }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{count}</p>
    </div>
  )
}

export default StatsCard