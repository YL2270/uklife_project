// app/book-reviews/BookReviewsClientPage.jsx
// 同 UKLifeClientPage：拿掉 auto-refresh + client fetch，改用 props

"use client"

import { useState } from "react"
import PostCardDark from "../../components/post-card-dark"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import Header from "../../components/header"
import { generateSlug } from "../../lib/utils"

const PREVIEW_COUNT = 3

export default function BookReviewsClientPage({
  initialPosts = [],
  initialUniqueTags = [],
}) {
  const posts = initialPosts
  const uniqueTags = initialUniqueTags
  // 記錄哪些分類已展開，key 為 tag 名稱
  const [expanded, setExpanded] = useState({})

  const toggleExpanded = (tag) => {
    setExpanded((prev) => ({ ...prev, [tag]: !prev[tag] }))
  }

  const getPostsForTag = (tag) => {
    return posts.filter((post) => {
      const postTags = post.tags || []
      return (
        postTags.includes(tag) ||
        (tag === "General" && postTags.length === 0)
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 theme-book-reviews">
      <Header />

      <section id="posts-section" className="py-16 flex-grow mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {uniqueTags.length > 0 ? (
            <div className="space-y-16">

              {/* 最新文章（固定 3 篇，不需展開） */}
              {posts.length > 0 && (() => {
                const latestPosts = [...posts]
                  .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
                  .slice(0, 3)
                return (
                  <div id="latest" className="animate-slide-up pt-16 -mt-16">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                      <h2 className="text-3xl font-serif font-bold text-white">
                        最新文章
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {latestPosts.map((post, postIndex) => (
                        <div
                          key={post.id}
                          className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
                          style={{ animationDelay: `${postIndex * 0.05}s` }}
                        >
                          <PostCardDark post={post} darkMode />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {uniqueTags.map((tag, blockIndex) => {
                const postsForTag = getPostsForTag(tag)
                if (postsForTag.length === 0) return null

                const isExpanded = !!expanded[tag]
                const visiblePosts = isExpanded
                  ? postsForTag
                  : postsForTag.slice(0, PREVIEW_COUNT)
                const hasMore = postsForTag.length > PREVIEW_COUNT

                return (
                  <div
                    key={tag}
                    id={generateSlug(tag)}
                    className="animate-slide-up pt-16 -mt-16"
                    style={{ animationDelay: `${blockIndex * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                      <h2 className="text-3xl font-serif font-bold text-white">
                        {tag}
                        <span className="ml-3 text-sm font-sans font-normal text-gray-400">
                          {postsForTag.length} 篇
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {visiblePosts.map((post, postIndex) => (
                        <div
                          key={post.id}
                          className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
                          style={{ animationDelay: `${postIndex * 0.05}s` }}
                        >
                          <PostCardDark post={post} darkMode />
                        </div>
                      ))}
                    </div>

                    {hasMore && (
                      <div className="mt-8 text-center">
                        <button
                          onClick={() => toggleExpanded(tag)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-600 text-sm font-medium text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                        >
                          {isExpanded ? (
                            <>收起 <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>閱讀更多（還有 {postsForTag.length - PREVIEW_COUNT} 篇）<ChevronDown className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-white mb-2">
                還沒有閱讀筆記
              </h3>
              <p className="text-gray-400">
                如果你剛上稿，幾分鐘後再來看就會出現了。
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
