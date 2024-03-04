import { Todo } from "@/src/context/active-section-context";
import React from "react";

interface TasksProps {
  task: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}

const Tasks: React.FC<TasksProps> = ({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 ">
      <div className="p-2 w-full  sm:w-1/2 ">
        <div className="bg-gray-100 flex p-4 w-full h-full border-x-gray-200 rounded-lg bg-opacity-80">
          <span
            className={`${
              task.completed
                ? "text-completed  line-through text-gray-500"
                : "text-black"
            } font-medium`}
            onClick={() => toggleComplete(task.id)}
          >
            {task.task}
          </span>
          <svg
            className="h-8 w-8 text-black-500"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => editTodo(task.id)}
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
          <svg
            className="h-8 w-8 text-black-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => deleteTodo(task.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
