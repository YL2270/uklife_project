// app/feed.xml/route.js
// RSS 2.0 feed：UK Life + 書評最新 20 篇，給 RSS 閱讀器訂閱用
// 只放 excerpt（不抓整篇內文，省 Notion API 呼叫）

import { getPostsByCategory } from "../../lib/db"

const SITE_URL = "https://yilungc.com"

export const revalidate = 600 // 跟全站 ISR 一致

// XML escape：中文標題常含 &，不 escape 會讓 feed parse error
function escapeXml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const [life, books] = await Promise.all([
    getPostsByCategory("uklife"),
    getPostsByCategory("book-reviews"),
  ])

  const posts = [...life, ...books]
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, 20)

  const items = posts
    .map((post) => {
      const path = post.category === "book-reviews" ? "book-reviews" : "uklife"
      const url = `${SITE_URL}/${path}/${post.slug || post.id}`
      const description = post.metaDescription || post.excerpt || ""
      const pubDate = new Date(post.published_at).toUTCString()

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>YL 英國生活＆閱讀筆記</title>
    <link>${SITE_URL}</link>
    <description>英倫育兒、英國教育、親子旅遊與閱讀筆記</description>
    <language>zh-Hant</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
