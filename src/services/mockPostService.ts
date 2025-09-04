export interface Attachment {
  id: string
  name: string
  size: string
  downloadUrl: string
}

export interface PostDetailData {
  id: string
  title: string
  department: string
  author: string
  views: number
  postDate: string
  endDate: string
  category: string
  badges: ("notice" | "emergency")[]
  content: string
  attachments: Attachment[]
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getPostDetail(id: string): Promise<PostDetailData> {
  // 네트워크 지연 시뮬레이션 (200~500ms)
  await delay(200 + Math.floor(Math.random() * 300))

  const res = await fetch(`/mock/posts/${id}.json`, { headers: { 'Content-Type': 'application/json' } })
  if (!res.ok) {
    throw new Error('게시글을 불러오는데 실패했습니다.')
  }
  const data = (await res.json()) as PostDetailData
  return data
}
