import React, { useEffect, useState } from "react";
import TaskForm from "./taskForm";
import { v4 as uuidv4 } from "uuid";
import Tasks from "./tasks";
uuidv4();
import { Todo } from "@/src/context/active-section-context";
import EditTask from "./editTask";
const TaskWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // read todos from localstorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(storedTodos);
  }, []);

  const addTodo = (task: string) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task, completed: false, isEditing: false },
    ]);
    // todos update save to the localstorage

    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id: string) =>
    setTodos(todos.filter((todo) => todo.id !== id));
  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  return (
    <div className="bg-secondary mt-20 p-8 rounded">
      <h1 className="text-black mb-2 text-2xl">Get Things Done !</h1>
      <TaskForm addTodo={addTodo} />
      {/* display tasks */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTask editTodo={editTask} task={todo} />
        ) : (
          <Tasks
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TaskWrapper;
