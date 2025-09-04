import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services/api'
import WritePostModal from '../WritePostModal'
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

const NoticeBoard = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false)

  useEffect(() => {
    const loadPosts = async () => {
      // 기존 하드코딩 데이터
      const samplePosts: Post[] = [
        {
          id: 'notice_001',
          isUnread: false,
          isModified: false,
          category: '공지',
          title: '2025년 신년 인사',
          department: '경영진',
          author: '김회장',
          views: 1523,
          postDate: '2025-01-01',
          endDate: '2025-12-31',
          badges: ['notice'],
          hasAttachment: false
        },
        {
          id: 'notice_002',
          isUnread: true,
          isModified: false,
          category: '공지',
          title: '시스템 점검 안내 (1월 25일)',
          department: 'IT운영팀',
          author: '이과장',
          views: 342,
          postDate: '2025-01-20',
          endDate: '2025-01-26',
          badges: ['notice', 'emergency'],
          hasAttachment: true
        }
      ]

      try {
        // API에서 게시물 가져오기
        console.log('Loading posts... samplePosts:', samplePosts.length)
        const result = await apiService.getPosts()
        console.log('API result:', result)
        
        if (result.success && result.data) {
          console.log('API data received:', result.data.length, 'posts')
          // 모든 게시물을 합치고 정렬
          const allPosts = [...samplePosts, ...result.data]
          console.log('All posts combined:', allPosts.length)
          
          // 공지는 상단 고정, 일반 게시물은 날짜순 정렬
          const sortedPosts = allPosts.sort((a, b) => {
            // 공지 배지가 있는 게시물을 상단에
            const aHasNotice = a.badges.includes('notice')
            const bHasNotice = b.badges.includes('notice')
            
            if (aHasNotice && !bHasNotice) return -1
            if (!aHasNotice && bHasNotice) return 1
            
            // 같은 카테고리 내에서는 날짜 순 정렬 (최신순)
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
          })
          
          console.log('Final sorted posts:', sortedPosts.length)
          setPosts(sortedPosts)
        } else {
          console.log('API failed, using sample posts only')
          // API 실패시 하드코딩 데이터만 사용 (정렬 적용)
          const sortedSamplePosts = samplePosts.sort((a, b) => {
            const aHasNotice = a.badges.includes('notice')
            const bHasNotice = b.badges.includes('notice')
            
            if (aHasNotice && !bHasNotice) return -1
            if (!aHasNotice && bHasNotice) return 1
            
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
          })
          setPosts(sortedSamplePosts)
        }
      } catch (error) {
        console.error('게시물 로딩 실패:', error)
        const sortedSamplePosts = samplePosts.sort((a, b) => {
          const aHasNotice = a.badges.includes('notice')
          const bHasNotice = b.badges.includes('notice')
          
          if (aHasNotice && !bHasNotice) return -1
          if (!aHasNotice && bHasNotice) return 1
          
          return new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
        })
        setPosts(sortedSamplePosts)
      }
    }

    loadPosts()
  }, [])

  const handlePostClick = (postId: string) => {
    navigate(`/boards/notice/posts/${postId}`)
  }

  const handleWritePost = async (formData: FormData) => {
    try {
      const result = await apiService.createPost(formData)
      if (result.success && result.data) {
        // 새 게시물을 목록에 추가
        const newPost: Post = {
          id: result.data.id,
          isUnread: true,
          isModified: false,
          category: result.data.category,
          title: result.data.title,
          department: result.data.department,
          author: result.data.author,
          views: result.data.views,
          postDate: result.data.postDate,
          endDate: result.data.endDate || '',
          badges: result.data.badges as ('notice' | 'emergency')[],
          hasAttachment: result.data.attachments && result.data.attachments.length > 0
        }
        setPosts(prev => [newPost, ...prev])
        alert('게시물이 성공적으로 작성되었습니다!')
      } else {
        throw new Error(result.message || '게시물 작성에 실패했습니다.')
      }
    } catch (error) {
      console.error('게시물 작성 실패:', error)
      throw error
    }
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>공지게시판</h2>
        <div className="board-info">
          <span className="post-count">{posts.length}</span>
          <span>전체공지</span>
          <span>중요공지</span>
          <span>일반공지</span>
        </div>
      </div>

      <div className="board-controls">
        <div className="board-actions">
          <button className="btn-action" onClick={() => setIsWriteModalOpen(true)}>글쓰기</button>
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

      <WritePostModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmit={handleWritePost}
      />
    </main>
  )
}

export default NoticeBoard