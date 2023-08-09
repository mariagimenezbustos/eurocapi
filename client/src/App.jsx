import { useState } from 'react'
import './App.css'
import Capitals from "./components/Capitals"
import AddPost from "./components/AddPost"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="navbar">
        <img href="" className="logoNavbar" />
        <a>HOME</a>
        <a>CAPITALS</a>
        <a>ADD POST</a>
      </nav>
    </div>
  )
}

export default App
