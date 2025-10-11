import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
// 確保您在 '../../../../lib/utils' 中有這個 getCategoryCounts 函數
import { getCategoryCounts } from '../../../../lib/utils'; 

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












{/*

// app/api/categories/book-review/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// [新增] 引入處理分類的工具函數 (getCategoryCounts)，確保路徑正確
import { getCategoryCounts } from '../../../../lib/utils'; 

// 🎯 設定您的目標資料庫 ID 和篩選狀態
// [新增] 您的資料庫 ID
const TARGET_DATABASE_ID = '21f65d1f6c1c8068a79fc22a0ef8abd8'; 
// [新增] 狀態名稱為 'Book'
const FILTER_STATUS = 'Book'; 
// [新增] 請確認您的分類屬性名稱是否為 '閱讀筆記分類'
const CATEGORY_PROPERTY_NAME = '讀書心得'; 

{/*
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  const filterStatus = "Book"; // Hardcoded to filter for Book 

   if (!pageId) {
    return NextResponse.json(
      { error: "Missing pageId parameter." },
      { status: 400 }
    );
  }
  */}

// ----------------------------------------------------
// [新增] 處理 Notion API 分頁迭代的函數 (確保文章總數正確)
// ----------------------------------------------------
/*
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
                page_size: 100, 
                
                // 篩選條件：必須是 'Book' 狀態的文章
                filter: {
                    property: 'Status',
                    status: { 
                        equals: FILTER_STATUS 
                    }
                },
                
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
            console.error(`Notion API 分頁失敗 (Request ${requestCount + 1}):`, error.message);
            break; 
        }
    }
    
    return allPosts;
}
// ----------------------------------------------------
export async function GET() {

  try {

    try {
        // 1. 使用分頁函數抓取所有符合 'Book' 狀態的文章
        const posts = await fetchAllFilteredPosts();

        // 2. 初始化分類計數的 Map
        const categoryMap = new Map();
        const CATEGORY_PROPERTY_NAME = '閱讀筆記分類'; // 請再次確認這個屬性名是正確的

        // 3. 遍歷文章並計算分類數量
        posts.forEach(post => {
            // 由於文章中可能有多個分類，我們使用 multi_select
            const categories = post.properties?.[CATEGORY_PROPERTY_NAME]?.multi_select;
            if (categories && Array.isArray(categories)) {
                categories.forEach(category => {
                    const count = categoryMap.get(category.name) || 0;
                    categoryMap.set(category.name, count + 1);
                });
            }
        });

        // 4. 格式化輸出
        const formattedCategories = {};
        categoryMap.forEach((count, name) => {
            formattedCategories[name] = { 
                name, 
                count 
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                filteredStatus: 'Book',
                categories: formattedCategories,
                count: posts.length
            }
        }, { status: 200 });
// } catch (err) {
// ... (保留原本的 catch 區塊)
    
    {/*
    // Fetch all blocks to find child databases
    const allBlocks = await fetchAllBlocks(pageId);
    const childDatabases = allBlocks.filter(block => block.type === "child_database");

    // Initialize category structure
    const categories = {
      propertyTypes: {
        ukProperty: { name: "英國房產", type: "multi_select", options: [] },
        lifeOther: { name: "人生其他", type: "multi_select", options: [] },
        readingNotes: { name: "讀書心得", type: "multi_select", options: [] },
        platform: { name: "Platform", type: "multi_select", options: [] },
        label: { name: "Label", type: "select", options: [] }
      },
      usedCategories: new Set() // Track used category names to avoid duplicates
    };

    // Process each database
    for (const dbBlock of childDatabases) {
      const dbId = dbBlock.id;
      
      // First query the database for pages with Life status
      const queryResponse = await notion.databases.query({
        database_id: dbId,
        filter: {
          property: "Status",
          status: { equals: filterStatus }
        }
      });

      // If no pages with Life status, skip this database
      if (queryResponse.results.length === 0) continue;

      // Get the database schema
      const db = await notion.databases.retrieve({ database_id: dbId });
      
      // Process each property we care about
      for (const [propKey, propConfig] of Object.entries(categories.propertyTypes)) {
        const prop = db.properties[propConfig.name];
        if (prop && prop.type === propConfig.type) {
          // Only add options that are actually used in the filtered pages
          const usedOptions = new Set();
          
          // Check which options are used in the filtered pages
          for (const page of queryResponse.results) {
            const propValue = page.properties[propConfig.name];
            if (propValue) {
              if (propValue.type === 'multi_select' && propValue.multi_select) {
                propValue.multi_select.forEach(opt => usedOptions.add(opt.id));
              } else if (propValue.type === 'select' && propValue.select) {
                usedOptions.add(propValue.select.id);
              }
            }
          }

          // Then modify the option adding logic:
          prop[prop.type].options.forEach(option => {
            if (usedOptions.has(option.id) && isValidNotionId(option.id)) {
              if (!categories.usedCategories.has(option.name)) {
                categories.propertyTypes[propKey].options.push(option);
                categories.usedCategories.add(option.name);
              }
            }
          });
        }
      }
    }

    // Sort options alphabetically by name
    for (const propData of Object.values(categories.propertyTypes)) {
      propData.options.sort((a, b) => a.name.localeCompare(b.name));
    }

    // In your try block, modify the final response:
    return NextResponse.json({
      success: true,
      data: {
        filteredStatus: filterStatus,
        categories: Object.fromEntries(
          Object.entries(categories.propertyTypes)
            .filter(([_, propData]) => propData.options.length > 0)
            .map(([key, propData]) => [
              key,
              {
                ...propData,
                options: propData.options.map(option => ({
                  ...option,
                  englishName: option.name.split(' ').pop(), // Extract English name
                  chineseName: option.name.split(' ')[0]    // Extract Chinese name
                }))
              }
            ])
        )
      }
    }, { status: 200 });

    */}
        /*
  } catch (err) {
    console.error("Notion API error:", err);
    return NextResponse.json({ 
      success: false,
      error: err.message 
    }, { status: 500 });
  }
}



// Add this helper function at the top
function isValidNotionId(id) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}



// Reuse your existing helper functions
async function fetchAllBlocks(blockId, startCursor = undefined) {
  let allBlocks = [];
  let cursor = startCursor;

  while (true) {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    allBlocks.push(...resp.results);
    if (!resp.has_more) break;
    cursor = resp.next_cursor;
  }

  for (const block of allBlocks) {
    if (block.has_children) {
      const childBlocks = await fetchAllBlocks(block.id);
      //block.content = childBlocks.map((b) => b.id);
      allBlocks = allBlocks.concat(childBlocks);
    } else {
      block.content = [];
    }
  }

  return dedupeBlocks(allBlocks);
}

function dedupeBlocks(blocks) {
  const map = new Map();
  for (const b of blocks) {
    map.set(b.id, b);
  }
  return Array.from(map.values());
}
*/
      
  
