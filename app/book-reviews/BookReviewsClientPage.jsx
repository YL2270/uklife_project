// app/book-reviews/BookReviewsClientPage.jsx
// 同 UKLifeClientPage：拿掉 auto-refresh + client fetch，改用 props

"use client"

import PostCardDark from "../../components/post-card-dark"
import { Heart } from "lucide-react"
import Header from "../../components/header"
import { generateSlug } from "../../lib/utils"

export default function BookReviewsClientPage({
  initialPosts = [],
  initialUniqueTags = [],
}) {
  const posts = initialPosts
  const uniqueTags = initialUniqueTags

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
              {uniqueTags.map((tag, blockIndex) => {
                const postsForTag = getPostsForTag(tag)
                if (postsForTag.length === 0) return null

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
                      {postsForTag.map((post, postIndex) => (
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
