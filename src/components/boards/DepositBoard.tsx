import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../BulletinBoard.css'

interface Post {
  id: string
  isUnread: boolean
  isModified: boolean
  category: string
  title: string
  department: string
  author: string
  views: number
  postDate: string
  endDate: string
  badges: ('notice' | 'emergency')[]
  hasAttachment: boolean
}

const DepositBoard = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: 'deposit_001',
        isUnread: true,
        isModified: false,
        category: '예금상품',
        title: '2025년 신규 정기예금 상품 출시 안내',
        department: '수신상품팀',
        author: '박대리',
        views: 245,
        postDate: '2025-01-15',
        endDate: '2025-12-31',
        badges: ['notice'],
        hasAttachment: true
      },
      {
        id: 'deposit_002',
        isUnread: false,
        isModified: false,
        category: '금리정책',
        title: '기준금리 변동에 따른 예금금리 조정',
        department: '수신상품팀',
        author: '최과장',
        views: 432,
        postDate: '2025-01-10',
        endDate: '2025-03-31',
        badges: ['notice'],
        hasAttachment: false
      }
    ]
    setPosts(samplePosts)
  }, [])

  const handlePostClick = (postId: string) => {
    navigate(`/boards/deposit/posts/${postId}`)
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>예금상품관리</h2>
        <div className="board-info">
          <span className="post-count">{posts.length}</span>
          <span>예금상품</span>
          <span>금리정책</span>
          <span>상품공지</span>
        </div>
      </div>

      <div className="board-controls">
        <div className="board-actions">
          <button className="btn-action">글쓰기</button>
          <button className="btn-action">답글</button>
          <button className="btn-action">삭제</button>
          <button className="btn-action">전체</button>
          <button className="btn-action">글자크기 +</button>
          <button className="btn-action">글자크기 -</button>
          <button className="btn-action">인쇄</button>
          <button className="btn-action">검색</button>
        </div>
        <div className="view-options">
          <span>도움말</span>
          <select className="select-rows">
            <option>20</option>
          </select>
        </div>
      </div>

      <div className="content-table bbs-tbl">
        <table>
          <colgroup>
            <col style={{width: '60px'}} />
            <col style={{width: '120px'}} />
            <col style={{width: 'auto'}} />
            <col style={{width: '140px'}} />
            <col style={{width: '80px'}} />
            <col style={{width: '60px'}} />
            <col style={{width: '90px'}} />
            <col style={{width: '90px'}} />
          </colgroup>
          <thead>
            <tr>
              <th>상태</th>
              <th>말머리</th>
              <th className="title">제목</th>
              <th>부서</th>
              <th>게시자</th>
              <th>조회</th>
              <th>게시일</th>
              <th>종료일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className={post.isUnread ? 'unread' : ''}>
                <td>
                  <span className="status-text">{post.isUnread ? '읽지않음' : '읽음'}</span>
                </td>
                <td>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {post.category}
                  </a>
                </td>
                <td className="title-cell">
                  <div className="title">
                    {post.badges.includes('notice') && <span className="badge notice">공지</span>}
                    {post.badges.includes('emergency') && <span className="badge emergency">긴급</span>}
                    {post.hasAttachment && <span className="ico file" title="첨부파일">📎</span>}
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        handlePostClick(post.id)
                      }} 
                      className="subject"
                    >
                      {post.title}
                    </a>
                  </div>
                </td>
                <td title={post.department}>{post.department}</td>
                <td>
                  <a href="#" onClick={(e) => e.preventDefault()} className="name">
                    {post.author}
                  </a>
                </td>
                <td className="count">{post.views}</td>
                <td className="date">{post.postDate}</td>
                <td className="date">{post.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="page-info">1 / 1</span>
      </div>
    </main>
  )
}

export default DepositBoard