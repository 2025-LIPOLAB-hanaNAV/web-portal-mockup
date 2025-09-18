// API 설정 중앙 관리
export const API_CONFIG = {
  // 개발 환경
  DEVELOPMENT: {
    BASE_URL: 'http://localhost:3001',
    API_URL: 'http://localhost:3001/api',
    CHATBOT_URL: 'http://localhost:8080'
  },
  // 프로덕션 환경
  PRODUCTION: {
    BASE_URL: 'https://web-portal-backend-production-78d3.up.railway.app',
    API_URL: 'https://web-portal-backend-production-78d3.up.railway.app/api',
    CHATBOT_URL: 'https://web-hana-nav-front-dev.vercel.app'
  }
}

// 현재 환경 감지 (개발/프로덕션)
const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost'

// 현재 환경에 맞는 API URL 반환
export const getApiConfig = () => {
  return isDevelopment ? API_CONFIG.DEVELOPMENT : API_CONFIG.PRODUCTION
}

// 편의 함수들
export const getApiUrl = () => getApiConfig().API_URL
export const getBaseUrl = () => getApiConfig().BASE_URL
export const getChatbotUrl = () => getApiConfig().CHATBOT_URL