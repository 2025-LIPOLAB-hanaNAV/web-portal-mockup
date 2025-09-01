import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-main">
        <div className="nav-item active">HOME</div>
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