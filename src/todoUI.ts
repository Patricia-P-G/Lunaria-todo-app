import editIcon from './assets/icons/edit-icon.svg'
import editHoverIcon from './assets/icons/edit-hover-icon.svg'
import deleteIcon from './assets/icons/delete-icon.svg'
import deleteHoverIcon from './assets/icons/delete-hover-icon.svg'

import { editTodo, getFilteredTodos, getTaskProgress, removeTodo, toggleTodo, updateTodoPriority, sortTodosByPriority } from './todoUtils'
import type { TaskFilter, SortOrder } from './todoUtils'
import type { Priority } from './types'

// Current task filter
let currentFilter: TaskFilter = 'all'

// Current sorting order
let currentSortOrder: SortOrder = 'high-to-low'

// Change sorting order
export const setSortOrder = (order: SortOrder): void => {
  currentSortOrder = order
  renderTodos()
}

// Update filter counts
const updateFilterCounts = (): void => {
  const allCount = getFilteredTodos('all').length
  const activeCount = getFilteredTodos('active').length
  const completedCount = getFilteredTodos('completed').length

  const counts = {
    all: allCount,
    active: activeCount,
    completed: completedCount
  }

  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-button')

  filterButtons.forEach(button => {
    const filter = button.dataset.filter as TaskFilter
    const label = filter.charAt(0).toUpperCase() + filter.slice(1)

    button.textContent = `${label} (${counts[filter]})`
  })
}

// Update task completion progress
const updateTaskProgress = (): void => {
  const { completed, total, percentage } = getTaskProgress()

  const progressCount = document.getElementById('progress-count') as HTMLSpanElement
  const progressPercentage = document.getElementById('progress-percentage') as HTMLParagraphElement
  const progressBar = document.getElementById('progress-bar') as HTMLDivElement
  const progressFill = document.getElementById('progress-fill') as HTMLDivElement

  progressCount.textContent = `${completed} of ${total} completed`
  progressPercentage.textContent = `${percentage}%`
  progressFill.style.width = `${percentage}%`
  progressBar.setAttribute('aria-valuenow', String(percentage))
}

// Change task filter
export const setTaskFilter = (filter: TaskFilter): void => {
  currentFilter = filter
  renderTodos()
}

// Render tasks
export const renderTodos = (): void => {
  const todoList = document.getElementById('todo-list') as HTMLUListElement

  updateFilterCounts()
  updateTaskProgress()

  todoList.innerHTML = ''

  // Filter and sort tasks
  const filteredTodos = getFilteredTodos(currentFilter)
  const sortedTodos = sortTodosByPriority(filteredTodos, currentSortOrder)

  sortedTodos.forEach(todo => {
    // Task item
    const li = document.createElement('li')
    li.className = 'todo-item'

    // Task completion checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'todo-checkbox'
    checkbox.checked = todo.completed
    checkbox.setAttribute('aria-label', `Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`)

    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id)
      renderTodos()
    })

    const taskText = document.createElement('span')
    taskText.textContent = todo.text

    if (todo.completed) {
      taskText.classList.add('completed')
    }

    // Task priority dropdown
    const prioritySelect = document.createElement('select')
    prioritySelect.className = 'todo-priority'
    prioritySelect.setAttribute('aria-label', `Priority for ${todo.text}`)

    const priorities: Priority[] = ['high', 'medium', 'low']

    priorities.forEach(priority => {
      const option = document.createElement('option')
      option.value = priority
      option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1)
      prioritySelect.appendChild(option)
    })

    prioritySelect.value = todo.priority
    prioritySelect.classList.add(`priority-${todo.priority}`)

    prioritySelect.addEventListener('change', () => {
      updateTodoPriority(todo.id, prioritySelect.value as Priority)
      renderTodos()
    })

    // Edit button
    const editButton = document.createElement('button')
    editButton.type = 'button'
    editButton.className = 'edit-button'

    const editIconImage = document.createElement('img')
    editIconImage.src = editIcon
    editIconImage.className = 'edit-icon'

    const editHoverImage = document.createElement('img')
    editHoverImage.src = editHoverIcon
    editHoverImage.className = 'edit-hover-icon'

    editButton.append(editIconImage, editHoverImage)

    // Delete button
    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.className = 'delete-button'

    const deleteIconImage = document.createElement('img')
    deleteIconImage.src = deleteIcon
    deleteIconImage.className = 'delete-icon'

    const deleteHoverImage = document.createElement('img')
    deleteHoverImage.src = deleteHoverIcon
    deleteHoverImage.className = 'delete-hover-icon'

    deleteButton.append(deleteIconImage, deleteHoverImage)

    // Edit task
    editButton.addEventListener('click', () => {
      const editInput = document.createElement('input')
      editInput.type = 'text'
      editInput.value = todo.text
      editInput.className = 'todo-edit-input'

      const saveButton = document.createElement('button')
      saveButton.type = 'button'
      saveButton.textContent = 'Save'
      saveButton.className = 'save-button'

      const cancelButton = document.createElement('button')
      cancelButton.type = 'button'
      cancelButton.textContent = 'Cancel'
      cancelButton.className = 'cancel-button'

      // Edit validation message
      const editError = document.createElement('p')
      editError.className = 'edit-error-message'
      editError.textContent = 'Please enter a valid task name'
      editError.style.display = 'none'

      // Save edited task
      const saveEdit = (): void => {
        const updatedText = editInput.value.trim()

        if (updatedText === '') {
          editInput.classList.add('input-error')
          editError.style.display = 'block'
          editInput.focus()
          return
        }

        editTodo(todo.id, updatedText)
        renderTodos()
      }

      saveButton.addEventListener('click', saveEdit)

      cancelButton.addEventListener('click', () => {
        renderTodos()
      })

      // Clear edit validation
      editInput.addEventListener('input', () => {
        if (editInput.value.trim() !== '') {
          editInput.classList.remove('input-error')
          editError.style.display = 'none'
        }
      })

      editInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          saveEdit()
        }

        if (event.key === 'Escape') {
          renderTodos()
        }
      })

      // Show edit input
      taskText.replaceWith(editInput)
      editButton.replaceWith(saveButton)
      deleteButton.hidden = true
      checkbox.disabled = true
      prioritySelect.disabled = true
      li.appendChild(cancelButton)
      li.appendChild(editError)

      editInput.focus()
      editInput.select()
    })

    // Delete task
    deleteButton.addEventListener('click', () => {
      removeTodo(todo.id)
      renderTodos()
    })

    li.append(checkbox, taskText, prioritySelect, editButton, deleteButton)
    todoList.appendChild(li)
  })
}