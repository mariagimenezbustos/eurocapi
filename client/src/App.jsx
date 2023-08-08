import { useState } from 'react'
import './App.css'
import Capitals from "./components/Capitals"
import AddPost from "./components/AddPost"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className='navbar'>
        <a>HOME</a>
        <a>CAPITALS</a>
        <a>ADD POST</a>
      </nav>

      <div className='main'>
        <h1>WELCOME TO EUROCAPI</h1>
        <p>Text here</p>
        <nav>
          <a>Go to Capitals</a>
        </nav>
      </div>
      
    </div>
  )
}

export default App
