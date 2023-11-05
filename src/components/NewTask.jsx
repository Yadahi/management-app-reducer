import { useContext, useState } from "react";
import { ManagementContext } from "../store/management-app-store";

const NewTask = () => {
  const [enteredTask, setEnteredTask] = useState("");
  const { addTask } = useContext(ManagementContext);

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === "") {
      return;
    }
    addTask(enteredTask);
    setEnteredTask("");
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
};
export default NewTask;
