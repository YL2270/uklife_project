// // import { NextResponse } from "next/server";
// // import { Notion } from "../../../../../../lib/notion"; // your Notion client setup

// // export async function GET(request, { params }) {
// //   const { slug } = params; // category slug passed in URL

// //   try {
// //     // Query your Notion database with filters for Status = Life AND Label contains category
// //     const response = await Notion.databases.query({
// //       database_id: "21e65d1f-6c1c-8041-974d-e3eb2c0fed44",
// //       filter: {
// //         and: [
// //           {
// //             property: "Status",
// //             select: {
// //               equals: "Life",
// //             },
// //           },
// //           {
// //             property: "Label", // or the actual category property name
// //             multi_select: {
// //               contains: slug,
// //             },
// //           },
// //         ],
// //       },
// //       sorts: [
// //         {
// //           property: "Post date original",
// //           direction: "descending",
// //         },
// //       ],
// //     });

// //     // Map the results to your desired post shape
// //     const posts = response.results.map((page) => {
// //       return {
// //         id: page.id,
// //         title:
// //           page.properties["Post name"]?.title[0]?.plain_text || "Untitled",
// //         excerpt:
// //           page.properties.Excerpt?.rich_text[0]?.plain_text || "",
// //         published_at: page.properties["Post date original"]?.date?.start || "",
// //         slug: page.id, // or generate slug from title if you want prettier URLs
// //         featured_image: page.properties["Photo URL"]?.url || null,
// //       };
// //     });

// //     return NextResponse.json({ success: true, data: posts });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }








// import { NextResponse } from "next/server";
// import { Notion } from "../../../../../../lib/notion"; // Notion client setup

// export async function GET(request, { params }) {
//   const { slug } = params;

//   try {
//     const response = await Notion.databases.query({
//       database_id: "21e65d1f6c1c801b9e7dd48fe01b17c8",
//       filter: {
//         and: [
//           {
//             property: "Status",
//             status: {
//               equals: "Life", // ✅ Correct usage for `status` type
//             },
//           },
//           {
//             property: "Label",
//             multi_select: {
//               contains: slug, // ✅ Correct usage for `multi_select` type
//             },
//           },
//         ],
//       },
//       sorts: [
//         {
//           property: "Post date original",
//           direction: "descending",
//         },
//       ],
//     });

//     const posts = response.results.map((page) => ({
//       id: page.id,
//       title:
//         page.properties["Post name"]?.title?.[0]?.plain_text || "Untitled",
//       excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || "",
//       published_at:
//         page.properties["Post date original"]?.date?.start || "",
//       slug: page.id,
//       featured_image: page.properties["Photo URL"]?.url || null,
//     }));

//     return NextResponse.json({ success: true, data: posts });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }


















// app/api/categories/uklife/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

import { generateSlug, removeChinese } from "../../../../../../lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 🎯 設定您的目標資料庫 ID (請使用您文章所在的資料庫 ID)
// 🚨 我們假設這個資料庫 ID 與您在其他檔案中使用的 ID 相同
const TARGET_DATABASE_ID = '21f65d1f6c1c8068a79fc22a0ef8abd8'; 

// 篩選條件
const STATUS_PROPERTY_NAME = 'Status';
const FILTER_STATUS = 'Book';
const CATEGORY_PROPERTY_NAME = '讀書心得'; // 用於後續格式化文章

const notion = new Client({ auth: process.env.NOTION_API_KEY });
// ----------------------------------------------------
// 處理 Notion API 分頁迭代的函數 (從其他檔案複製過來的穩定版本)
// ----------------------------------------------------

