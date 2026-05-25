// app/uklife/page.jsx
// 列表頁：直接在 server 端從 Notion 抓資料，用 ISR 快取 10 分鐘
// 解決：
// 1. 「No UK life stories yet」 - 因為直接從 Notion 抓，不再依賴空的 cache
// 2. 100+ 篇截斷 - 用 lib/db.js 內建分頁
// 3. 速度慢 - ISR 把第一次以後的請求都從快取出，秒開

import UKLifeClientPage from "./UKLifeClientPage"
import { getPostsByCategory } from "../../lib/db"

export const revalidate = 600 // 10 分鐘

export const metadata = {
  title: "英國生活",
  description: "YL 在倫敦的英倫育兒、英國教育、親子旅遊與生活分享。",
  openGraph: {
    title: "YL 英國生活",
    description: "在倫敦的台灣媽媽分享：英倫育兒、英國教育、親子旅遊。",
    url: "https://yilungc.com/uklife",
    images: ["/images/uk_life_header_image.JPG"],
  },
}

export default async function UKLifePage() {
  const posts = await getPostsByCategory("uklife")

  // 從 posts 萃取所有用過的 sub topics
  const subTopicCount = new Map()
  posts.forEach((post) => {
    const primaryTag = post.tags?.[0] || "General"
    subTopicCount.set(primaryTag, (subTopicCount.get(primaryTag) || 0) + 1)
  })
  const subTopics = Array.from(subTopicCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t)

  return <UKLifeClientPage initialPosts={posts} initialUniqueSubTopics={subTopics} />
}
