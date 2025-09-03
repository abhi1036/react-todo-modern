import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

// ✅ Use your deployed backend URL
const API_URL = "https://todo-backend-1-n9vk.onrender.com/tasks";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend on first render
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task }),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([newTask, ...tasks]))
      .catch((err) => console.error("Error adding task:", err));

    setTask("");
  };

  // Update a task (toggle completed or edit text)
  const updateTask = (id, updatedFields) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Delete a task
  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((t) => t._id !== id)))
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "50px auto" }}>
      <h1>React To-Do App 🚀</h1>
      <TodoInput task={task} setTask={setTask} addTask={addTask} />
      <TodoList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
