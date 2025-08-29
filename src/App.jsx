import { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import FilterButtons from "./components/FilterButtons";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const statuses = ["todo", "in progress", "complete"];

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

  const filteredTodos = filter === "all" ? todos : todos.filter(t => t.status === filter);

  const counts = {
    todo: todos.filter(t => t.status === "todo").length,
    "in progress": todos.filter(t => t.status === "in progress").length,
    complete: todos.filter(t => t.status === "complete").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col items-center mt-2 p-6">
        <Header />

        <TodoInput 
          newTodo={newTodo} 
          setNewTodo={setNewTodo} 
          addTodo={addTodo} 
        />

        <FilterButtons 
          filter={filter} 
          setFilter={setFilter} 
          counts={counts} 
          statuses={statuses} 
          statusColors={statusColors} 
          activeStatusColors={activeStatusColors} 
        />

        <TodoList 
          todos={filteredTodos} 
          statuses={statuses} 
          updateStatus={updateStatus} 
          deleteTodo={deleteTodo} 
          statusColors={statusColors} 
          activeStatusColors={activeStatusColors} 
        />

        {todos.length === 0 && (
          <p className="text-gray-400 text-center mt-6">No tasks yet.</p>
        )}
      </div>
    </div>
  );
}
