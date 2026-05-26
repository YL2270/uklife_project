// app/uklife/categories/[slug]/page.jsx
// V3 改動：新增母分類分支，既有子分類邏輯完全不動
// 母分類 slug（raising-kids / travel-with-kids / london / personal-thoughts）優先判斷
// 子分類 slug（中文+英文全名）維持原有 matchesSlug 邏輯

import { notFound } from "next/navigation"
import { getPostsByCategory } from "../../../../lib/db"
import { getMapForCategory } from "../../../../lib/category-maps"
import { PARENT_CATEGORIES, postMatchesAnyChinese } from "../../../../lib/parent-categories"
import PostCard from "../../../../components/post-card"
import CategoryMap from "../../../../components/category-map"
import Header from "../../../../components/header"
import Footer from "../../../../components/footer"

export const revalidate = 600

const SITE_URL = "https://yilungc.com"

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug)

  // 母分類 metadata
  const parent = PARENT_CATEGORIES[slug]
  if (parent) {
    const canonicalUrl = `${SITE_URL}/uklife/categories/${slug}`
    return {
      title: `${parent.label} | YL 英國生活`,
      description: parent.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${parent.label} | YL 英國生活`,
        description: parent.description,
        url: canonicalUrl,
      },
      twitter: {
        title: `${parent.label} | YL 英國生活`,
        description: parent.description,
      },
    }
  }

  // 既有子分類 metadata
  return {
    title: `${slug} | YL 英國生活`,
    description: `YL 在 ${slug} 主題下的文章分享。`,
  }
}

// 既有子分類比對函數（模糊比對，子分類 slug 是中文+英文全名）
function matchesSlug(tag, slug) {
  const tagLower = tag.toLowerCase().trim()
  const slugLower = slug.toLowerCase().trim()
  return tagLower === slugLower || tagLower.includes(slugLower)
}

export default async function CategoryPage({ params }) {
  const slug = decodeURIComponent(params.slug)
  const allPosts = await getPostsByCategory("uklife")

  // ===== 母分類分支（新增，不動既有邏輯）=====
  const parent = PARENT_CATEGORIES[slug]
  if (parent) {
    // 用 Chinese prefix exact match 篩文章，避免 substring 誤抓
    const posts = allPosts.filter((p) => postMatchesAnyChinese(p, parent.chineseTags))
    const mapUrl = getMapForCategory(slug)

    return (
      <div className="min-h-screen flex flex-col bg-background theme-uk-life">
        <Header />

        <section className="py-16 flex-grow mt-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 pb-4 border-b border-border">
              <h1 className="text-3xl font-serif font-bold text-foreground">
                {parent.label}
                <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
                  {posts.length} 篇
                </span>
              </h1>
              {parent.description && (
                <p className="mt-2 text-muted-foreground text-sm">{parent.description}</p>
              )}
            </div>

            {mapUrl && <CategoryMap embedUrl={mapUrl} categoryName={parent.label} />}

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

  // ===== 既有子分類邏輯（原樣保留，不動）=====
  const mapUrl = getMapForCategory(slug)

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

          {mapUrl && <CategoryMap embedUrl={mapUrl} categoryName={slug} />}

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
