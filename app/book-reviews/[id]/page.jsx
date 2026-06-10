// app/book-reviews/[id]/page.jsx
// V2 改動：同 uklife，加 Header / Footer / 可點擊 tags

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostWithBlocks, getPostByIdOrSlug, getPostsByCategory } from "../../../lib/db"
import { NotionBlocks } from "../../../lib/notion-blocks"
import { formatDate } from "../../../lib/utils"
import { Calendar, ArrowLeft, Tag, Clock, ChevronLeft } from "lucide-react"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import RelatedPosts from "../../../components/related-posts"
import ShareButtons from "../../../components/share-buttons"

const SITE_URL = "https://yilungc.com"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const post = await getPostByIdOrSlug(params.id, "Book")
  if (!post) {
    return { title: "Book Review Not Found | yilungc" }
  }

  const seoTitle = post.seoTitle || post.title
  const description = post.metaDescription || post.excerpt || `${seoTitle} - YL 的書評`
  const canonicalUrl = `${SITE_URL}/book-reviews/${post.slug || post.id}`
  const image = post.featured_image

  return {
    title: `${seoTitle} | YL 閱讀筆記`,
    description,
    openGraph: {
      title: seoTitle,
      description,
      url: canonicalUrl,
      siteName: "YL 閱讀筆記",
      images: image ? [{ url: image, width: 1200, height: 630, alt: seoTitle }] : [],
      locale: "zh_TW",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function BookReviewArticle({ params }) {
  // 先用 slug 或 ID 解析出文章（取得 post.id 這個 Notion UUID）
  const post = await getPostByIdOrSlug(params.id, "Book")
  if (!post) notFound()

  // 再用解析後的 Notion UUID 抓 blocks；同時抓同分類全列表給「延伸閱讀」用（沿用 ISR 快取）
  const [data, allPosts] = await Promise.all([
    getPostWithBlocks(post.id),
    getPostsByCategory("book-reviews"),
  ])
  if (!data) notFound()

  const { blocks } = data
  const title = post.title
  const excerpt = post.excerpt
  const publishedAt = post.published_at
  const featuredImage = post.featured_image || "/images/book-post.jpg"
  const tags = post.tags
  const readingTime = post.readingTime
  const canonicalUrl = `${SITE_URL}/book-reviews/${post.slug || post.id}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || title,
    description: post.metaDescription || excerpt,
    image: featuredImage,
    datePublished: publishedAt,
    author: { "@type": "Person", name: "Yilung C" },
    publisher: { "@type": "Person", name: "Yilung C" },
    mainEntityOfPage: canonicalUrl,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background theme-book-reviews">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="flex-grow">
        {/* 回到 bar */}
        <Link
          href="/book-reviews"
          className="block bg-white border-b border-border px-4 py-3 hover:bg-gray-50 transition"
        >
          <span className="flex items-center gap-2 text-gray-900 text-sm">
            <ChevronLeft className="w-4 h-4" />
            回到閱讀筆記
          </span>
        </Link>

        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 60%, transparent 80%)"
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <h1
                className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
              >
                {title}
              </h1>

              <div
                className="flex items-center space-x-6 text-white/90"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(publishedAt)}</span>
                </div>
                {readingTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>閱讀時間 {readingTime} 分鐘</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {excerpt && (
              <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
                {excerpt}
              </p>
            )}

            <div className="prose prose-lg max-w-none">
              <NotionBlocks blocks={blocks} />
            </div>

            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">標籤</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/book-reviews/categories/${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-full hover:bg-gray-300 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <ShareButtons url={canonicalUrl} title={title} />

            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/book-reviews"
                className="inline-flex items-center space-x-2 text-secondary hover:text-primary font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>看更多閱讀筆記</span>
              </Link>
            </div>
          </div>
        </section>
      </article>

      <RelatedPosts
        currentPost={post}
        allPosts={allPosts}
        basePath="/book-reviews"
        variant="dark"
      />

      <Footer />
    </div>
  )
}
