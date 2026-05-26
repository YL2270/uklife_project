// lib/parent-categories.js
// 母分類定義：4 個母分類各自涵蓋的子標籤（Chinese prefix 清單）
// 比對規則：取 tag 的中文前綴（第一個空格前）做 exact match，不用 substring match
// 例：tag "倫敦育兒 Raising kids in London" → prefix "倫敦育兒"

export const PARENT_CATEGORIES = {
  "raising-kids": {
    label: "親子育兒",
    description: "倫敦育兒、英國私校、海外家庭、母職 — 一個旅英母親的育兒實錄。",
    chineseTags: ["親子育兒", "倫敦育兒", "英國私校", "海外家庭", "母職"],
  },
  "travel-with-kids": {
    label: "親子旅遊",
    description: "英倫、海外、台灣親子遊全紀錄。",
    chineseTags: ["親子旅遊", "英倫親子遊", "海外親子遊", "台灣親子遊"],
  },
  london: {
    label: "倫敦",
    description: "倫敦美食、倫敦總有新鮮事 — 一個倫敦居民的城市筆記。",
    chineseTags: ["倫敦", "倫敦美食", "倫敦總有新鮮事"],
  },
  "personal-thoughts": {
    label: "個人所思",
    description: "在家創業、感情生活、居家生活、健康生活、人生與自我。",
    chineseTags: [
      "個人所思",
      "在家創業",
      "感情生活",
      "居家生活",
      "健康生活",
      "人生與自我",
    ],
  },
}

// 取 tag 的中文前綴（第一個空格前的字串）
// 例："倫敦美食 London restaurants" → "倫敦美食"
export function getChinesePrefix(tag) {
  return (tag || "").split(" ")[0]
}

// 判斷某篇 post 是否屬於這個母分類
// chineseList：母分類的 chineseTags 陣列
export function postMatchesAnyChinese(post, chineseList) {
  const tags = post.tags || []
  return tags.some((t) => chineseList.includes(getChinesePrefix(t)))
}
