import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
// 確保您在 '../../../../lib/utils' 中有這個 getCategoryCounts 函數
// import { getCategoryCounts } from '../../../../lib/utils'; 

export const runtime = "nodejs"; 
export const dynamic = "force-dynamic"; 

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 🎯 設定您的目標資料庫 ID 和篩選狀態
const TARGET_DATABASE_ID = '21f65d1f6c1c8068a79fc22a0ef8abd8'; // 您的主資料庫 ID
const FILTER_STATUS = 'Book'; // 篩選 Status 屬性為 'Book'
const CATEGORY_PROPERTY_NAME = '讀書心得'; // 篩選分類標籤的屬性名稱 

// ----------------------------------------------------
// 處理 Notion API 分頁迭代的函數 (確保抓取所有文章)
// ----------------------------------------------------
async function fetchAllFilteredPosts() {
    let allPosts = [];
    let cursor = undefined;
    let requestCount = 0; 
    
    while (true) {
        if (requestCount >= 50) {
            console.warn("Reached max request limit (50). Stopping pagination for Book Review categories.");
            break; 
        }

        try { 
            const response = await notion.databases.query({
                database_id: TARGET_DATABASE_ID,
                start_cursor: cursor, 
                page_size: 100, // Notion API 最大值
                
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

            allPosts.push(...response.results);
            requestCount++; 

            if (!response.has_more) {
                break;
            }
            cursor = response.next_cursor; 

        } catch (error) {
            // 發生 API 錯誤時，記錄錯誤並停止分頁
            console.error(`Notion API 分頁失敗 (Request ${requestCount + 1}):`, error.message);
            break; 
        }
    }
    
    return allPosts;
}
// ----------------------------------------------------


export async function GET() {
    try {
        // 1. 使用分頁函數抓取所有符合條件的文章
        const posts = await fetchAllFilteredPosts();

        // 2. 計算分類計數
        // getCategoryCounts 函數應處理 posts，並回傳格式化後的分類數據
        const categoryCounts = getCategoryCounts(posts, CATEGORY_PROPERTY_NAME);

        return NextResponse.json({
            success: true,
            data: {
                categories: categoryCounts, // 包含分類名稱和計數
                count: posts.length // 文章總數
            }
        });

    } catch (error) {
        console.error('API Error in GET for Book Reviews Categories:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}


