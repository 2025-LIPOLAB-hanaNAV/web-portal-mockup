import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './PostDetail.css'

interface PostDetailData {
  id: string
  title: string
  department: string
  author: string
  views: number
  postDate: string
  endDate: string
  category: string
  badges: ('notice' | 'emergency')[]
  content: string
  attachments: {
    id: string
    name: string
    size: string
    downloadUrl: string
  }[]
}

const PostDetail = () => {
  const { boardType, postId } = useParams<{ boardType: string; postId: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (postId) {
      fetchPostDetail(postId)
    }
  }, [postId])

  const fetchPostDetail = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // API 호출
      const response = await fetch(`/api/posts/${id}`)
      if (!response.ok) {
        throw new Error('게시글을 불러오는데 실패했습니다.')
      }
      
      const data = await response.json()
      setPost(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
      
      // 개발 중에는 mock 데이터 사용
      const mockData: PostDetailData = {
        id: postId,
        title: '금융소비자보호부 담당 업무 안내',
        department: '금융소비자보호부',
        author: '홍길동',
        views: 528,
        postDate: '2025-07-24',
        endDate: '2025-12-31',
        category: '기타',
        badges: ['notice'],
        content: `
<h3>금융소비자보호부 담당 업무 안내</h3>

<p>안녕하세요. 금융소비자보호부입니다.</p>

<p>이번 공지를 통해 금융소비자보호부의 주요 담당 업무에 대해 안내드리고자 합니다.</p>

<h4>주요 업무 내용</h4>
<ul>
  <li>금융소비자 권익 보호</li>
  <li>금융상품 및 서비스 관련 분쟁 조정</li>
  <li>금융교육 및 정보 제공</li>
  <li>금융사기 예방 및 대응</li>
</ul>

<h4>문의 사항</h4>
<p>관련 문의사항이 있으시면 금융소비자보호부로 연락 주시기 바랍니다.</p>
<p>전화: 02-1234-5678<br>
이메일: consumer@hana.co.kr</p>

<p>감사합니다.</p>
        `,
        attachments: [
          {
            id: '1',
            name: '금융소비자보호부_업무안내.pdf',
            size: '2.3MB',
            downloadUrl: '/api/attachments/1/download'
          },
          {
            id: '2',
            name: '관련_법령_안내.hwp',
            size: '1.1MB',
            downloadUrl: '/api/attachments/2/download'
          }
        ]
      }
      setPost(mockData)
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (attachment: PostDetailData['attachments'][0]) => {
    // 첨부파일 다운로드
    const link = document.createElement('a')
    link.href = attachment.downloadUrl
    link.download = attachment.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <main className="main-content">
        <div className="post-detail-loading">
          <div className="loading-spinner"></div>
          <p>게시글을 불러오는 중입니다...</p>
        </div>
      </main>
    )
  }

  if (error && !post) {
    return (
      <main className="main-content">
        <div className="post-detail-error">
          <h3>오류가 발생했습니다</h3>
          <p>{error}</p>
          <button onClick={() => navigate(`/boards/${boardType}`)} className="btn-back">목록으로 돌아가기</button>
        </div>
      </main>
    )
  }

  if (!post) return null

  return (
    <main className="main-content">
      <div className="post-detail-header">
        <div className="post-detail-nav">
          <button onClick={() => navigate(`/boards/${boardType}`)} className="btn-back">← 목록으로</button>
        </div>
        
        <div className="post-detail-info">
          <div className="post-badges">
            {post.badges.includes('notice') && <span className="badge notice">공지</span>}
            {post.badges.includes('emergency') && <span className="badge emergency">긴급</span>}
            <span className="category-badge">{post.category}</span>
          </div>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="post-meta-item">
              <span className="meta-label">부서:</span>
              <span className="meta-value">{post.department}</span>
            </div>
            <div className="post-meta-item">
              <span className="meta-label">작성자:</span>
              <span className="meta-value">{post.author}</span>
            </div>
            <div className="post-meta-item">
              <span className="meta-label">조회수:</span>
              <span className="meta-value">{post.views}</span>
            </div>
            <div className="post-meta-item">
              <span className="meta-label">게시일:</span>
              <span className="meta-value">{post.postDate}</span>
            </div>
            <div className="post-meta-item">
              <span className="meta-label">종료일:</span>
              <span className="meta-value">{post.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="post-detail-content">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {post.attachments.length > 0 && (
        <div className="post-attachments">
          <h3 className="attachments-title">첨부파일</h3>
          <div className="attachments-list">
            {post.attachments.map((attachment) => (
              <div key={attachment.id} className="attachment-item">
                <div className="attachment-info">
                  <span className="attachment-icon">📎</span>
                  <span className="attachment-name">{attachment.name}</span>
                  <span className="attachment-size">({attachment.size})</span>
                </div>
                <button 
                  onClick={() => handleDownload(attachment)}
                  className="btn-download"
                >
                  다운로드
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="post-detail-actions">
        <button onClick={() => navigate(`/boards/${boardType}`)} className="btn-action">목록</button>
        <button className="btn-action">수정</button>
        <button className="btn-action">삭제</button>
        <button className="btn-action">인쇄</button>
      </div>
    </main>
  )
}

export default PostDetail