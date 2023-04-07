import { useState , useEffect } from 'react'
import './App.css'

const App = () => {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handelEditInputChange(e) {
    setCurrentTodo({ ...currentTodo , text: e.target.value })
    console.log("Current Todo " , currentTodo);
  }

  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos) /*แปลง js object เป็น string*/)

  }, [todos] /*Dependecy array */)

  function handleInputChange(e) {
    setTodo(e.target.value); // เข้าถึงค่า input แล้วจะเซฟเข้าไปใน state
  };

  function handleFormSubmit(e) {

    e.preventDefault(); //ป้องกันหน้าเว็บ refresh เวลามีการ submit form

    if (todo !== "") {
      setTodos([
        ...todos, 
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ])
    }

    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo })
  }

  function handleUpdateTodo(id, updatedTodo) {

    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);

  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  console.log(todos);

  return (
    <div className="App">
      <h1>Todo App</h1>

      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor='Edit Todo: '></label>
          <input 
          type="text"
          name='editTodo'
          placeholder='Edit todo'
          value={currentTodo.text}
          onChange={handelEditInputChange}
          />

          <button type='submit'>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            name='todo' 
            placeholder='Create a new todo' 
            value={todo}
            onChange={handleInputChange}
          />
          <button type='submit'>Add</button>
        </form>
      )}

        <ul className='todo-list'>
          {todos.map((todo) => {
            return <li key={todo.id}>
              {todo.text}
              {" "}
              <button onClick={() => handleEditClick(todo)}>Edit</button>
              <button onClick={() => handleDeleteClick(todo.id)}>X</button>
              </li>
          })}
        </ul>
      
    </div>
  )
}

export default App;
