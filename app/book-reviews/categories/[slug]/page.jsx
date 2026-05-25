// app/book-reviews/categories/[slug]/page.jsx

import { notFound } from "next/navigation"
import { getPostsByCategoryAndTag } from "../../../../lib/db"
import PostCardDark from "../../../../components/post-card-dark"
import Header from "../../../../components/header"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug)
  return {
    title: `${slug} | YL 閱讀筆記`,
    description: `YL 在 ${slug} 主題下的書評。`,
  }
}

export default async function CategoryPage({ params }) {
  const slug = decodeURIComponent(params.slug)
  const posts = await getPostsByCategoryAndTag("book-reviews", slug)

  if (!posts) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 theme-book-reviews">
      <Header />

      <section className="py-16 flex-grow mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 pb-4 border-b border-gray-700">
            <h1 className="text-3xl font-serif font-bold text-white">
              {slug}
              <span className="ml-3 text-sm font-sans font-normal text-gray-400">
                {posts.length} 篇
              </span>
            </h1>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCardDark key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-16">
              這個分類還沒有文章。
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
