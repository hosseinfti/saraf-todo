# Todo Application

A fully client-side Todo List application with full CRUD functionality, built using a modern React stack. The project is designed to be modular, maintainable, and user-friendly, using localStorage for data persistence and Zustand for state management.

## Features

- Add, edit, delete todos
- Toggle completion status
- Data persistence using Zustand + localStorage
- UI built with Material UI
- Routing handled by React Router
- Fast development setup powered by Vite

## Stack

- React with TypeScript
- Zustand (with persist middleware)
- Material UI (MUI v5)
- Vite (React + TS template)
- React Router DOM

## Project Structure

```
src/
├── App.tsx
├── main.tsx
├── theme.ts
├── models/
│   └── Todo.ts
├── store/
│   └── useTodoStore.ts
├── pages/
│   ├── TodoList.tsx
│   ├── CreateTodo.tsx
│   └── EditTodo.tsx
```

## Setup & Run

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/todo-app.git
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Notes

- All data is persisted in localStorage using Zustand’s persist middleware.
- No backend required; the entire app runs in the browser.
- Easily extensible for features such as filtering, sorting, and bulk actions.
