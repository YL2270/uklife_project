// import { NextResponse } from "next/server"

// export const dynamic = "force-dynamic"

// // Import cache from webhook
// let postsCache = {
//   "book-reviews": [],
//   uklife: [],
//   lastUpdated: null,
// }

// export async function GET(request) {
//   try {
//     // Try to get cache from webhook module
//     try {
//       const webhookModule = await import("../../webhook/make-posts/route.js")
//       postsCache = webhookModule.postsCache
//     } catch (e) {
//       console.log("Could not import cache, using empty cache")
//     }

//     const { searchParams } = new URL(request.url)
//     const limit = Number.parseInt(searchParams.get("limit")) || 50

//     let posts = postsCache["book-reviews"] || []
//     posts = posts.slice(0, limit)
//     posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

//     const allTags = posts.flatMap((post) => post.tags || [])
//     const uniqueTags = [...new Set(allTags)].filter(Boolean)

//     return NextResponse.json({
//       success: true,
//       posts: posts,
//       uniqueTags: uniqueTags,
//       count: posts.length,
//       category: "book-reviews",
//       source: "make.com",
//     })
//   } catch (error) {
//     console.error("Error fetching book review posts:", error)
//     return NextResponse.json({ error: "Failed to fetch book review posts" }, { status: 500 })
//   }
// }








// // // import { NextResponse } from "next/server"

// // // export const dynamic = "force-dynamic"

// // // // Import cache from webhook
// // // let postsCache = {
// // //   "book-reviews": [],
// // //   uklife: [],
// // //   lastUpdated: null,
// // // }

// // // export async function GET(request) {
// // //   try {
// // //     // Try to get cache from webhook module
// // //     try {
// // //       const webhookModule = await import("../../webhook/make-posts/route.js")
// // //       postsCache = webhookModule.postsCache
// // //     } catch (e) {
// // //       console.log("Could not import cache, using empty cache")
// // //     }

// // //     const { searchParams } = new URL(request.url)
// // //     const limit = Number.parseInt(searchParams.get("limit")) || 50

// // //     let posts = postsCache["uklife"] || []
// // //     posts = posts.slice(0, limit)
// // //     posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

// // //     const allSubTopics = posts.map((post) => post.sub_topic).filter(Boolean)
// // //     const uniqueSubTopics = [...new Set(allSubTopics)]

// // //     return NextResponse.json({
// // //       success: true,
// // //       posts: posts,
// // //       uniqueSubTopics: uniqueSubTopics,
// // //       count: posts.length,
// // //       category: "uklife",
// // //       source: "make.com",
// // //     })
// // //   } catch (error) {
// // //     console.error("Error fetching UK life posts:", error)
// // //     return NextResponse.json({ error: "Failed to fetch UK life posts" }, { status: 500 })
// // //   }
// // // }


















// // // app/api/posts/route.js
// // import { NextResponse } from "next/server";
// // import { Client } from "@notionhq/client";

// // export const runtime = "nodejs";
// // export const dynamic = "force-dynamic";

// // const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // export async function GET(request) {
// //   const { searchParams } = new URL(request.url);
// //   const categoryId = searchParams.get("categoryId");
// //   const pageId = process.env.SEO_POSTS_PAGE; // Your root page ID

// //   if (!categoryId) {
// //     return NextResponse.json(
// //       { error: "Missing categoryId parameter." },
// //       { status: 400 }
// //     );
// //   }

// //   try {
// //     // Fetch all blocks to find child databases
// //     const allBlocks = await fetchAllBlocks(pageId);
// //     const childDatabases = allBlocks.filter(block => block.type === "child_database");

// //     let filteredPosts = [];
    
// //     // Search through each database for posts with this category
// //     for (const dbBlock of childDatabases) {
// //       const dbId = dbBlock.id;
      
// //       // Query the database for pages containing this category
// //       const queryResponse = await notion.databases.query({
// //         database_id: dbId,
// //         filter: {
// //           or: [
// //             // Check multi_select properties
// //             {
// //               property: "英國房產",
// //               multi_select: { contains: categoryId }
// //             },
// //             {
// //               property: "人生其他",
// //               multi_select: { contains: categoryId }
// //             },
// //             {
// //               property: "讀書心得",
// //               multi_select: { contains: categoryId }
// //             },
// //             // Check select property
// //             {
// //               property: "Label",
// //               select: { equals: categoryId }
// //             }
// //           ]
// //         }
// //       });

