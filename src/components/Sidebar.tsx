import './Sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">전체 게시판</div>
        <div className="sidebar-item">공지게시판</div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">지킴이</div>
        <div className="sidebar-item active">보이스피싱 지킴이</div>
        <div className="sidebar-item">전기통신금융사기대응TF</div>
        <div className="sidebar-item">전기금융사기</div>
        <div className="sidebar-item">전자금융사고</div>
        <div className="sidebar-item">기타</div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">수신</div>
        <div className="sidebar-item">예금상품관리</div>
        <div className="sidebar-item">이자관리</div>
        <div className="sidebar-item">고객관리</div>
        <div className="sidebar-item">영업점관리</div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">여신</div>
        <div className="sidebar-item">대출상품관리</div>
        <div className="sidebar-item">심사관리</div>
        <div className="sidebar-item">리스크관리</div>
        <div className="sidebar-item">여신한도관리</div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">외환</div>
        <div className="sidebar-item">환율관리</div>
        <div className="sidebar-item">송금업무</div>
        <div className="sidebar-item">신용장업무</div>
        <div className="sidebar-item">외화예금</div>
      </div>
    </aside>
  )
}

export default Sidebar