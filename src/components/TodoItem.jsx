export default function TodoItem({ todo, statuses, updateStatus, deleteTodo, statusColors, activeStatusColors }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl shadow-sm ${statusColors[todo.status]}`}>
      <span className="font-medium">{todo.text}</span>
      <div className="flex gap-2 mt-2 sm:mt-0">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => updateStatus(todo.id, status)}
            className={`px-2 py-1 rounded-full text-xs font-semibold border ${todo.status === status ? "border-black" : "border-transparent"} ${todo.status === status ? activeStatusColors[status] : statusColors[status]}`}
          >
            {status}
          </button>
        ))}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
