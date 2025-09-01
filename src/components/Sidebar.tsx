import './Sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">전체 게시판</div>
        <div className="sidebar-item active">공지게시판</div>
        <div className="sidebar-item">작은 게시물</div>
        <div className="sidebar-item">많은 게시물</div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">지킴이</div>
        <div className="sidebar-item">모든곳</div>
        <div className="sidebar-item">오늘만</div>
        <div className="sidebar-item">새로운것</div>
        <div className="sidebar-item expanded">🔽 보이스피싱 지킴이</div>
        <div className="sidebar-item">전기통신금융사기대응TF</div>
        <div className="sidebar-item">기타</div>
        <div className="sidebar-item">기타</div>
        <div className="sidebar-item">기타</div>
        <div className="sidebar-item">기타</div>
        <div className="sidebar-item">보이스피싱지킴이</div>
        <div className="sidebar-item">전기통신금융사기대응TF</div>
        <div className="sidebar-item">전기금융사기</div>
        <div className="sidebar-item">전자금융사고</div>
        <div className="sidebar-item">기타</div>
        <div className="sidebar-item">기타</div>
      </div>
    </aside>
  )
}

export default Sidebar