import { useState } from 'react'
import './WritePostModal.css'

interface WritePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (postData: FormData) => Promise<void>
}

const WritePostModal = ({ isOpen, onClose, onSubmit }: WritePostModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    author: '',
    category: '공지',
    content: '',
    endDate: '',
    badges: [] as string[]
  })
  const [files, setFiles] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBadgeChange = (badge: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      badges: checked 
        ? [...prev.badges, badge]
        : prev.badges.filter(b => b !== badge)
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    
    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('department', formData.department)
      submitData.append('author', formData.author)
      submitData.append('category', formData.category)
      submitData.append('content', formData.content)
      submitData.append('endDate', formData.endDate)
      submitData.append('badges', JSON.stringify(formData.badges))
      
      if (files) {
        for (let i = 0; i < files.length; i++) {
          submitData.append('files', files[i])
        }
      }

      await onSubmit(submitData)
      
      // 성공시 폼 리셋
      setFormData({
        title: '',
        department: '',
        author: '',
        category: '공지',
        content: '',
        endDate: '',
        badges: []
      })
      setFiles(null)
      onClose()
    } catch (error) {
      console.error('게시물 작성 실패:', error)
      alert('게시물 작성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>게시물 작성</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="form-row">
            <div className="form-col">
              <label htmlFor="department">부서 *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                placeholder="부서명을 입력하세요"
              />
            </div>
            <div className="form-col">
              <label htmlFor="author">작성자 *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="작성자명을 입력하세요"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label htmlFor="category">말머리</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="공지">공지</option>
                <option value="일반">일반</option>
                <option value="중요">중요</option>
                <option value="예금상품">예금상품</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className="form-col">
              <label htmlFor="endDate">종료일</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label>배지</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.badges.includes('notice')}
                  onChange={(e) => handleBadgeChange('notice', e.target.checked)}
                />
                공지
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.badges.includes('important')}
                  onChange={(e) => handleBadgeChange('important', e.target.checked)}
                />
                중요
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.badges.includes('emergency')}
                  onChange={(e) => handleBadgeChange('emergency', e.target.checked)}
                />
                긴급
              </label>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="content">내용 *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={8}
              placeholder="내용을 입력하세요 (HTML 태그 사용 가능)"
            />
          </div>

          <div className="form-row">
            <label htmlFor="files">첨부파일</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,.jpg,.jpeg,.png,.gif"
            />
            {files && files.length > 0 && (
              <div className="file-list">
                {Array.from(files).map((file, index) => (
                  <span key={index} className="file-item">
                    {file.name} ({(file.size / 1024).toFixed(1)}KB)
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              취소
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '작성 중...' : '작성 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WritePostModal