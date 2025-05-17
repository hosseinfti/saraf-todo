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
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";
import TodoCard from "../components/TodoCard";

export default function TodoList() {
  const { todos, toggleStatus, deleteTodo, clearCompleted } = useTodoStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort, setSort] = useState<"created" | "alpha">("created");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === "created") return b.createdAt - a.createdAt;
    return a.description.localeCompare(b.description);
  });

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h4">Todo List</Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack
            width={"100%"}
            height={"100%"}
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            <Button
              sx={{ flex: 1, height: "100%" }}
              variant="contained"
              onClick={() => navigate("/create")}
            >
              Add New
            </Button>
            <Button
              sx={{ flex: 1, height: "100%" }}
              variant="outlined"
              color="secondary"
              onClick={clearCompleted}
              disabled={!todos.some((t) => t.completed)}
            >
              Clear Completed
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack
            width={"100%"}
            direction="row"
            spacing={{ xs: 0, sm: 2 }}
            gap={{ xs: 3, sm: 0 }}
            flexWrap="wrap"
          >
            <FormControl sx={{ flex: 1 }}>
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
            <FormControl sx={{ flex: 1 }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                label="Sort by"
                onChange={(e) => setSort(e.target.value as any)}
              >
                <MenuItem value="created">Creation Date</MenuItem>
                <MenuItem value="alpha">Alphabetical</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      {isMobile ? (
        <Stack spacing={2}>
          {sortedTodos.map((todo) => (
            <TodoCard key={todo.id} {...todo} />
          ))}
        </Stack>
      ) : (
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
              {sortedTodos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell>
                    {todo.completed ? "✅ Done" : "⏳ Pending"}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
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
      )}
    </Stack>
  );
}
