import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import ClearTodos from "./ClearTodos";
import TodoForm from "./TodoForm";
import TodosFilter from "./TodosFilter";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "notCompleted"
  >("all");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const isDuplicate = todos.some(
        (todo) => todo.text.toLowerCase() === trimmedInput.toLowerCase()
      );

      if (isDuplicate) {
        alert("Item already exist!");
        setInput("");
        return;
      }

      const newTodo: Todo = {
        id: uuidv4(),
        text: trimmedInput,
        completed: false,
      };
      setTodos((todos) => [...todos, newTodo]);
      setInput("");
    }
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id: string, newText: string) => {
    const trimmedText = newText.trim();
    const isDuplicate = todos.some(
      (todo) =>
        todo.text.toLowerCase() === trimmedText.toLowerCase() && todo.id !== id
    );

    if (isDuplicate) {
      alert("Another todo with the same text already exists!");
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  };

  const handleClear = () => {
    if (window.confirm("Are you sure! do you want to clear entire list?")) {
      setTodos([]);
    }
  };

  const filterTodos = todos.filter((todo) => {
    if (filterStatus === "completed") return todo.completed;
    if (filterStatus === "notCompleted") return !todo.completed;
    return true;
  });

  return (
    <div className="px-4">
      <h1 className="m-4 text-4xl md:text-6xl font-medium">Todo</h1>
      <TodoForm input={input} setInput={setInput} onAdd={handleAdd} />
      <div>
        <h1 className="mt-2 text-xl md:text-3xl">
          {todos.length > 0 ? "Todos are below!" : "List is empty, add todos!"}
        </h1>
        {todos.length > 0 && (
          <>
            <TodosFilter setFilterStatus={setFilterStatus} />
            <ul>
              {filterTodos.map((todo, index) => (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    index={index}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                  />
                </li>
              ))}
            </ul>
            <ClearTodos onClear={handleClear} />
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
