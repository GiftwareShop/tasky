export default function TodoInput({ newTodo, setNewTodo, addTodo }) {
  return (
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
  );
}
