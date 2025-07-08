import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "../component/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodo = async () => {
    const response = await axios.get("http://localhost:3000/todo");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodo();
  }, [todos]);

  const addTodo = async () => {
    if (!text.trim()) return;
    const response = await axios.post("http://localhost:3000/todo", { text });
    setTodos([...todos, response.data]);
    setText("");
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`http://localhost:3000/todo/${id}`, {
      completed,
    });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todo/${id}`);
    setTodos(todos.filter((todo) => todo.id != id));
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border w-full p-2 rounded-l outline-none"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          ADD
        </button>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
