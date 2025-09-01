import { useState } from 'react'
import './Login.css'

interface LoginProps {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'tester' && password === 'test12@') {
      onLogin()
    } else {
      alert('잘못된 로그인 정보입니다.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>하나 금융그룹포탈 목업</h1>
        <h2>로그인</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">사용자 ID</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">로그인</button>
        </form>
      </div>
      
      <div className="test-credentials-card">
        <h3>테스트 계정 안내</h3>
        <p>다음 ID/PW로 테스트해보세요:</p>
        <div className="credentials">
          <div><strong>ID:</strong> tester</div>
          <div><strong>PW:</strong> test12@</div>
        </div>
      </div>
    </div>
  )
}

export default Login