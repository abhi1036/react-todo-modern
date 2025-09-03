import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://todo-backend-1-n9vk.onrender.com";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: "350px",
        margin: "50px auto",
        padding: "30px",
        background: "white",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}
    >
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "8px", backgroundColor: "#007bff", color: "white" }}>
        Login
      </button>
      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;
