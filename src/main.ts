import './style.css'
import { addTodo } from './todoUtils'
import { renderTodos, setTaskFilter, setSortOrder } from './todoUI'
import type { Priority } from './types'
import type { TaskFilter, SortOrder } from './todoUtils'

// DOM elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement
const sortSelect = document.getElementById('sort-select') as HTMLSelectElement

// Show validation error
const showValidationError = (): void => {
  todoInput.classList.add('input-error')
  errorMessage.textContent = 'Please enter a valid task name'
  errorMessage.style.display = 'block'
}

// Clear validation error
const clearValidationError = (): void => {
  todoInput.classList.remove('input-error')
  errorMessage.style.display = 'none'
}

// Validate task input
todoInput.addEventListener('input', () => {
  if (todoInput.value.trim() !== '') {
    clearValidationError()
  }
})

// Add new task
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault()

  const text = todoInput.value.trim()

  if (text === '') {
    showValidationError()
    return
  }

  const priority = prioritySelect.value as Priority

  addTodo(text, priority)

  todoInput.value = ''
  prioritySelect.value = 'medium'
  clearValidationError()

  renderTodos()
})

// Task filtering
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-button')

filterButtons.forEach(button => {
  button.setAttribute('aria-pressed', String(button.dataset.filter === 'all'))

  button.addEventListener('click', () => {
    const filter = button.dataset.filter as TaskFilter

    filterButtons.forEach(btn => {
      const isActive = btn === button

      btn.classList.toggle('active', isActive)
      btn.setAttribute('aria-pressed', String(isActive))
    })

    setTaskFilter(filter)
  })
})

// Task sorting
sortSelect.addEventListener('change', () => {
  const order = sortSelect.value as SortOrder
  setSortOrder(order)
})

// Initial render
renderTodos()