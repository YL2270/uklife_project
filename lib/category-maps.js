// lib/category-maps.js
// Google My Maps embed URLs for travel category pages
// Format: "分類名稱（與 Notion tag 完全相同）": "embed URL"
//
// 取得 embed URL 的方法：
// 1. 開你的 Google My Maps
// 2. 左上角 ⋮ → 嵌入我的地圖
// 3. 複製 src="..." 裡面的網址貼到這裡

export const CATEGORY_MAPS = {
  // 英倫親子遊: "https://www.google.com/maps/d/embed?mid=YOUR_MAP_ID_HERE",
  // 英倫下午茶特輯: "https://www.google.com/maps/d/embed?mid=ANOTHER_MAP_ID",
}

export function getMapForCategory(slug) {
  return CATEGORY_MAPS[slug] || null
}
