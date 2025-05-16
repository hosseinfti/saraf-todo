import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTodoStore } from "../store/useTodoStore";
import type { Todo } from "../models/todo";

export default function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useTodoStore((s) => s.todos);
  const updateTodo = useTodoStore((s) => s.updateTodo);

  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const found = todos.find((t) => t.id === id);
    if (found) setTodo(found);
  }, [id, todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    updateTodo(todo);
    navigate("/");
  };

  if (!todo) return <Typography sx={{ p: 4 }}>Todo not found</Typography>;

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h5">Edit Todo</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Description"
            fullWidth
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={todo.completed}
                onChange={(e) =>
                  setTodo({ ...todo, completed: e.target.checked })
                }
              />
            }
            label="Completed"
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
