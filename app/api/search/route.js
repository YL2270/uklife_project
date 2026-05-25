import { NextResponse } from "next/server"
import { getPostsByCategory } from "../../../lib/db"

export const revalidate = 0

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim().toLowerCase()

  if (!q || q.length < 1) {
    return NextResponse.json({ results: [] })
  }

  try {
    const [uklifePosts, bookPosts] = await Promise.all([
      getPostsByCategory("uklife"),
      getPostsByCategory("book-reviews"),
    ])

    const results = [...uklifePosts, ...bookPosts]
      .filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(q)
        const excerptMatch = post.excerpt?.toLowerCase().includes(q)
        const tagMatch = post.tags?.some((t) => t.toLowerCase().includes(q))
        return titleMatch || excerptMatch || tagMatch
      })
      .slice(0, 10)
      .map(({ id, slug, title, excerpt, category }) => ({ id, slug, title, excerpt, category }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search failed:", error)
    return NextResponse.json({ results: [] })
  }
}
