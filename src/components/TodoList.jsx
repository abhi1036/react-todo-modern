import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoList({ tasks, setTasks }) {
  // Toggle completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton edge="end" onClick={() => deleteTask(index)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(index)}
          />
          <ListItemText
            primary={task.text}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "gray" : "black",
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
