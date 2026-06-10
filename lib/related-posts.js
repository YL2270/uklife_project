// lib/related-posts.js
// 相關文章篩選：同 tag（中文 prefix exact match）的其他文章
// ⚠️ 必須用 Chinese prefix exact match，不能用 substring（V3 修過的 bug）

import { getChinesePrefix } from "./parent-categories"

// currentPost：目前文章
// allPosts：同 Status 全部文章（uklife 或 book-reviews 列表）
// limit：最多幾篇（預設 3）
export function getRelatedPosts(currentPost, allPosts, limit = 3) {
  // 1. 取目前文章所有 tag 的中文 prefix 集合
  const currentPrefixes = new Set(
    (currentPost.tags || []).map(getChinesePrefix).filter(Boolean)
  )

  // 排除自己（用 id 比對）
  const others = (allPosts || []).filter((p) => p.id !== currentPost.id)

  // 2~3. 任一 tag 中文 prefix 有交集者為候選；交集數多優先，其次日期新到舊
  const candidates = others
    .map((p) => {
      const prefixes = (p.tags || []).map(getChinesePrefix)
      const overlap = prefixes.filter((pre) => currentPrefixes.has(pre)).length
      return { post: p, overlap }
    })
    .filter((x) => x.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      return new Date(b.post.published_at) - new Date(a.post.published_at)
    })

  // 4. 有相關文就取前 N 篇（不足就顯示幾篇是幾篇）
  if (candidates.length > 0) {
    return candidates.slice(0, limit).map((x) => x.post)
  }

  // 0 篇相關 → fallback：同 Status 最新 N 篇（已排除自己）
  return others
    .slice()
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, limit)
}
