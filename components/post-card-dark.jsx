"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate, calculateReadingTime } from "../lib/utils"
import { Calendar, Clock, ArrowRight, Pin } from "lucide-react"

export default function PostCardDark({ post, featured = false }) {
  // Safely handle the data with proper fallbacks
  const safePost = {
    id: post?.id || '',
    title: post?.title || 'Untitled',
    slug: post?.slug || 'no-slug',
    category: post?.category || 'uncategorized',
    featured_image: post?.featured_image || null,
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    published_at: post?.published_at || post?.publishedAt || new Date().toISOString(),
    tags: Array.isArray(post?.tags) ? post.tags : [],
    pinned: Boolean(post?.pinned)
  }

  // Safe date formatting with error handling
  const formatDateSafely = (dateString) => {
    try {
      if (!dateString) return 'No date'
      return formatDate(dateString)
    } catch (error) {
      console.warn('Date formatting error:', error)
      return 'Invalid date'
    }
  }

  // Safe reading time calculation with error handling
  const calculateReadingTimeSafely = (content) => {
    try {
      if (!content) return '1 min read'
      return calculateReadingTime(content)
    } catch (error) {
      console.warn('Reading time calculation error:', error)
      return '~ min read'
    }
  }

  // Dark mode card classes
  const cardClasses = [
    "group",
    "rounded-xl",
    "shadow-md",
    "hover:shadow-xl",
    "transition-all",
    "duration-300",
    "overflow-hidden",
    "border",
    "border-gray-700",
    "hover:border-primary",
    "transform",
    "hover:-translate-y-1",
    "bg-gray-800"
  ];

  if (featured) {
    cardClasses.push(
      "rounded-2xl",
      "shadow-lg",
      "hover:shadow-2xl",
      "transform",
      "hover:-translate-y-2"
    );
  }

  if (safePost.category === "book-reviews") {
    cardClasses.push("theme-book-reviews");
  }

  // Generate the correct link path
  const linkPath = safePost.category === "life-blog" 
    ? `/book-reviews/${safePost.id}` 
    : `/${safePost.category}/${safePost.id}`

  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className={cardClasses.join(" ")}>
      <Link 
        href={linkPath}
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("selectedPost", JSON.stringify(safePost))
          }
        }}
      >
        <div className="relative w-full h-48 md:h-56 overflow-hidden group">
          {!imageError && safePost.featured_image ? (
            <Image
              src={safePost.featured_image}
              alt={safePost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={handleImageError}
              unoptimized={true}
            />
          ) : (
            <Image
              src="/images/book_post.jpg"
              alt={safePost.title}
              fill
              className="object-cover opacity-80"
              onError={handleImageError}
              unoptimized={true}
            />
          )}

          {/* Dark gradient overlay */}
        
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Category Badge */}
          {/*
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${
                safePost.category === "book-reviews" ? "bg-blue-600/80" : "bg-gray-700/80"
              }`}
            >
              {safePost.category === "book-reviews" ? "Book" : "UK Life"}
            </span>
          </div>
          */}

          {/* Pinned Badge */}
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
              <span>{formatDateSafely(safePost.published_at)}</span>
            </div>
            {/*
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{calculateReadingTimeSafely(safePost.content)}</span>
            </div>
            */}
          </div>

          <h3
            className={`font-serif font-bold text-white group-hover:text-primary transition-colors duration-200 line-clamp-2 ${
              featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2"
            }`}
          >
            {safePost.title}
          </h3>

          <p className="text-gray-400 line-clamp-3 mb-4">{safePost.excerpt}</p>

          {/* Tags */}
          {safePost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {safePost.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-200">
            <span className="mr-2">Read more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </article>
  )
}
