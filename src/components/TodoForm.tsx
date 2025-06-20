import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

type TodoFormProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onAdd: () => void;
};

const TodoForm = ({ input, setInput, onAdd }: TodoFormProps) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Todos!"
        value={input}
        onChange={handleInput}
        className="m-1 px-2 py-1 text-2xl border-2 rounded-md"
      />
      <button type="submit" className="m-1">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
