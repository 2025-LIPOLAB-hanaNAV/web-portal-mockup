import { useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleHomeClick = () => {
    navigate('/portal/boards/voice-phishing')
  }

  const isHomeActive = () => {
    return location.pathname === '/portal/' || location.pathname.startsWith('/portal/boards/')
  }

  return (
    <header className="header">
      <nav className="nav-main">
        <div 
          className={`nav-item ${isHomeActive() ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          HOME
        </div>
        <div className="nav-item">게시판</div>
        <div className="nav-item">메일</div>
      </nav>
      <div className="user-controls">
        <button className="btn-icon">🔔</button>
        <button className="btn-icon">⚙️</button>
        <button className="btn-icon">☰</button>
        <span className="user-info">주간</span>
      </div>
    </header>
  )
}

export default Header