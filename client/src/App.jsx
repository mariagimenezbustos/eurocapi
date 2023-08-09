import { useState } from 'react'
import './App.css'
import Capitals from "./components/Capitals"
import AddPost from "./components/AddPost"
import Home from "./components/Home"
import { Routes, Route, Link } from "react-router-dom"
import Capital from "./components/Capital"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/capitals">Capitals</Link>
        <Link to="/addpost">Add Post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/capitals" element={<Capitals/>} />
        <Route path="/capitals/:id" element={<Capital/>} />
        <Route path="/addpost" element={<AddPost/>} />
      </Routes>
    </div>
  )
}

export default App