// //       if (queryResponse.results.length > 0) {
// //         filteredPosts = [
// //           ...filteredPosts,
// //           ...queryResponse.results.map(page => ({
// //             id: page.id,
// //             title: page.properties["Post name"]?.title?.[0]?.plain_text || "Untitled",
// //             url: page.properties["Post URL"]?.url || null,
// //             date: page.properties["Post date original"]?.date?.start || null,
// //             category: categoryId
// //           }))
// //         ];
// //       }
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data: {
// //         categoryId,
// //         posts: filteredPosts,
// //         count: filteredPosts.length
// //       }
// //     }, { status: 200 });

// //   } catch (err) {
// //     console.error("Notion API error:", err);
// //     return NextResponse.json({ 
// //       success: false,
// //       error: err.message 
// //     }, { status: 500 });
// //   }
// // }

// // // Reuse your existing helper functions
// // async function fetchAllBlocks(blockId, startCursor = undefined) {
// //   let allBlocks = [];
// //   let cursor = startCursor;

// //   while (true) {
// //     const resp = await notion.blocks.children.list({
// //       block_id: blockId,
// //       start_cursor: cursor,
// //       page_size: 100,
// //     });
// //     allBlocks.push(...resp.results);
// //     if (!resp.has_more) break;
// //     cursor = resp.next_cursor;
// //   }

// //   for (const block of allBlocks) {
// //     if (block.has_children) {
// //       const childBlocks = await fetchAllBlocks(block.id);
// //       block.content = childBlocks.map((b) => b.id);
// //       allBlocks = allBlocks.concat(childBlocks);
// //     } else {
// //       block.content = [];
// //     }
// //   }

// //   return dedupeBlocks(allBlocks);
// // }

// // function dedupeBlocks(blocks) {
// //   const map = new Map();
// //   for (const b of blocks) {
// //     map.set(b.id, b);
// //   }
// //   return Array.from(map.values());
// // }












// import { NextResponse } from 'next/server'
// import { Client } from '@notionhq/client'

// import { generateSlug } from '../../../../lib/utils'


// const notion = new Client({ auth: process.env.NOTION_API_KEY })

// export async function GET(request) {
//   const { searchParams } = new URL(request.url)
//   const categoryId = searchParams.get('categoryId')

//   if (!categoryId) {
//     return NextResponse.json(
//       { error: 'Missing categoryId parameter' },
//       { status: 400 }
//     )
//   }

//   try {
//     // 1. Get the UK Life page
//     const pageId = '21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'
//     const { results: blocks } = await notion.blocks.children.list({
//       block_id: pageId,
//       page_size: 100
//     })

//     // 2. Find all child databases (with error handling)
//     const databases = blocks.filter(b => b.type === 'child_database')
//     if (!databases.length) {
//       return NextResponse.json(
//         { error: 'No databases found' },
//         { status: 404 }
//       )
//     }

//     // 3. Query each database for matching posts
//     let posts = []
//     for (const db of databases) {
//       try {
//         const { results } = await notion.databases.query({
//           database_id: db.id,
//           filter: {
//             and: [
//               {
//                 property: 'Status',
//                 status: {
//                   equals: 'Life'
//                 }
//               }
//               // ,
//               // {
//               //   property: '人生其他',
//               //   multi_select: {
//               //     contains: categoryId
//               //   }
//               // }
//             ]
//           }
//         })
//         posts = [...posts, ...results]
//       } catch (dbError) {
//         console.error(`Error querying database ${db.id}:`, dbError)
//       }
//     }


//     // In your API route (app/api/posts/uklife/route.js)
//     const formattedPosts = posts.map(post => {
//       // Extract all needed properties with proper fallbacks
//       const title = post.properties?.Name?.title?.[0]?.plain_text || 
//                   post.properties?.['Post name']?.title?.[0]?.plain_text || 
//                   'Untitled';
      
//       return {
//         id: post.id,
//         title: title,
//         slug: generateSlug(title), // Generate URL-friendly slug
//         url: post.properties?.['Post URL']?.url || post.url,
//         featured_image: post.cover?.file?.url || 
//                       post.cover?.external?.url || 
//                       post.properties?.['Photo URL']?.url ||
//                       null,
//         published_at: post.properties?.['Post date original']?.date?.start || 
//                     post.properties?.['Created time']?.created_time ||
//                     post.last_edited_time,
//         category: 'uklife', // Default category for these posts
//         tags: post.properties?.['人生其他']?.multi_select?.map(cat => cat.name) || [],
//         pinned: post.properties?.Pinned?.checkbox || false,
//         excerpt: post.properties?.Excerpt?.rich_text?.[0]?.plain_text || '',
//         content: '', // You might extract this if needed
//         // Include raw properties if needed for other components
//         rawProperties: post.properties
//       };
//     });

//     // // 4. Format the response
//     // const formattedPosts = posts.map(post => ({
//     //   id: post.id,
//     //   title: post.properties.Name?.title?.[0]?.plain_text || 'Untitled',
//     //   url: post.url,
//     //   cover: post.cover?.file?.url || post.cover?.external?.url || null,
//     //   date: post.properties.Date?.date?.start || null
//     // }))


//     return NextResponse.json({
//       success: true,
//       data: {
//         posts: formattedPosts,
//         count: formattedPosts.length
//       }
//     })

//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     )
//   }
// }








import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { generateSlug } from '../../../../lib/utils'

export const dynamic = 'force-dynamic' // Disable all caching
// export const runtime = 'edge' // Optional: Better for Notion API

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// 🎯 設定您的目標資料庫 ID 和篩選狀態
// 🚨 注意：這裡我們使用經過驗證的正確 ID 格式。
const TARGET_DATABASE_ID = '21f65d1f6c1c8068a79fc22a0ef8abd8'; 
const FILTER_STATUS = 'Book'; // 假設 'Life' 是 UK Life 頁面所需的狀態
const CATEGORY_PROPERTY_NAME = '讀書心得'; // 用於後續格式化文章

// ----------------------------------------------------
// 新增：處理 Notion API 分頁迭代的函數
// ----------------------------------------------------
async function fetchAllFilteredPosts() {
    let allPosts = [];
    let cursor = undefined;
    let requestCount = 0; // 新增請求計數器
    
    while (true) {
        // 增加一個安全機制，避免過多請求
        if (requestCount >= 50) {
            console.warn("Reached max request limit (50). Stopping pagination.");
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
                        property: 'Last edited time',
                        direction: 'descending'
                    }
                ]
            });

            allPosts.push(...response.results); // 累積結果
            requestCount++; // 每次成功請求後遞增計數

            // 檢查是否還有更多頁面
            if (!response.has_more) {
                break; // 停止 while 迴圈
            }
            cursor = response.next_cursor; // 更新下一次查詢的起點

        } catch (error) {
            // 🚨 捕捉分頁中的 API 錯誤。
            console.error(`Notion API 分頁失敗 (Request ${requestCount + 1}):`, error.message);
            break; // 停止 while 迴圈
        }
    }
    
    return allPosts;
}
// ----------------------------------------------------
export async function GET() {
    try {
        // 1. 使用新的函數抓取所有符合條件的文章 (已修復分頁和 Bug)
        const posts = await fetchAllFilteredPosts();

        // 2. 格式化文章
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
                category: 'book-reviews',
                // 這裡使用 '人生其他' 作為標籤屬性
                tags: post.properties?.[CATEGORY_PROPERTY_NAME]?.multi_select?.map(cat => cat.name) || [],
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
        console.error('API Error in GET:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}

{/*
export async function GET() {
  try {
    // 1. Get the UK Life page
    const pageId = '21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'
    // const pageId = '21e65d1f-6c1c-8041-974d-e3eb2c0fed44'
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
              equals: 'Book'
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
        category: 'book-reviews',
        tags: post.properties?.['讀書心得']?.multi_select?.map(cat => cat.name) || [],
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
    */}
