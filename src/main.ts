import './style.css'
import { addTodo } from './todoUtils'
import { renderTodos } from './todoUI'

// DOM elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
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

  addTodo(text)
  todoInput.value = ''
  todoInput.classList.remove('input-error')
  errorMessage.style.display = 'none'

  renderTodos()
})

// Initial render
renderTodos()