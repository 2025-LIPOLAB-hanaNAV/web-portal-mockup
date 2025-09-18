import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getChatbotUrl } from '../config/api'
import './LandingPage.css'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleNavigation = (route: 'portal' | 'chatbot') => {
    if (route === 'portal') {
      navigate('/portal')
    } else if (route === 'chatbot') {
      window.open(getChatbotUrl(), '_blank')
    }
  }

  return (
    <div className="landing-page">
      <div className="ocean-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div key={i} className={`star star-${i % 5 + 1}`} />
        ))}
      </div>
      <div
        ref={containerRef}
        className="landing-container"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`
        }}
      >
        <div className="navi-logo">
          <div className="logo-icon compass">
            <svg viewBox="0 0 40 40" className="logo-svg compass-svg">
              {/* 나침반 외곽 */}
              <circle cx="20" cy="20" r="18" fill="none" stroke="#8B5CF6" strokeWidth="2" />
              <circle cx="20" cy="20" r="15" fill="none" stroke="#A855F7" strokeWidth="1" opacity="0.5" />

              {/* 나침반 방향 표시 */}
              <g className="compass-needle">
                <path d="M20 5 L22 18 L20 20 L18 18 Z" fill="#EF4444" />
                <path d="M20 35 L18 22 L20 20 L22 22 Z" fill="#6B7280" />
              </g>

              {/* 중심점 */}
              <circle cx="20" cy="20" r="2" fill="#8B5CF6" />

              {/* 방향 표시 */}
              <text x="20" y="8" textAnchor="middle" fontSize="8" fill="#8B5CF6" fontWeight="bold">N</text>
              <text x="32" y="22" textAnchor="middle" fontSize="6" fill="#A855F7">E</text>
              <text x="20" y="34" textAnchor="middle" fontSize="6" fill="#A855F7">S</text>
              <text x="8" y="22" textAnchor="middle" fontSize="6" fill="#A855F7">W</text>
            </svg>
          </div>
          <div className="logo-text">
            <h1>하나 NAVI</h1>
            <p>하나NAVI와 쉽고 빠르게 검색하세요</p>
          </div>
        </div>

        <div className="welcome-section">
          <h2 className="nautical-title">
            <span className="anchor-icon">⚓</span>
            어디로 항해하시겠어요?
            <span className="anchor-icon">⚓</span>
          </h2>
          <p className="ship-message">🚢 하나은행 직원만을 위한 스마트 정보 검색 시스템입니다.</p>
          <p className="journey-message">✨ 당신의 정보 탐험 여정에 함께할게요. ✨</p>
        </div>

        <div className="navigation-cards">
          <div
            className="nav-card portal-card sailing-card"
            onClick={() => handleNavigation('portal')}
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24" className="card-svg">
                {/* 등대 아이콘 */}
                <path
                  d="M12 2 L12 8 M8 8 L16 8 L15 12 L13 12 L13 22 L11 22 L11 12 L9 12 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="5" r="2" fill="currentColor" opacity="0.7" />
                <path d="M6 22 L18 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3>🏝️ 그룹 포털 목업 방문하기</h3>
            <p>그룹 포털의 구조를 그대로 본뜬 페이지입니다</p>
            <div className="sailing-waves">
              <div className="mini-wave"></div>
              <div className="mini-wave"></div>
              <div className="mini-wave"></div>
            </div>
            <div className="card-footer">
              <span className="port-info">⚓ 포트: 80</span>
            </div>
          </div>

          <div
            className="nav-card chatbot-card sailing-card"
            onClick={() => handleNavigation('chatbot')}
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24" className="card-svg">
                {/* 배 아이콘 */}
                <path
                  d="M2 20 C6 16 10 16 12 18 C14 16 18 16 22 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 18 L19 18 L17 10 L7 10 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M12 10 L12 6" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6 L16 8 L12 10 L8 8 Z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <h3>🤖 AI 챗봇과 상담하기</h3>
            <p>하나은행 직원 전용 AI 챗봇과 상담하기</p>
            <div className="sailing-waves">
              <div className="mini-wave"></div>
              <div className="mini-wave"></div>
              <div className="mini-wave"></div>
            </div>
            <div className="card-footer">
              <span className="port-info">🚢 포트: 8080</span>
            </div>
          </div>
        </div>

        <div className="nautical-footer">
          <p>🧭 하나은행 직원 전용 항해 시스템 🧭</p>
          <div className="compass-indicator">
            <span>현재 위치: 메인 항구</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage