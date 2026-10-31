import type { Todo, Priority } from './types'

export type TaskFilter = 'all' | 'active' | 'completed'
export type SortOrder = 'high-to-low' | 'low-to-high'

const STORAGE_KEY = 'lunaria-todos'

// Load saved tasks
const loadTodos = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY)

    if (!storedTodos) return []

    const parsed: unknown = JSON.parse(storedTodos)

    if (!Array.isArray(parsed)) return []

    return parsed.filter((todo): todo is Todo => {
      if (typeof todo !== 'object' || todo === null) return false

      const task = todo as Record<string, unknown>

      return (
        typeof task.id === 'number' &&
        Number.isSafeInteger(task.id) &&
        task.id > 0 &&
        typeof task.text === 'string' &&
        task.text.trim().length > 0 &&
        typeof task.completed === 'boolean' &&
        (task.priority === 'high' ||
          task.priority === 'medium' ||
          task.priority === 'low')
      )
    })
  } catch {
    return []
  }
}

let todos: Todo[] = loadTodos()
let nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1

// Save tasks
const saveTodos = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // Keep the application usable if storage is unavailable
  }
}

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
  saveTodos()
}

export const editTodo = (id: number, text: string): void => {
  const trimmedText = text.trim()

  if (!trimmedText) return

  const todo = todos.find(todo => todo.id === id)

  if (!todo) return

  todo.text = trimmedText
  saveTodos()
}

export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id)
  saveTodos()
}

// Toggle task completion
export const toggleTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return

  todo.completed = !todo.completed
  saveTodos()
}

// Update task priority
export const updateTodoPriority = (id: number, priority: Priority): void => {
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return

  todo.priority = priority
  saveTodos()
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

// Sort tasks by priority
export const sortTodosByPriority = (
  todos: Todo[],
  order: SortOrder = 'high-to-low'
): Todo[] => {
  const priorityOrder: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1
  }

  return [...todos].sort((a, b) => {
    const difference = priorityOrder[a.priority] - priorityOrder[b.priority]

    return order === 'high-to-low' ? -difference : difference
  })
}

// Calculate task completion progress
export const getTaskProgress = (): {
  completed: number
  total: number
  percentage: number
} => {
  const todos = getTodos()

  const total = todos.length
  const completed = todos.filter(todo => todo.completed).length

  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100)

  return {
    completed,
    total,
    percentage
  }
}