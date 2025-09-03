import React, { useState } from "react";

function TodoList({ tasks, updateTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditingText(task.text);
  };

  const saveEdit = (id) => {
    updateTask(id, { text: editingText });
    setEditingId(null);
    setEditingText("");
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTask(task._id, { completed: !task.completed })}
            style={{ marginRight: "10px" }}
          />
          {editingId === task._id ? (
            <input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              style={{ flex: 1, padding: "5px" }}
            />
          ) : (
            <span style={{ flex: 1, textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </span>
          )}

          {editingId === task._id ? (
            <button onClick={() => saveEdit(task._id)} style={{ marginLeft: "10px" }}>
              Save
            </button>
          ) : (
            <button onClick={() => startEditing(task)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
          )}
          <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
