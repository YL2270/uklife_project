
// app/api/categories/uklife/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

import { generateSlug, removeChinese } from "../../../../lib/utils";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);

//   console.log("SEARCH TERM: ", slug)
  
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
            or: [
                {
                    property: 'Status',
                    status: {
                        equals: 'Life'
                    }
                },
                {
                    property: 'Status',
                    status: {
                        equals: 'Book'
                    }
                }
            ]
        }

        })
        posts = [...posts, ...results]
    } catch (dbError) {
        console.error(`Error querying database ${db.id}:`, dbError)
    }
    }


    const formattedPosts = posts
    .filter(post => {
        const title = post.properties?.Name?.title?.[0]?.plain_text ||
                     post.properties?.['Post name']?.title?.[0]?.plain_text ||
                     'Untitled';
        
        // Choose one of the following search methods:
        
        // 1. Exact match (case insensitive)
        // return removeChinese(title).trim().toLowerCase() === slug.trim().toLowerCase();
        
        // 2. Partial match (if title contains the slug)
        return title.toLowerCase().includes(slug.toLowerCase());
        
        // 3. Or if you want to match the generated slug:
        // return generateSlug(title) === slug;
    })
    .map(post => {
        const title = post.properties?.Name?.title?.[0]?.plain_text ||
                     post.properties?.['Post name']?.title?.[0]?.plain_text ||
                     'Untitled';

        // Determine category based on Status
        const status = post.properties?.Status?.status?.name;
        const category = status === 'Book' ? 'book-reviews' : 'uklife';

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
            // category: 'uklife',
            category: category,
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