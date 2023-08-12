import "./App.css"
import Capitals from "./components/Capitals"
import AddPost from "./components/AddPost"
import Home from "./components/Home"
import { Routes, Route, Link } from "react-router-dom"
import Capital from "./components/Capital"

function App() {

  return (
    <div>
      <nav className="navbar">
        <div>
          <Link to="/">Home</Link>
        </div>
        
        <div>
          <Link to="/capitals">Capitals</Link>
        </div>

        <div>
          <Link to="/addpost">Add Post</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/capitals" element={<Capitals/>} />
        <Route path="/capitals/:id" element={<Capital/>} />
        <Route path="/addpost" element={<AddPost/>} />
      </Routes>
      <footer>
        <p>Eurocapi, 2023.</p>
      </footer>
    </div>
  )
}

export default App
