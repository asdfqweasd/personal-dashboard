import React, { useCallback, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./taskForm";
import Tasks from "./tasks";
import EditTask from "./editTask";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
};

type TodoAction =
  | { type: "init"; payload: Todo[] }
  | { type: "add"; payload: Todo }
  | { type: "update"; payload: { id: string; updates: Partial<Todo> } }
  | { type: "delete"; payload: string };

const todoReducer = (state: Todo[], action: TodoAction) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    case "update":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TaskWrapper = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    dispatch({ type: "init", payload: storedTodos });
  }, []);

  const addTodo = (task: string) => {
    const newTodo = { id: uuidv4(), task, completed: false, isEditing: false };
    dispatch({ type: "add", payload: newTodo });
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const updateTodo = useCallback(
    (id: string, updates: Partial<Todo>) => {
      dispatch({ type: "update", payload: { id, updates } });
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      dispatch({ type: "delete", payload: id });
      const newTodos = todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    [todos]
  );

  const editTask = useCallback(
    (task: string, id: string) => {
      updateTodo(id, {
        task,
        isEditing: !todos.find((todo) => todo.id === id)?.isEditing,
      });
    },
    [todos, updateTodo]
  );

  return (
    <div className="bg-secondary mt-20 p-8 rounded ">
      <h1 className="text-black mb-2 text-2xl text-center ">
        Get Things Done!
      </h1>
      <TaskForm addTodo={addTodo} />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.isEditing ? (
            <EditTask editTodo={editTask} task={todo} />
          ) : (
            <Tasks
              task={todo}
              toggleComplete={() =>
                updateTodo(todo.id, { completed: !todo.completed })
              }
              deleteTodo={() => deleteTodo(todo.id)}
              editTodo={() =>
                updateTodo(todo.id, { isEditing: !todo.isEditing })
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskWrapper;
