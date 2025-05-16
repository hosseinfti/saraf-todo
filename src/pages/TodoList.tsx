import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const toggleStatus = useTodoStore((s) => s.toggleStatus);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h4">Todo List</Typography>
      <Button variant="contained" onClick={() => navigate("/create")}>
        ➕ Add New
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  {todo.completed ? "✅ Done" : "⏳ Pending"}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button onClick={() => toggleStatus(todo.id)}>
                      Toggle
                    </Button>
                    <Button onClick={() => navigate(`/edit/${todo.id}`)}>
                      Edit
                    </Button>
                    <Button color="error" onClick={() => deleteTodo(todo.id)}>
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {todos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No todos yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
