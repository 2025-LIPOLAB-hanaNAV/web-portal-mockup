import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import VoicePhishingBoard from './components/boards/VoicePhishingBoard'
import NoticeBoard from './components/boards/NoticeBoard'
import DepositBoard from './components/boards/DepositBoard'
import PostDetail from './components/PostDetail'

function PortalApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <Routes>
          {/* 포털 메인 경로 */}
          <Route path="/" element={<Navigate to="boards/voice-phishing" replace />} />

          {/* 게시판 라우트 */}
          <Route path="boards/notice" element={<NoticeBoard />} />
          <Route path="boards/voice-phishing" element={<VoicePhishingBoard />} />
          <Route path="boards/deposit" element={<DepositBoard />} />

          {/* 게시글 상세 라우트 */}
          <Route path="boards/:boardType/posts/:postId" element={<PostDetail />} />

          {/* 홈 경로도 보이스피싱으로 */}
          <Route path="home" element={<Navigate to="boards/voice-phishing" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 랜딩 페이지 */}
        <Route path="/" element={<LandingPage />} />

        {/* 포털 라우트 */}
        <Route path="/portal/*" element={<PortalApp />} />
      </Routes>
    </Router>
  )
}

export default App