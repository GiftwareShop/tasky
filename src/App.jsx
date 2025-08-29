import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([{ id: Date.now(), text: newTodo, status: "todo" }, ...todos]);
    setNewTodo("");
  };

  const updateStatus = (id, status) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)));
  };

  const deleteTodo = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const statusColors = {
    todo: "bg-yellow-200 text-yellow-800",
    "in progress": "bg-blue-200 text-blue-800",
    complete: "bg-green-200 text-green-800",
  };

  const activeStatusColors = {
    todo: "bg-yellow-300 text-yellow-900",
    "in progress": "bg-blue-300 text-blue-900",
    complete: "bg-green-300 text-green-900",
  };

  const statuses = ["todo", "in progress", "complete"];

  const filteredTodos = filter === "all" ? todos : todos.filter(t => t.status === filter);

  const counts = {
    todo: todos.filter(t => t.status === "todo").length,
    "in progress": todos.filter(t => t.status === "in progress").length,
    complete: todos.filter(t => t.status === "complete").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col items-center mt-2">

      <img 
        src="/tasky.png" 
        alt="Tasky Logo" 
        className="w-48 h-auto mx-auto my-8"
      />

        {/* Input */}
        <div className="flex w-full max-w-md mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className="flex-grow border rounded-l-xl p-2 focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons and Counts */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full ${filter === "all" ? "bg-gray-300" : "bg-gray-100"}`}
          >
            All ({todos.length})
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

        {/* Todo List */}
        <div className="flex flex-col gap-4 w-full">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl shadow-sm ${statusColors[todo.status]}`}
            >
              <span className="font-medium">{todo.text}</span>

              {/* Status Buttons */}
              <div className="flex gap-2 mt-2 sm:mt-0">
                {statuses.map((status) => (
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
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-gray-400 text-center mt-6">No tasks yet. 🎉</p>
        )}
      </div>
    </div>
  );
}
