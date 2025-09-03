import React, { useState } from "react";

function TodoInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", marginBottom: "20px" }}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add new task..."
        style={{ flex: 1, padding: "10px", borderRadius: "8px 0 0 8px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "10px 15px", borderRadius: "0 8px 8px 0", border: "none", backgroundColor: "#007bff", color: "white" }}>
        Add
      </button>
    </form>
  );
}

export default TodoInput;
