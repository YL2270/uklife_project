// app/uklife/UKLifeClientPage.jsx
// 大幅簡化：
// 1. 不再 client-side fetch（資料在 server 端就抓好了，透過 props 傳進來）
// 2. 砍掉每 5 分鐘 auto-refresh（這個之前讓你的 Notion API 流量爆掉）
// 3. 砍掉壞掉的 fetch URL `/api/posts/uklife/category/${params.slug}`（首頁的 params.slug 是 undefined）

"use client"

import { useState } from "react"
import PostCard from "../../components/post-card"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import Header from "../../components/header"
import { generateSlug } from "../../lib/utils"

const PREVIEW_COUNT = 3

export default function UKLifeClientPage({
  initialPosts = [],
  initialUniqueSubTopics = [],
}) {
  const posts = initialPosts
  const uniqueSubTopics = initialUniqueSubTopics
  // 記錄哪些分類已展開，key 為 topic 名稱
  const [expanded, setExpanded] = useState({})

  const toggleExpanded = (topic) => {
    setExpanded((prev) => ({ ...prev, [topic]: !prev[topic] }))
  }

  const getPostsForTopic = (topic) => {
    return posts.filter((post) => {
      const postTags = post.tags || []
      return (
        postTags.includes(topic) ||
        (topic === "General" && postTags.length === 0)
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background theme-uk-life">
      <Header />

      <section id="posts-section" className="py-16 flex-grow mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {uniqueSubTopics.length > 0 ? (
            <div className="space-y-16">

              {/* 最新文章（固定 3 篇，不需展開） */}
              {posts.length > 0 && (() => {
                const latestPosts = [...posts]
                  .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
                  .slice(0, 3)
                return (
                  <div id="latest" className="animate-slide-up pt-16 -mt-16">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                      <h2 className="text-3xl font-serif font-bold text-foreground">
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
                          <PostCard post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {uniqueSubTopics.map((topic, blockIndex) => {
                const postsForTopic = getPostsForTopic(topic)
                if (postsForTopic.length === 0) return null

                const isExpanded = !!expanded[topic]
                const visiblePosts = isExpanded
                  ? postsForTopic
                  : postsForTopic.slice(0, PREVIEW_COUNT)
                const hasMore = postsForTopic.length > PREVIEW_COUNT

                return (
                  <div
                    key={topic}
                    id={generateSlug(topic)}
                    className="animate-slide-up pt-16 -mt-16"
                    style={{ animationDelay: `${blockIndex * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                      <h2 className="text-3xl font-serif font-bold text-foreground">
                        {topic}
                        <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
                          {postsForTopic.length} 篇
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
                          <PostCard post={post} />
                        </div>
                      ))}
                    </div>

                    {hasMore && (
                      <div className="mt-8 text-center">
                        <button
                          onClick={() => toggleExpanded(topic)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                        >
                          {isExpanded ? (
                            <>收起 <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>閱讀更多（還有 {postsForTopic.length - PREVIEW_COUNT} 篇）<ChevronDown className="w-4 h-4" /></>
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
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                還沒有文章
              </h3>
              <p className="text-muted-foreground">
                如果你剛上稿，幾分鐘後再來看就會出現了。
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
