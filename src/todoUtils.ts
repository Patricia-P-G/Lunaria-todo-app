import type { Todo, Priority } from './types'
export type TaskFilter = 'all' | 'active' | 'completed'

let todos: Todo[] = []
let nextId = 1

export const getTodos = (): Todo[] => {
  return todos.map(todo => ({ ...todo }))
}

export const addTodo = (
  text: string,
  priority: Priority = 'medium'
): void => {
  const trimmedText = text.trim()

  if (!trimmedText) return

  const newTodo: Todo = {
    id: nextId++,
    text: trimmedText,
    completed: false,
    priority
  }

  todos.push(newTodo)
}

export const editTodo = (id: number, text: string): void => {
  const trimmedText = text.trim()

  if (!trimmedText) return

  const todo = todos.find(todo => todo.id === id)

  if (!todo) return

  todo.text = trimmedText
}

export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id)
}

// Toggle task completion
export const toggleTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return

  todo.completed = !todo.completed
}

// Update task priority
export const updateTodoPriority = (id: number, priority: Priority): void => {
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return

  todo.priority = priority
}

// Filter tasks by completion status
export const getFilteredTodos = (filter: TaskFilter): Todo[] => {
  const todos = getTodos()

  if (filter === 'active') {
    return todos.filter(todo => !todo.completed)
  }

  if (filter === 'completed') {
    return todos.filter(todo => todo.completed)
  }

  return todos
}