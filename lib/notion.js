// lib/notion.js
// 簡化：拿掉 fallback dummy client（因為現在 Vercel 上 env 一定有 key）
// 直接導出 client，沒設 key 就讓它在啟動時報錯（比靜默失敗好）

import { Client } from "@notionhq/client"

if (!process.env.NOTION_API_KEY) {
  throw new Error(
    "NOTION_API_KEY is not set. Please configure it in Vercel Environment Variables."
  )
}

export const Notion = new Client({
  auth: process.env.NOTION_API_KEY,
})
