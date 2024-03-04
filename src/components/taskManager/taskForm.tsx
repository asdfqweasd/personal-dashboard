import React, { useState } from "react";

interface TaskFormProps {
  addTodo: (task: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form
      className="inset-y-0 start-0 flex items-center ps-3 "
      onSubmit={handlerSubmit}
    >
      <input
        type="text"
        className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="What is the task today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
