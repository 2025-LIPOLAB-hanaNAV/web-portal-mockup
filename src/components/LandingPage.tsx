import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigation = (route: 'portal' | 'chatbot') => {
    if (route === 'portal') {
      navigate('/portal')
    } else if (route === 'chatbot') {
      window.open('http://localhost:8080', '_blank')
    }
  }

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="navi-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" className="logo-svg">
              <path
                d="M8 8 L32 8 L32 32 L8 32 Z"
                fill="#8B5CF6"
                opacity="0.2"
              />
              <path
                d="M12 16 L28 16 M12 20 L28 20 M12 24 L20 24"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="26" cy="24" r="2" fill="#8B5CF6" />
            </svg>
          </div>
          <div className="logo-text">
            <h1>하나 NAVI</h1>
            <p>정보 탐색 길을 안내</p>
          </div>
        </div>

        <div className="welcome-section">
          <h2>어디로 떠나시겠어요?</h2>
          <p>하나은행 직원만을 위한 스마트 정보 검색 시스템입니다.</p>
          <p>당신의 여정에 함께할게요.</p>
        </div>

        <div className="navigation-cards">
          <div
            className="nav-card portal-card"
            onClick={() => handleNavigation('portal')}
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24" className="card-svg">
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <polyline
                  points="9,22 9,12 15,12 15,22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3>그룹 포털 구경하기</h3>
            <p>다양한 게시판과 공지사항을 확인해보세요</p>
            <div className="card-footer">
              <span className="port-info">포트: 80</span>
            </div>
          </div>

          <div
            className="nav-card chatbot-card"
            onClick={() => handleNavigation('chatbot')}
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24" className="card-svg">
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
              </svg>
            </div>
            <h3>챗봇과 상담하기</h3>
            <p>AI가 도와드리는 스마트한 검색 서비스</p>
            <div className="card-footer">
              <span className="port-info">포트: 8080</span>
            </div>
          </div>
        </div>

        {/* <div className="footer-info">
          <p>→ 한기 전용</p>
        </div> */}
      </div>
    </div>
  )
}

export default LandingPage