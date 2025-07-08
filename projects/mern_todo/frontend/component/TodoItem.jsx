import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded mb-2">
      <p
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={() => onToggle(todo._id, !todo.completed)}
      >
        {todo.text}
      </p>
      <button
        onClick={() => onDelete(todo._id)}
        className="text-red-500 hover:text-red-700"
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
