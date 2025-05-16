import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useTodoStore } from "../store/useTodoStore";

export default function CreateTodo() {
  const [desc, setDesc] = useState("");
  const addTodo = useTodoStore((s) => s.addTodo);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(desc);
    navigate("/");
  };

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h5">Create Todo</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
