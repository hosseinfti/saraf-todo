import { Routes, Route } from "react-router-dom";
import EditTodo from "./pages/EditTodo";
import TodoList from "./pages/TodoList";
import CreateTodo from "./pages/CreateTodo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/create" element={<CreateTodo />} />
      <Route path="/edit/:id" element={<EditTodo />} />
    </Routes>
  );
}
