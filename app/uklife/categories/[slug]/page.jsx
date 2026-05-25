// app/uklife/categories/[slug]/page.jsx
// V2 改動：模糊比對 tag 名稱
// 例如 slug 是 "HerRead" 也能比到 "女性議題 HerRead"

import { notFound } from "next/navigation"
import { getPostsByCategory } from "../../../../lib/db"
import PostCard from "../../../../components/post-card"
import Header from "../../../../components/header"
import Footer from "../../../../components/footer"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug)
  return {
    title: `${slug} | YL 英國生活`,
    description: `YL 在 ${slug} 主題下的文章分享。`,
  }
}

function matchesSlug(tag, slug) {
  const tagLower = tag.toLowerCase().trim()
  const slugLower = slug.toLowerCase().trim()
  if (tagLower === slugLower) return true
  // 模糊：拆 slug 為多個關鍵字（用空格分），看 tag 是否包含其中之一
  const parts = slugLower.split(/\s+/).filter((p) => p.length > 1)
  return parts.some((p) => tagLower.includes(p))
}

export default async function CategoryPage({ params }) {
  const slug = decodeURIComponent(params.slug)
  const allPosts = await getPostsByCategory("uklife")

  // 模糊比對：標籤裡有任何部分對到 slug 就算
  const posts = allPosts.filter((post) =>
    (post.tags || []).some((tag) => matchesSlug(tag, slug))
  )

  return (
    <div className="min-h-screen flex flex-col bg-background theme-uk-life">
      <Header />

      <section className="py-16 flex-grow mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 pb-4 border-b border-border">
            <h1 className="text-3xl font-serif font-bold text-foreground">
              {slug}
              <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
                {posts.length} 篇
              </span>
            </h1>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">
              這個分類還沒有文章。
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
