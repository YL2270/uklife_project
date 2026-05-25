// lib/db.js
// 直接從 Notion 抓資料，內建分頁（解決 100+ 篇不全的 bug）
// 所有頁面都用這個檔的 functions，不要再用 webhook cache

import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// 你文章所在的 Notion database ID
const POSTS_DB_ID = "21f65d1f6c1c8068a79fc22a0ef8abd8"

// 每篇文章對應的 Status 值
const STATUS_MAP = {
  uklife: "Life",
  "book-reviews": "Book",
}

// 每篇文章的 multi_select 分類欄位名稱
const CATEGORY_PROPERTY_MAP = {
  uklife: "人生其他",
  "book-reviews": "讀書心得",
}

// ─────────────────────────────────────────────────────────────
// 內部 helper：分頁迴圈抓完整 database
// ─────────────────────────────────────────────────────────────

async function queryDatabaseWithPagination(filter, sorts) {
  const allPosts = []
  let cursor = undefined
  let safety = 0

  while (true) {
    if (safety++ > 50) {
      console.warn("queryDatabaseWithPagination: reached safety limit of 50 pages")
      break
    }

    const response = await notion.databases.query({
      database_id: POSTS_DB_ID,
      start_cursor: cursor,
      page_size: 100,
      filter,
      sorts,
    })

    allPosts.push(...response.results)

    if (!response.has_more) break
    cursor = response.next_cursor
  }

  return allPosts
}

// 把 Notion 原始 page object 轉成乾淨的前端用 post 物件
function formatPost(page, category) {
  const title =
    page.properties?.["Post name"]?.title?.[0]?.plain_text ||
    page.properties?.Name?.title?.[0]?.plain_text ||
    "Untitled"

  const tagsProperty = CATEGORY_PROPERTY_MAP[category]
  const tags = page.properties?.[tagsProperty]?.multi_select?.map((t) => t.name) || []

  return {
    id: page.id,
    title,
    excerpt: page.properties?.Excerpt?.rich_text?.[0]?.plain_text || "",
    featured_image:
      page.cover?.external?.url ||
      page.cover?.file?.url ||
      page.properties?.["Photo URL"]?.url ||
      null,
    published_at:
      page.properties?.["Post date original"]?.date?.start ||
      page.properties?.["New post date"]?.date?.start ||
      page.created_time,
    tags,
    pinned: page.properties?.Pinned?.checkbox || false,
    readingTime: page.properties?.["Reading Time"]?.number || null,
    category,
    rawProperties: page.properties,
  }
}

// ─────────────────────────────────────────────────────────────
// 對外 API：列表頁用
// ─────────────────────────────────────────────────────────────

// 抓某分類下所有文章（uklife or book-reviews）
export async function getPostsByCategory(category) {
  const status = STATUS_MAP[category]
  if (!status) {
    console.warn(`Unknown category: ${category}`)
    return []
  }

  try {
    const pages = await queryDatabaseWithPagination(
      {
        property: "Status",
        status: { equals: status },
      },
      [{ property: "Last edited time", direction: "descending" }]
    )

    return pages.map((page) => formatPost(page, category))
  } catch (error) {
    console.error(`getPostsByCategory(${category}) failed:`, error.message)
    return []
  }
}

// 抓某分類下某個子分類的文章
export async function getPostsByCategoryAndTag(category, tagName) {
  const status = STATUS_MAP[category]
  const tagProperty = CATEGORY_PROPERTY_MAP[category]
  if (!status || !tagProperty) return []

  try {
    const pages = await queryDatabaseWithPagination(
      {
        and: [
          { property: "Status", status: { equals: status } },
          { property: tagProperty, multi_select: { contains: tagName } },
        ],
      },
      [{ property: "Last edited time", direction: "descending" }]
    )

    return pages.map((page) => formatPost(page, category))
  } catch (error) {
    console.error(`getPostsByCategoryAndTag failed:`, error.message)
    return []
  }
}

// 抓所有子分類（給 header 用，但其實 header 寫死，這個目前沒人用）
export async function getUniqueSubTopics(category) {
  const posts = await getPostsByCategory(category)
  const tagSet = new Set()
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

// ─────────────────────────────────────────────────────────────
// 對外 API：文章內頁用
// ─────────────────────────────────────────────────────────────

// 抓單篇文章的 metadata + 所有 blocks (含分頁，解決 8000 字 bug)
export async function getPostWithBlocks(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId })
    const blocks = await getAllBlocks(pageId)

    return { page, blocks }
  } catch (error) {
    console.error(`getPostWithBlocks(${pageId}) failed:`, error.message)
    return null
  }
}

// 遞迴抓完整 blocks（含 nested children），所有層都分頁
async function getAllBlocks(blockId) {
  const allBlocks = []
  let cursor = undefined

  while (true) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })

    for (const block of response.results) {
      allBlocks.push(block)
      // 若這個 block 有子 block（如 toggle, column 等），遞迴抓
      if (block.has_children) {
        block.children = await getAllBlocks(block.id)
      }
    }

    if (!response.has_more) break
    cursor = response.next_cursor
  }

  return allBlocks
}

// 給 sitemap 用：抓所有發布文章的 (id, lastEdited)
export async function getAllPublishedPostIds() {
  const uklife = await getPostsByCategory("uklife")
  const books = await getPostsByCategory("book-reviews")
  return [
    ...uklife.map((p) => ({ id: p.id, category: "uklife", lastModified: p.published_at })),
    ...books.map((p) => ({ id: p.id, category: "book-reviews", lastModified: p.published_at })),
  ]
}
