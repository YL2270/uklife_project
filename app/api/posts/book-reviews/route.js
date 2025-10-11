import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// 假設 generateSlug 在您的 lib/utils 中，如果報錯，您可能需要將其內嵌。
import { generateSlug } from '../../../../lib/utils'; 

export const runtime = "nodejs"; 
export const dynamic = "force-dynamic"; 

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 🎯 設定您的目標資料庫 ID 和篩選條件
const TARGET_DATABASE_ID = '21f65d1f6c1c8068a79fc22a0ef8abd8'; // 您的主資料庫 ID
const FILTER_STATUS = 'Book'; // 篩選 Status 屬性為 'Book'
const CATEGORY_PROPERTY_NAME = '讀書心得'; // 篩選分類標籤的屬性名稱 (已修正)
const POSTS_PER_PAGE = 10; // 每頁顯示的文章數

// ----------------------------------------------------
// 處理 Notion API 分頁迭代的函數 (僅抓取當前頁的文章)
// ----------------------------------------------------
async function fetchFilteredPosts(cursor) {
    // 獲取第一頁 (或指定 cursor 的頁面) 的文章
    const response = await notion.databases.query({
        database_id: TARGET_DATABASE_ID,
        start_cursor: cursor, 
        page_size: POSTS_PER_PAGE, 
        
        // 篩選條件：必須是 'Book' 狀態的文章
        filter: {
            property: 'Status',
            status: { 
                equals: FILTER_STATUS 
            }
        },
        
        // 排序：確保最新的文章在前
        sorts: [
            {
                property: 'Last edited time',
                direction: 'descending'
            }
        ]
    });
    
    // 檢查是否有更多的文章
    const hasMore = response.has_more;
    const nextCursor = response.next_cursor;

    // 將 Notion 返回的 results 轉換為前端所需的格式
    const formattedPosts = response.results.map(post => {
        const title = post.properties?.Name?.title?.[0]?.plain_text || 
                      post.properties?.['Post name']?.title?.[0]?.plain_text || 
                      'Untitled';
                      
        return {
            id: post.id,
            title: title,
            slug: generateSlug(title), // 假設 generateSlug 可用
            category: 'book-reviews',
            // --- 提取關鍵屬性 ---
            featured_image: post.cover?.file?.url || 
                            post.cover?.external?.url || 
                            post.properties?.['Photo URL']?.url || // 假設您有一個名為 'Photo URL' 的屬性
                            null,
            published_at: post.properties?.['Post date original']?.date?.start || 
                          post.properties?.['Created time']?.created_time ||
                          post.last_edited_time,
            tags: post.properties?.[CATEGORY_PROPERTY_NAME]?.multi_select?.map(cat => cat.name) || [],
            pinned: post.properties?.Pinned?.checkbox || false, // 假設您有一個 Pinned 屬性
            excerpt: post.properties?.Excerpt?.rich_text?.[0]?.plain_text || '', // 假設您有一個 Excerpt 屬性
            rawProperties: post.properties
        };
    });

    return {
        posts: formattedPosts,
        hasMore,
        nextCursor
    };
}
// ----------------------------------------------------

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    // 獲取分頁所需的 cursor 參數
    const cursor = searchParams.get("cursor") || undefined;

    try {
        const { posts, hasMore, nextCursor } = await fetchFilteredPosts(cursor);

        return NextResponse.json({
            success: true,
            data: {
                posts: posts,
                hasMore: hasMore, // 是否還有下一頁
                nextCursor: nextCursor // 下一頁的游標
            }
        });

    } catch (error) {
        console.error('API Error in GET for Book Reviews Posts:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
