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
    <form onSubmit={handleSubmit} className="px-4">
      <input
        type="text"
        placeholder="Enter Todos!"
        value={input}
        onChange={handleInput}
        className="m-1 px-2 py-1 text-lg md:text-2xl border-2 rounded-md w-full sm:w-auto"
      />
      <button type="submit" className="m-1 text-base">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
