import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Todocard from "./Components/to-do-list/Todocard"

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState("")

  const addtask = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const newTask = { id: Date.now(), text: trimmed, completed: false }
    setTasks((prev) => [...prev, newTask])
    setText("")
  }

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id !== id ? t : { ...t, completed: !t.completed })))
  }

  const deletetask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <form onSubmit={addtask} className="task-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter your task"
          aria-label="task"
        />
        <button type="submit">add</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && <li className="no-task">no task yet</li>}
        {tasks.map((task) => (
          <li key={task.id} className="task-name">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span onClick={() => toggleTask(task.id)} className={task.completed ? "done" : ""}>
              {task.text}
            </span>
            <button onClick={() => deletetask(task.id)}>delete</button>
          </li>
        ))}
      </ul>

      
    </div>
  )
}

export default App
