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

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  
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


    const formattedPosts = posts
    .filter(post => {
        const tags = post.properties?.['人生其他']?.multi_select || [];
        // return tags.some(tag => removeChinese(tag.name).toLowerCase().includes(slug.toLowerCase()));
        // return tags.some(tag => removeChinese(tag.name).trim().toLowerCase() === (slug.trim().toLowerCase()));
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
        category: 'uklife',
        tags: post.properties?.['人生其他']?.multi_select?.map(cat => cat.name) || [],
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