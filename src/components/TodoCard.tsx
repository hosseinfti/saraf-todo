import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  CardActions,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoCard(todo: Todo) {
  const navigate = useNavigate();
  const { toggleStatus, deleteTodo } = useTodoStore();

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {todo.description}
          </Typography>
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleStatus(todo.id)}
          />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {todo.completed ? "Completed" : "Pending"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => navigate(`/edit/${todo.id}`)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => deleteTodo(todo.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
