// app/book-reviews/page.jsx
import BookReviewsClientPage from "./BookReviewsClientPage"
import { getPostsByCategory } from "../../lib/db"

export const revalidate = 600

export const metadata = {
  title: "YL 閱讀筆記｜書評與書單分享",
  description: "愛書人 YL 的閱讀筆記：女性議題、台灣轉型正義、親子教養、商業創業與人生理財書評。",
  alternates: { canonical: "https://yilungc.com/book-reviews" },
  openGraph: {
    title: "YL 閱讀筆記｜書評與書單分享",
    description: "愛書人 YL 的閱讀筆記：女性議題、台灣轉型正義、親子教養、商業創業與人生理財書評。",
    url: "https://yilungc.com/book-reviews",
    images: ["/images/book-post.jpg"],
  },
}

export default async function BookReviewsPage() {
  const posts = await getPostsByCategory("book-reviews")

  const tagCount = new Map()
  posts.forEach((post) => {
    const primaryTag = post.tags?.[0] || "General"
    tagCount.set(primaryTag, (tagCount.get(primaryTag) || 0) + 1)
  })
  const tags = Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t)

  return <BookReviewsClientPage initialPosts={posts} initialUniqueTags={tags} />
}
