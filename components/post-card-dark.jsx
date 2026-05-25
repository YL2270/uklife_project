"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "../lib/utils"
import { Calendar, ArrowRight, Pin, Clock } from "lucide-react"

export default function PostCardDark({ post }) {
  const safePost = {
    id: post?.id || "",
    title: post?.title || "Untitled",
    category: post?.category || "book-reviews",
    featured_image: post?.featured_image || null,
    excerpt: post?.excerpt || "",
    published_at: post?.published_at || new Date().toISOString(),
    tags: Array.isArray(post?.tags) ? post.tags : [],
    pinned: Boolean(post?.pinned),
    readingTime: post?.readingTime || null,
  }

  const linkPath = `/${safePost.category}/${safePost.id}`
  const [imageError, setImageError] = useState(false)

  return (
    <article className="group bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-500 transform hover:-translate-y-1">
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
              src="/images/book-post.jpg"
              alt={safePost.title}
              fill
              className="object-cover opacity-60"
              unoptimized={true}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(safePost.published_at)}</span>
            </div>
            {safePost.readingTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span> {safePost.readingTime} 分鐘</span>
              </div>
            )}
          </div>

          <h3 className="font-serif font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 text-lg mb-2">
            {safePost.title}
          </h3>

          <p className="text-gray-400 line-clamp-3 mb-4">{safePost.excerpt}</p>

          {safePost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {safePost.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-2 py-1 bg-gray-600 text-gray-100 text-xs rounded-md hover:bg-gray-500 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center text-amber-400 font-medium group-hover:text-amber-300 transition-colors">
            <span className="mr-2">閱讀全文</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  )
}
