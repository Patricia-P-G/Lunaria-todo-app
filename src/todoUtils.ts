import type { Todo } from './types'

let todos: Todo[] = []
let nextId = 1

export const getTodos = (): Todo[] => {
  return todos.map(todo => ({ ...todo }))
}

export const addTodo = (text: string): void => {
  const trimmedText = text.trim()

  if (!trimmedText) return

  const newTodo: Todo = {
    id: nextId++,
    text: trimmedText,
    completed: false
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