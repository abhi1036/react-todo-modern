import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    axios.post("http://localhost:5000/tasks", { text: task })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error("Error adding task:", err));
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
