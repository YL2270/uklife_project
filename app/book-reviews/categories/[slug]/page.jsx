// app/book-reviews/categories/[slug]/page.jsx
// V2 改動：模糊比對 tag 名稱

import { notFound } from "next/navigation"
import { getPostsByCategory } from "../../../../lib/db"
import PostCardDark from "../../../../components/post-card-dark"
import Header from "../../../../components/header"
import Footer from "../../../../components/footer"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug)
  return {
    title: `${slug} | YL 閱讀筆記`,
    description: `YL 在 ${slug} 主題下的書評。`,
  }
}

function matchesSlug(tag, slug) {
  const tagLower = tag.toLowerCase().trim()
  const slugLower = slug.toLowerCase().trim()
  return tagLower === slugLower || tagLower.includes(slugLower)
}

export default async function CategoryPage({ params }) {
  const slug = decodeURIComponent(params.slug)
  const allPosts = await getPostsByCategory("book-reviews")

  const posts = allPosts.filter((post) =>
    (post.tags || []).some((tag) => matchesSlug(tag, slug))
  )

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

      <Footer />
    </div>
  )
}
