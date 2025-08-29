import TodoItem from "./TodoItem";

export default function TodoList({ todos, statuses, updateStatus, deleteTodo, statusColors, activeStatusColors }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          statuses={statuses} 
          updateStatus={updateStatus} 
          deleteTodo={deleteTodo} 
          statusColors={statusColors} 
          activeStatusColors={activeStatusColors} 
        />
      ))}
    </div>
  );
}
