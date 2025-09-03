import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://todo-backend-1-n9vk.onrender.com";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.message === "User registered successfully") {
        alert("Registered! You can login now.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
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
      <h2>Register</h2>
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
      <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "8px", backgroundColor: "#28a745", color: "white" }}>
        Register
      </button>
      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register;
