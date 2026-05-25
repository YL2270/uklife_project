// app/uklife/[id]/page.jsx
// V2 改動：
// 1. 加上 <Header /> （上一輪漏了）
// 2. Tags 可點擊（變成 Link）
// 3. 加上 Footer

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostWithBlocks } from "../../../lib/db"
import { NotionBlocks } from "../../../lib/notion-blocks"
import { formatDate } from "../../../lib/utils"
import { Calendar, ArrowLeft, Tag } from "lucide-react"
import Header from "../../../components/header"
import Footer from "../../../components/footer"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const data = await getPostWithBlocks(params.id)
  if (!data) {
    return { title: "Story Not Found | yilungc" }
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
    title: `${title} | YL 英國生活`,
    description: excerpt || `${title} - YL 在倫敦的生活分享`,
    openGraph: {
      title,
      description: excerpt,
      url: `https://yilungc.com/uklife/${params.id}`,
      siteName: "YL 英國生活",
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
      canonical: `https://yilungc.com/uklife/${params.id}`,
    },
  }
}

export default async function UKLifeArticle({ params }) {
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
    "/images/uk_life_header_image.JPG"
  const tags = page.properties?.["人生其他"]?.multi_select?.map((t) => t.name) || []

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: featuredImage,
    datePublished: publishedAt,
    author: { "@type": "Person", name: "Yilung C" },
    publisher: { "@type": "Person", name: "Yilung C" },
    mainEntityOfPage: `https://yilungc.com/uklife/${params.id}`,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background theme-uk-life">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="flex-grow">
        {/* Hero */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/uklife"
                className="inline-flex items-center space-x-2 text-background/80 hover:text-background mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>回到 UK Life</span>
              </Link>

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-background mb-4 leading-tight">
                {title}
              </h1>

              <div className="flex items-center space-x-6 text-background/90">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 內文 */}
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

            {/* 可點擊的 Tags */}
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
                      href={`/uklife/categories/${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full hover:bg-secondary/20 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/uklife"
                className="inline-flex items-center space-x-2 text-secondary hover:text-primary font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>看更多英國生活</span>
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  )
}
