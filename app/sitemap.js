// app/sitemap.js
// 自動產生 sitemap.xml，讓 Google 能爬到你所有文章
// 訪問 https://yilungc.com/sitemap.xml 會看到

import { getAllPublishedPostIds } from "../lib/db"

export default async function sitemap() {
  const baseUrl = "https://yilungc.com"

  // 靜態頁
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/uklife`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/book-reviews`, lastModified: new Date(), priority: 0.9 },
  ]

  // 動態抓所有文章
  let postUrls = []
  try {
    const posts = await getAllPublishedPostIds()
    postUrls = posts.map((p) => ({
      url: `${baseUrl}/${p.category}/${p.id}`,
      lastModified: new Date(p.lastModified),
      priority: 0.7,
    }))
  } catch (error) {
    console.error("sitemap: failed to fetch posts", error)
  }

  return [...staticPages, ...postUrls]
}
