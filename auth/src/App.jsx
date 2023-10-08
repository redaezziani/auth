
import './css/App.css'
import Register from './components/Register'
import Login from './components/login'
import Profile from './components/Profile'

import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div
    className=" w-full min-h-screen bg-white flex flex-col justify-center items-center"
    >
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
