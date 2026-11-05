import './style.css'
import { addTodo } from './todoUtils'
import { renderTodos } from './todoUI'
import type { Priority } from './types'

// DOM elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement

// Add new task
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault()

  const text = todoInput.value.trim()

  if (text === '') {
    todoInput.classList.add('input-error')
    errorMessage.style.display = 'block'
    return
  }

  const priority = prioritySelect.value as Priority

  addTodo(text, priority)

  todoInput.value = ''
  prioritySelect.value = 'medium'
  todoInput.classList.remove('input-error')
  errorMessage.style.display = 'none'

  renderTodos()
})

// Initial render
renderTodos()