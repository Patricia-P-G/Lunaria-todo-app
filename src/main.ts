import './style.css'

interface Todo{
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = []

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement

const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  }
  todos.push(newTodo);
  console.log('Todo added:', newTodo)
  renderTodos()
}

const renderTodos = (): void =>{
  // clear the current lsit - test later
  todoList.innerHTML = '';

  todos.forEach(todo =>{
    const li = document.createElement('li')
    li.className ='todo-item'
    li.innerHTML = `
      <span>${todo.text}</span>
      <button>Remove</button>   
    `
    addRemoveButtonListener(li, todo.id)
    todoList.appendChild(li)
  })
}

renderTodos();


const errorMessage = document.getElementById('error-message') as HTMLParagraphElement

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); 
  const text = todoInput.value.trim(); 

  if (text !== '') { 
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none'; 
    addTodo(text);
    todoInput.value = ''; 
  } else {
    console.log("Please enter a todo item");
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

const addRemoveButtonListener = (li: HTMLLIElement, id: number): void =>{
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id))

}

const removeTodo = (id:number):void =>{
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}