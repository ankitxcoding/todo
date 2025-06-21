import type { Dispatch, SetStateAction } from "react";

type TodosFilterProps = {
  setFilterStatus: Dispatch<
    SetStateAction<"all" | "completed" | "notCompleted">
  >;
};

const TodosFilter = ({ setFilterStatus }: TodosFilterProps) => {
  const handleFilterChange = (status: "all" | "completed" | "notCompleted") => {
    setFilterStatus(status);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between w-full md:w-4/5 lg:w-1/2 m-auto px-4">
      <button
        className="my-2 sm:my-4 text-base"
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className="my-2 sm:my-4 text-base"
        onClick={() => handleFilterChange("completed")}
      >
        Completed
      </button>
      <button
        className="my-2 sm:my-4 text-base"
        onClick={() => handleFilterChange("notCompleted")}
      >
        Not Completed
      </button>
    </div>
  );
};

export default TodosFilter;
