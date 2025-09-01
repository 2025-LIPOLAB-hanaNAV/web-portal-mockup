import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BulletinBoard from './components/BulletinBoard'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <BulletinBoard />
      </div>
    </div>
  )
}

export default App
