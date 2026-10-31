import './style.css'
import { addTodo, editTodo, getTodos, removeTodo } from './todoUtils'

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement

const renderTodos = (): void => {
  todoList.innerHTML = ''

  getTodos().forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    const taskText = document.createElement('span')
    taskText.textContent = todo.text

    const editButton = document.createElement('button')
    editButton.type = 'button'
    editButton.textContent = 'Edit'
    editButton.setAttribute('aria-label', `Edit ${todo.text}`)

    const menuButton = document.createElement('button')
    menuButton.type = 'button'
    menuButton.textContent = '⋯'
    menuButton.setAttribute('aria-label', `Options for ${todo.text}`)
    menuButton.setAttribute('aria-expanded', 'false')

    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.textContent = 'Delete'
    deleteButton.hidden = true

    editButton.addEventListener('click', () => {
      const updatedText = prompt('Edit your task:', todo.text)

      if (updatedText === null || updatedText.trim() === '') return

      editTodo(todo.id, updatedText)
      renderTodos()
    })

    menuButton.addEventListener('click', () => {
      deleteButton.hidden = !deleteButton.hidden
      menuButton.setAttribute('aria-expanded', String(!deleteButton.hidden))
    })

    deleteButton.addEventListener('click', () => {
      removeTodo(todo.id)
      renderTodos()
    })

    li.append(taskText, editButton, menuButton, deleteButton)
    todoList.appendChild(li)
  })
}

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

renderTodos()