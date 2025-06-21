import { useState, type ChangeEvent, type KeyboardEvent } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  index: number;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const TodoItem = ({
  todo,
  index,
  onDelete,
  onToggle,
  onEdit,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(todo.text);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleEditSubmit = () => {
    const trimmedText = newText.trim();

    if (trimmedText === "") {
      alert("Todo cannot be empty!");
      return;
    }

    onEdit(todo.id, trimmedText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between w-full md:w-4/5 lg:w-1/2 m-auto items-center px-4 py-2">
      <span className="flex items-center w-full sm:w-auto">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="m-2 scale-125 cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            placeholder="Enter new todo!"
            value={newText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            className="m-1 px-2 py-1 text-lg md:text-2xl border-2 rounded-md w-full"
            autoFocus
          />
        ) : (
          <h1
            onClick={() => onToggle(todo.id)}
            className={`m-1 text-lg md:text-2xl cursor-pointer break-words ${
              todo.completed ? "line-through text-zinc-500" : ""
            }`}
          >
            {index + 1}.{" "}
            {todo.text[0].toUpperCase() + todo.text.slice(1).toLowerCase()}
          </h1>
        )}
      </span>
      <span className="flex mt-2 sm:mt-0">
        {isEditing ? (
          <button onClick={handleEditSubmit} className="m-1 text-base">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="m-1 text-base">
            Edit
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="m-1 text-base">
          Delete
        </button>
      </span>
    </div>
  );
};

export default TodoItem;
