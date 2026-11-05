import { describe, it, expect, beforeEach } from 'vitest'
import { addTodo, editTodo, getFilteredTodos, getTaskProgress, getTodos, removeTodo, sortTodosByPriority, toggleTodo, updateTodoPriority } from './todoUtils'
import type { Todo } from './types'

// Start every test with an empty task list
beforeEach(() => {
  getTodos().forEach(todo => removeTodo(todo.id))
})

describe('addTodo', () => {
  it('adds a new task with medium priority by default', () => {
    // Act
    addTodo('Buy milk')

    // Assert
    const todos = getTodos()
    expect(todos).toHaveLength(1)
    expect(todos[0].text).toBe('Buy milk')
    expect(todos[0].completed).toBe(false)
    expect(todos[0].priority).toBe('medium')
  })

  it('trims whitespace and ignores empty tasks', () => {
    // Act
    addTodo('   Walk the dog   ')
    addTodo('     ')

    // Assert
    const todos = getTodos()
    expect(todos).toHaveLength(1)
    expect(todos[0].text).toBe('Walk the dog')
  })
})

describe('editTodo and removeTodo', () => {
  it('changes the text of a task', () => {
    // Arrange
    addTodo('Old text')
    const id = getTodos()[0].id

    // Act
    editTodo(id, 'New text')

    // Assert
    expect(getTodos()[0].text).toBe('New text')
  })

  it('removes a task from the list', () => {
    // Arrange
    addTodo('Delete me')
    const id = getTodos()[0].id

    // Act
    removeTodo(id)

    // Assert
    expect(getTodos()).toHaveLength(0)
  })
})

describe('toggleTodo and updateTodoPriority', () => {
  it('toggles the completed status', () => {
    // Arrange
    addTodo('Buy milk')
    const id = getTodos()[0].id

    // Act
    toggleTodo(id)

    // Assert
    expect(getTodos()[0].completed).toBe(true)
  })

  it('changes the priority of a task', () => {
    // Arrange
    addTodo('Pay rent', 'low')
    const id = getTodos()[0].id

    // Act
    updateTodoPriority(id, 'high')

    // Assert
    expect(getTodos()[0].priority).toBe('high')
  })
})

describe('getFilteredTodos', () => {
  it('returns only active or only completed tasks', () => {
    // Arrange
    addTodo('Active task')
    addTodo('Completed task')
    toggleTodo(getTodos()[1].id)

    // Act
    const active = getFilteredTodos('active')
    const completed = getFilteredTodos('completed')

    // Assert
    expect(active.map(todo => todo.text)).toEqual(['Active task'])
    expect(completed.map(todo => todo.text)).toEqual(['Completed task'])
    expect(getFilteredTodos('all')).toHaveLength(2)
  })
})

describe('sortTodosByPriority', () => {
  const tasks: Todo[] = [
    { id: 1, text: 'Low', completed: false, priority: 'low' },
    { id: 2, text: 'High', completed: false, priority: 'high' },
    { id: 3, text: 'Medium', completed: false, priority: 'medium' }
  ]

  it('sorts from high to low', () => {
    // Act
    const sorted = sortTodosByPriority(tasks, 'high-to-low')

    // Assert
    expect(sorted.map(todo => todo.priority)).toEqual(['high', 'medium', 'low'])
  })

  it('sorts from low to high without changing the original array', () => {
    // Act
    const sorted = sortTodosByPriority(tasks, 'low-to-high')

    // Assert
    expect(sorted.map(todo => todo.priority)).toEqual(['low', 'medium', 'high'])
    expect(tasks[0].priority).toBe('low')
  })
})

describe('getTaskProgress', () => {
  it('returns 0% when there are no tasks', () => {
    // Act
    const progress = getTaskProgress()

    // Assert
    expect(progress).toEqual({ completed: 0, total: 0, percentage: 0 })
  })

  it('calculates the percentage of completed tasks', () => {
    // Arrange
    addTodo('Task 1')
    addTodo('Task 2')
    addTodo('Task 3')
    toggleTodo(getTodos()[0].id)

    // Act
    const progress = getTaskProgress()

    // Assert
    expect(progress).toEqual({ completed: 1, total: 3, percentage: 33 })
  })
})