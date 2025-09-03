import React from "react";
import { TextField, Button, Box } from "@mui/material";

function TodoInput({ task, setTask, addTask }) {
  return (
    <Box display="flex" gap={2} mt={2}>
      <TextField
        variant="outlined"
        label="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={addTask}>
        Add
      </Button>
    </Box>
  );
}

export default TodoInput;
