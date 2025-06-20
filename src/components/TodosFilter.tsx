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
    <div className="flex justify-between w-1/2 m-auto">
      <button className="my-4" onClick={() => handleFilterChange("all")}>
        All
      </button>
      <button className="my-4" onClick={() => handleFilterChange("completed")}>
        Completed
      </button>
      <button
        className="my-4"
        onClick={() => handleFilterChange("notCompleted")}
      >
        Not Completed
      </button>
    </div>
  );
};

export default TodosFilter;
