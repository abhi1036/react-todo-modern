import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const API_URL = "https://todo-backend-1-n9vk.onrender.com";

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/tasks`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, [token]);

  const addTask = (text) => {
    if (!text) return;
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([newTask, ...tasks]))
      .catch((err) => console.error(err));
  };

  const updateTask = (id, updatedFields) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => res.json())
      .then((updatedTask) =>
        setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)))
      )
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    })
      .then(() => setTasks(tasks.filter((t) => t._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
  };

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div style={{ textAlign: "center", maxWidth: "500px", margin: "50px auto" }}>
        <h1>React To-Do App 🚀</h1>
        <button
          onClick={handleLogout}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
        <TodoInput addTask={addTask} />
        <TodoList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
    </Router>
  );
}

export default App;
