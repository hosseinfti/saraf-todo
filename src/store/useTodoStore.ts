import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { Todo } from '../models/todo'

interface TodoStore {
  todos: Todo[]
  addTodo: (desc: string) => void
  updateTodo: (updated: Todo) => void
  deleteTodo: (id: string) => void
  toggleStatus: (id: string) => void
  clearCompleted: () => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (desc) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: uuid(),
              description: desc,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        })),
      updateTodo: (updated) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === updated.id ? updated : t)),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      toggleStatus: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
        clearCompleted: () =>
            set((state) => ({
              todos: state.todos.filter((t) => !t.completed),
            })),
    }),
    {
      name: 'todos-storage',
    }
  )
)
