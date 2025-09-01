import { useState, useEffect } from 'react'
import './BulletinBoard.css'
import PostDetail from './PostDetail'

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

const BulletinBoard = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: '0401r2jxl',
        isUnread: true,
        isModified: false,
        category: '기타',
        title: '금융소비자보호부 담당 업무 안내',
        department: '금융소비자보호부',
        author: '홍길동',
        views: 528,
        postDate: '2025-07-24',
        endDate: '2025-12-31',
        badges: ['notice'],
        hasAttachment: false
      },
      {
        id: '0001r24yt',
        isUnread: true,
        isModified: true,
        category: '기타',
        title: '★문진제도 개선 시행 안내 및 Q&A',
        department: '금융소비자보호부',
        author: '장금이',
        views: 1002,
        postDate: '2025-07-07',
        endDate: '2027-12-31',
        badges: ['notice', 'emergency'],
        hasAttachment: true
      },
      {
        id: '0401r1qzr',
        isUnread: true,
        isModified: true,
        category: '기타',
        title: '입출금 계좌 신규시 금융거래한도계좌 신규 선택 항목 추가 안내',
        department: '금융소비자보호부',
        author: '장금이',
        views: 698,
        postDate: '2025-06-19',
        endDate: '2025-06-19',
        badges: ['notice'],
        hasAttachment: false
      },
      {
        id: '0401r2abc',
        isUnread: true,
        isModified: false,
        category: '기타',
        title: '법인·개인사업자 신규 계좌 개설시 유의 사항 안내',
        department: '금융소비자보호부',
        author: '김철수',
        views: 1015,
        postDate: '2025-06-13',
        endDate: '2025-06-13',
        badges: ['notice'],
        hasAttachment: false
      },
      {
        id: '0401r3def',
        isUnread: false,
        isModified: false,
        category: '전기통신사기',
        title: '「투자자의 유형별 통신사기범죄 대응 방안 가이드」',
        department: '금융소비자보호부',
        author: '김철수',
        views: 660,
        postDate: '2025-05-09',
        endDate: '2026-05-09',
        badges: ['notice'],
        hasAttachment: false
      }
    ]
    setPosts(samplePosts)
  }, [])

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId)
  }

  const handleBackToList = () => {
    setSelectedPostId(null)
  }

  if (selectedPostId) {
    return <PostDetail postId={selectedPostId} onBack={handleBackToList} />
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>보이스피싱 지킴이</h2>
        <div className="board-info">
          <span className="post-count">86</span>
          <span>전기통신금융사기</span>
          <span>전자금융사고</span>
          <span>보이스피싱사례</span>
          <span>기타</span>
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
        <span className="page-info">1 / 5</span>
      </div>
    </main>
  )
}

export default BulletinBoard