import React from "react";

function TodoList({ tasks, setTasks }) {
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((t, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
            textDecoration: t.completed ? "line-through" : "none",
            color: t.completed ? "#888" : "#000",
          }}
        >
          <span>{t.text}</span>
          <div>
            <button
              onClick={() => toggleComplete(index)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            >
              {t.completed ? "✔️" : "✅"}
            </button>
            <button onClick={() => deleteTask(index)} style={{ cursor: "pointer" }}>
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
