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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoList() {
  const { todos, toggleStatus, deleteTodo, clearCompleted } = useTodoStore();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h4">Todo List</Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={() => navigate("/create")}>
          Add New
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearCompleted}
          disabled={!todos.some((t) => t.completed)}
        >
          Clear Completed
        </Button>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

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
            {filteredTodos.map((todo) => (
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
            {filteredTodos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No todos match this filter.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
