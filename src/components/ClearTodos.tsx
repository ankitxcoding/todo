type ClearTodosProps = {
  onClear: () => void;
};

const ClearTodos = ({ onClear }: ClearTodosProps) => {
  return (
    <button onClick={() => onClear()} className="m-4">
      Clear
    </button>
  );
};

export default ClearTodos;
