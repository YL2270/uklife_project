// components/post-card.jsx
// 小修改：linkPath 邏輯簡化，確保 URL 對 (/uklife/{id} 或 /book-reviews/{id})

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "../lib/utils"
import { Calendar, ArrowRight, Pin } from "lucide-react"

export default function PostCard({ post, featured = false }) {
  const safePost = {
    id: post?.id || "",
    title: post?.title || "Untitled",
    category: post?.category || "uklife",
    featured_image: post?.featured_image || null,
    excerpt: post?.excerpt || "",
    published_at: post?.published_at || new Date().toISOString(),
    tags: Array.isArray(post?.tags) ? post.tags : [],
    pinned: Boolean(post?.pinned),
  }

  const cardClasses = featured
    ? "group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:border-primary transform hover:-translate-y-2"
    : "group bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-primary transform hover:-translate-y-1"

  // URL: /uklife/{id} or /book-reviews/{id}
  const linkPath = `/${safePost.category}/${safePost.id}`

  const [imageError, setImageError] = useState(false)

  return (
    <article className={cardClasses}>
      <Link href={linkPath}>
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          {!imageError && safePost.featured_image ? (
            <Image
              src={safePost.featured_image}
              alt={safePost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              unoptimized={true}
            />
          ) : (
            <Image
              src="/images/ukpic.jpeg"
              alt={safePost.title}
              fill
              className="object-cover opacity-60"
              unoptimized={true}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {safePost.pinned && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-red-600/80 backdrop-blur-sm flex items-center space-x-1">
                <Pin className="w-3 h-3" />
                <span>Pinned</span>
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(safePost.published_at)}</span>
            </div>
          </div>

          <h3
            className={`font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${
              featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2"
            }`}
          >
            {safePost.title}
          </h3>

          <p className="text-muted-foreground line-clamp-3 mb-4">
            {safePost.excerpt}
          </p>

          {safePost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {safePost.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center text-primary font-medium group-hover:text-secondary transition-colors">
            <span className="mr-2">閱讀全文</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  )
}
