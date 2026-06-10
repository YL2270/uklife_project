// components/related-posts.jsx
// V10：文章底部「延伸閱讀」— 同 tag 推最多 3 篇
// Server component；卡片直接複用既有 post-card / post-card-dark（不重做卡片）

import PostCard from "./post-card"
import PostCardDark from "./post-card-dark"
import { getRelatedPosts } from "../lib/related-posts"

// currentPost：目前文章
// allPosts：同 Status 全部文章
// basePath："/uklife" 或 "/book-reviews"（卡片本身依 post.category 產 href，混合制 slug||id）
// variant："light"（UK Life）/ "dark"（書評深色主題）
export default function RelatedPosts({ currentPost, allPosts, basePath, variant = "light" }) {
  const related = getRelatedPosts(currentPost, allPosts, 3)
  if (!related.length) return null

  const isDark = variant === "dark"
  const Card = isDark ? PostCardDark : PostCard

  const sectionClass = isDark ? "py-16 bg-gray-900" : "py-16 bg-muted/30"
  const headingClass = isDark ? "text-white" : "text-foreground"

  return (
    <section className={sectionClass}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`font-serif font-bold text-2xl md:text-3xl mb-8 ${headingClass}`}>
          延伸閱讀
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
