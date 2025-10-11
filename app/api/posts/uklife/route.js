

import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { generateSlug } from '../../../../lib/utils'

export const dynamic = 'force-dynamic' // Disable all caching
// export const runtime = 'edge' // Optional: Better for Notion API

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// 🎯 設定您的目標資料庫 ID 和篩選狀態
const TARGET_DATABASE_ID = '21f65d1f-6c1c-8068-a79f-c22a0ef8abd8'; // 您的 SEO post 資料庫 ID
const FILTER_STATUS = 'Life'; // 假設 'Life' 是 UK Life 頁面所需的狀態

// ----------------------------------------------------
// 新增：處理 Notion API 分頁迭代的函數
// ----------------------------------------------------
async function fetchAllFilteredPosts() {
    let allPosts = [];
    let cursor = undefined;
    let requestCount = 0; // 新增請求計數器，用於錯誤日誌
    
    while (true) {
        // 增加一個安全機制，避免無限迴圈
        if (requestCount >= 50) {
            console.warn("Reached max request limit. Stopping pagination.");
            break; 
        }
        try {
        const response = await notion.databases.query({
            database_id: TARGET_DATABASE_ID,
            start_cursor: cursor, // 從上一個請求的結束點開始
            page_size: 100, // 最大頁面大小
            
            // 篩選條件：必須是 'Life' 狀態的文章
            filter: {
                property: 'Status',
                status: {
                    equals: FILTER_STATUS
                }
            },
            
            // 排序：確保最新的文章在前
            sorts: [
                {
                    property: 'Last edited time', // 請確保您的資料庫有這個屬性名稱
                    direction: 'descending'
                }
            ]
        });

        allPosts.push(...response.results); // 累積結果

            // 增加一個安全機制，避免無限迴圈
        if (requestCount >= 50) {
            console.warn("Reached max request limit. Stopping pagination.");
            break; 
        }
        
        // 檢查是否還有更多頁面
        if (!response.has_more) {
            break; 
        }
        cursor = response.next_cursor; // 更新下一次查詢的起點
    }
    catch (error) {
            // 🚨 捕捉分頁中的 API 錯誤。如果分頁失敗，我們會在此記錄錯誤並停止。
            console.error(`Notion API 分頁失敗 (Request ${requestCount + 1}):`, error.message);
            // 關鍵：如果 API 報錯，我們強制停止，避免無限迴圈。
            break; 
    }
    }
    
    return allPosts;
}
// ----------------------------------------------------

{/* export async function GET() {
  try {
    // 1. Get the UK Life page
    const pageId = '21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'
    const { results: blocks } = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    })

    // 2. Find all child databases
    const databases = blocks.filter(b => b.type === 'child_database')
    if (!databases.length) {
      return NextResponse.json(
        { error: 'No databases found' },
        { status: 404 }
      )
    }

    // 3. Query each database for matching posts
    let posts = []
    for (const db of databases) {
      try {
        const { results } = await notion.databases.query({
          database_id: db.id,
          filter: {
            property: 'Status',
            status: {
              equals: 'Life'
            }
          }
        })
        posts = [...posts, ...results]
      } catch (dbError) {
        console.error(`Error querying database ${db.id}:`, dbError)
      }
    }

    // 4. Format the posts
    const formattedPosts = posts.map(post => {
      const title = post.properties?.Name?.title?.[0]?.plain_text || 
                   post.properties?.['Post name']?.title?.[0]?.plain_text || 
                   'Untitled'

                   */}

      // console.log("Post Data: ", post);

export async function GET() {
    try {
        // 1. 使用新的函數抓取所有符合條件的文章
        const posts = await fetchAllFilteredPosts();

        // 2. 格式化文章 (保留您的原有邏輯)
        const formattedPosts = posts.map(post => {
            const title = post.properties?.Name?.title?.[0]?.plain_text || 
                         post.properties?.['Post name']?.title?.[0]?.plain_text || 
                         'Untitled'
            
      
      return {
        id: post.id,
        title: title,
        slug: generateSlug(title),
        url: post.properties?.['Post URL']?.url || post.url,
        featured_image: post.cover?.file?.url || 
                      post.cover?.external?.url || 
                      post.properties?.['Photo URL']?.url ||
                      null,
        published_at: post.properties?.['Post date original']?.date?.start || 
                    post.properties?.['Created time']?.created_time ||
                    post.last_edited_time,
        category: 'uklife',
        tags: post.properties?.['人生其他']?.multi_select?.map(cat => cat.name) || [],
        pinned: post.properties?.Pinned?.checkbox || false,
        excerpt: post.properties?.Excerpt?.rich_text?.[0]?.plain_text || '',
        content: '',
        rawProperties: post.properties
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        posts: formattedPosts,
        count: formattedPosts.length
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