async function fetchAllLifePosts(slug) {
    let allPosts = [];
    let cursor = undefined;
    let requestCount = 0; 

// 構造分類篩選條件：使用 multi_select 屬性包含該 slug (標籤名稱)
    const categoryFilter = {
        property: CATEGORY_PROPERTY_NAME,
        multi_select: {
            contains: slug
        }
    };
    
    // 構造狀態篩選條件：Status 屬性等於 'Life'
    const statusFilter = {
        property: STATUS_PROPERTY_NAME, 
        status: {
            equals: FILTER_STATUS
        }
    };
    
    // 組合兩個篩選條件 (AND 關係)
    const combinedFilter = {
        and: [categoryFilter, statusFilter]
    };
    
    while (true) {
        if (requestCount >= 50) {
            console.warn("Reached max request limit. Stopping pagination.");
            break; 
        }

        try {
            const response = await notion.databases.query({
                database_id: TARGET_DATABASE_ID,
                start_cursor: cursor, 
                page_size: 100,
              
              // 🚨 使用組合篩選條件
                filter: combinedFilter,
                
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

export async function GET(request, { params }) {
  // const { slug } = params;
  // const { searchParams } = new URL(request.url);
    const { slug } = params;
    
 if (!slug) {
        return NextResponse.json(
            { success: false, error: 'Missing category slug.' }, 
            { status: 400 }
        );
    }

//   console.log("TEST: ", "Hello Dear how are you doing?");
  
  try {
    // 1. Get the UK Life page
   // const pageId = '21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'
 //   const { results: blocks } = await notion.blocks.children.list({
 //   block_id: pageId,
 //   page_size: 100
 //   })
    
 // 🚨 1. 替換掉複雜的 child_database 邏輯，使用單一資料庫的分頁抓取
    const posts = await fetchAllLifePosts(slug);
    
    // 2. Find all child databases
//    const databases = blocks.filter(b => b.type === 'child_database')
//    if (!databases.length) {
//    return NextResponse.json(
//        { error: 'No databases found' },
//        { status: 404 }
 //
   // 3. 執行後端篩選分類 (這部分保留原檔案的邏輯，但現在它可以在完整的 147 篇文章上執行)
    const formattedPosts = posts
     // 這是原始檔案中的過濾邏輯，現在對所有文章執行
      //  const tags = post.properties?.[CATEGORY_PROPERTY_NAME]?.multi_select || [];
        // 原始檔案的邏輯是返回所有文章，然後在本地篩選。
        // 由於這個 API 是用來獲取所有文章列表供前端分類頁使用，
        // 我們假設這個路由是返回所有文章，讓前端自己處理分類篩選。
        // 如果這個路由需要返回所有文章，我們不需要 .filter。
        // 但根據您原有的 `.filter` 邏輯，這個路由實際上是在做分類篩選。
        // 為了修復數量問題，我們暫時移除 filter，讓它返回所有 Life 文章 (71 篇)，
        // 讓前端去處理分類。
     .map(post => {
        const title = post.properties?.Name?.title?.[0]?.plain_text ||
        post.properties?.['Post name']?.title?.[0]?.plain_text ||
        'Untitled';

        return {
        id: post.id,
        title: title,
        slug: generateSlug(title),
        url: post.properties?.['Post URL']?.url || post.url,
        featured_image:
            post.cover?.file?.url ||
            post.cover?.external?.url ||
            post.properties?.['Photo URL']?.url ||
            null,
        published_at:
            post.properties?.['Post date original']?.date?.start ||
            post.properties?.['Created time']?.created_time ||
            post.last_edited_time,
        category: 'book-review',
        tags: post.properties?.[CATEGORY_PROPERTY_NAME]?.multi_select?.map(cat => cat.name) || [],
        pinned: post.properties?.Pinned?.checkbox || false,
        excerpt: post.properties?.Excerpt?.rich_text?.[0]?.plain_text || '',
        content: '',
        rawProperties: post.properties,
        };
    });

    return NextResponse.json({
    success: true,
    data: {
        // 由於這個路由沒有 slug，我們假設它返回所有 Life 狀態的文章 (71 篇)
        categorySlug: slug,
        posts: formattedPosts,
        count: formattedPosts.length,
    },
    });


} catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
    { success: false, error: error.message },
    { status: 500 }
    )
}

    
    
    }

{/*   // 3. Query each database for matching posts
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
    */}

    // // 4. Format the posts
    // const formattedPosts = posts.map(post => {
    // const title = post.properties?.Name?.title?.[0]?.plain_text || 
    //                 post.properties?.['Post name']?.title?.[0]?.plain_text || 
    //                 'Untitled'

    // console.log("Post Data: ", post);
    
    // return {
    //     id: post.id,
    //     title: title,
    //     slug: generateSlug(title),
    //     url: post.properties?.['Post URL']?.url || post.url,
    //     featured_image: post.cover?.file?.url || 
    //                 post.cover?.external?.url || 
    //                 post.properties?.['Photo URL']?.url ||
    //                 null,
    //     published_at: post.properties?.['Post date original']?.date?.start || 
    //                 post.properties?.['Created time']?.created_time ||
    //                 post.last_edited_time,
    //     category: 'uklife',
    //     tags: post.properties?.['人生其他']?.multi_select?.map(cat => cat.name) || [],
    //     pinned: post.properties?.Pinned?.checkbox || false,
    //     excerpt: post.properties?.Excerpt?.rich_text?.[0]?.plain_text || '',
    //     content: '',
    //     rawProperties: post.properties
    // }
    // })

    // return NextResponse.json({
    // success: true,
    // data: {
    //     posts: formattedPosts,
    //     count: formattedPosts.length
    // }
    // })

{/*
    const formattedPosts = posts
    .filter(post => {
        const tags = post.properties?.['讀書心得']?.multi_select || [];
        // return tags.some(tag => removeChinese(tag.name).toLowerCase().includes(slug.toLowerCase()));
        // return tags.some(tag => removeChinese(tag.name).trim().toLowerCase() === (slug.trim().toLowerCase()));

        // console.log("TAGS: ", tags);

        return tags.some(tag => tag.name === slug);
    })
    .map(post => {
        const title = post.properties?.Name?.title?.[0]?.plain_text ||
        post.properties?.['Post name']?.title?.[0]?.plain_text ||
        'Untitled';


        // const tags = post.properties?.['人生其他']?.multi_select || [];

        // // console.log("Tag Name: ", post.properties?.['人生其他']?.multi_select || []);
        // console.log("Slug: ", slug);
        // const isCatOk = false;

        // tags.forEach(tag => {
        //     console.log("Removed Chinese: ", removeChinese(tag.name));

        //     if(slug.toLowerCase() === removeChinese(tag.name).toLowerCase()){
        //         setIsCatOk(true);
        //     }else{
        //         return {
                    
        //         };
        //     }
        // });

        return {
        id: post.id,
        title: title,
        slug: generateSlug(title),
        url: post.properties?.['Post URL']?.url || post.url,
        featured_image:
            post.cover?.file?.url ||
            post.cover?.external?.url ||
            post.properties?.['Photo URL']?.url ||
            null,
        published_at:
            post.properties?.['Post date original']?.date?.start ||
            post.properties?.['Created time']?.created_time ||
            post.last_edited_time,
        category: 'book-reviews',
        tags: post.properties?.['讀書心得']?.multi_select?.map(cat => cat.name) || [],
        pinned: post.properties?.Pinned?.checkbox || false,
        excerpt: post.properties?.Excerpt?.rich_text?.[0]?.plain_text || '',
        content: '',
        rawProperties: post.properties,
        };
    });

    return NextResponse.json({
    success: true,
    data: {
        headerParam: slug,
        posts: formattedPosts,
        count: formattedPosts.length,
    },
    });


} catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
    { success: false, error: error.message },
    { status: 500 }
    )
}
}

  */}
