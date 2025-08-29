export default function FilterButtons({ filter, setFilter, counts, statuses, statusColors, activeStatusColors }) {
  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded-full ${filter === "all" ? "bg-gray-300" : "bg-gray-100"}`}
      >
        All ({Object.values(counts).reduce((a,b) => a+b,0)})
      </button>
      {statuses.map(status => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded-full ${filter === status ? activeStatusColors[status] : statusColors[status]}`}
        >
          {status} ({counts[status]})
        </button>
      ))}
    </div>
  );
}
