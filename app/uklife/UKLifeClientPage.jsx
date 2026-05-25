// app/uklife/UKLifeClientPage.jsx
// 大幅簡化：
// 1. 不再 client-side fetch（資料在 server 端就抓好了，透過 props 傳進來）
// 2. 砍掉每 5 分鐘 auto-refresh（這個之前讓你的 Notion API 流量爆掉）
// 3. 砍掉壞掉的 fetch URL `/api/posts/uklife/category/${params.slug}`（首頁的 params.slug 是 undefined）

"use client"

import PostCard from "../../components/post-card"
import { Heart } from "lucide-react"
import Header from "../../components/header"
import { generateSlug } from "../../lib/utils"

export default function UKLifeClientPage({
  initialPosts = [],
  initialUniqueSubTopics = [],
}) {
  const posts = initialPosts
  const uniqueSubTopics = initialUniqueSubTopics

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
              {uniqueSubTopics.map((topic, blockIndex) => {
                const postsForTopic = getPostsForTopic(topic)
                if (postsForTopic.length === 0) return null

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
                      {postsForTopic.map((post, postIndex) => (
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
