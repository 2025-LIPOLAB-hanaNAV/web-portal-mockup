import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './PostDetail.css'
import { apiService, type Post, type Attachment } from '../services/api'

const PostDetail = () => {
  const { boardType, postId } = useParams<{ boardType: string; postId: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
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
      // FastAPI 백엔드 호출
      const response = await apiService.getPost(id)
      if (response.success && response.data) {
        setPost(response.data)
      } else {
        throw new Error(response.message || '게시글을 불러오는데 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (attachment: Attachment) => {
    // 첨부파일 다운로드
    const link = document.createElement('a')
    link.href = `http://localhost:3001${attachment.downloadUrl}`
    // original_filename이 있으면 사용, 없으면 name 사용
    link.download = attachment.original_filename || attachment.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 이미지 경로를 절대 URL로 변환하고 개행문자를 처리하는 함수
  const processContentImages = (content: string): string => {
    if (!content) return ''
    
    // 개행문자 처리: \n, \r, \t를 HTML로 변환
    let processedContent = content
      .replace(/\\n/g, '<br>')
      .replace(/\\r\\n/g, '<br>')
      .replace(/\\r/g, '<br>')
      .replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      .replace(/\n/g, '<br>')
      .replace(/\r\n/g, '<br>')
      .replace(/\r/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
    
    // /static/images/ 경로를 완전한 URL로 변환
    return processedContent.replace(
      /src="\/static\/images\//g,
      'src="http://localhost:3001/static/images/'
    )
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
          <button onClick={() => navigate(`/portal/boards/${boardType}`)} className="btn-back">목록으로 돌아가기</button>
        </div>
      </main>
    )
  }

  if (!post) return null

  return (
    <main className="main-content">
      <div className="post-detail-header">
        <div className="post-detail-nav">
          <button onClick={() => navigate(`/portal/boards/${boardType}`)} className="btn-back">← 목록으로</button>
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

      {post.attachments && post.attachments.length > 0 && (
        <div className="post-attachments-header">
          <h3 className="attachments-title">첨부파일</h3>
          <div className="attachments-list">
            {post.attachments.map((attachment) => (
              <div key={attachment.id} className="attachment-item">
                <div className="attachment-info">
                  <span className="attachment-icon">📎</span>
                  <span className="attachment-name">{attachment.original_filename || attachment.name}</span>
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

      <div className="post-detail-content">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: processContentImages(post.content || '') }} />
      </div>


      <div className="post-detail-actions">
        <button onClick={() => navigate(`/portal/boards/${boardType}`)} className="btn-action">목록</button>
        <button className="btn-action">수정</button>
        <button className="btn-action">삭제</button>
        <button className="btn-action">인쇄</button>
      </div>
    </main>
  )
}

export default PostDetail
