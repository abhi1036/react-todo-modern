import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on first render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTasks = [...tasks, { text: task, completed: false }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTask("");
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "50px auto" }}>
      <h1>React To-Do App 🚀</h1>
      <TodoInput task={task} setTask={setTask} addTask={addTask} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
