// app/book-reviews/[id]/page.jsx
// V2 改動：同 uklife，加 Header / Footer / 可點擊 tags

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostWithBlocks } from "../../../lib/db"
import { NotionBlocks } from "../../../lib/notion-blocks"
import { formatDate } from "../../../lib/utils"
import { Calendar, ArrowLeft, Tag, Clock } from "lucide-react"
import Header from "../../../components/header"
import Footer from "../../../components/footer"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const data = await getPostWithBlocks(params.id)
  if (!data) {
    return { title: "Book Review Not Found | yilungc" }
  }

  const { page } = data
  const title =
    page.properties?.["Post name"]?.title?.[0]?.plain_text ||
    page.properties?.Name?.title?.[0]?.plain_text ||
    "Untitled"
  const excerpt = page.properties?.Excerpt?.rich_text?.[0]?.plain_text || ""
  const image =
    page.cover?.external?.url ||
    page.cover?.file?.url ||
    page.properties?.["Photo URL"]?.url

  return {
    title: `${title} | YL 閱讀筆記`,
    description: excerpt || `${title} - YL 的書評`,
    openGraph: {
      title,
      description: excerpt,
      url: `https://yilungc.com/book-reviews/${params.id}`,
      siteName: "YL 閱讀筆記",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
      locale: "zh_TW",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `https://yilungc.com/book-reviews/${params.id}`,
    },
  }
}

export default async function BookReviewArticle({ params }) {
  const data = await getPostWithBlocks(params.id)
  if (!data) notFound()

  const { page, blocks } = data
  const title =
    page.properties?.["Post name"]?.title?.[0]?.plain_text ||
    page.properties?.Name?.title?.[0]?.plain_text ||
    "Untitled"
  const excerpt = page.properties?.Excerpt?.rich_text?.[0]?.plain_text || ""
  const publishedAt =
    page.properties?.["Post date original"]?.date?.start ||
    page.properties?.["New post date"]?.date?.start ||
    page.created_time
  const featuredImage =
    page.cover?.external?.url ||
    page.cover?.file?.url ||
    page.properties?.["Photo URL"]?.url ||
    "/images/book-post.jpg"
  const tags = page.properties?.["讀書心得"]?.multi_select?.map((t) => t.name) || []
  const readingTime = page.properties?.["Reading Time"]?.number || null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: title,
    description: excerpt,
    image: featuredImage,
    datePublished: publishedAt,
    author: { "@type": "Person", name: "Yilung C" },
    publisher: { "@type": "Person", name: "Yilung C" },
    mainEntityOfPage: `https://yilungc.com/book-reviews/${params.id}`,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background theme-book-reviews">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="flex-grow">
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/book-reviews"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>回到閱讀筆記</span>
              </Link>

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                {title}
              </h1>

              <div className="flex items-center space-x-6 text-white/90">
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

      <Footer />
    </div>
  )
}
