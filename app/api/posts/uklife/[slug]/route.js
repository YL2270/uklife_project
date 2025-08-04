// // // app/api/posts/uklife/[pageId]/route.js

// // import { NextResponse } from 'next/server';
// // import { Notion } from '../../../../../lib/notion';

// // export async function GET(req, { params }) {
// //   const { pageId } = params;

// //   try {
// //     const page = await Notion.pages.retrieve({ page_id: pageId });

// //     const blocks = await Notion.blocks.children.list({
// //       block_id: pageId,
// //       page_size: 100,
// //     });

// //     const titleProperty = page.properties?.Name?.title?.[0]?.plain_text || 'Untitled';

// //     return NextResponse.json({
// //       id: page.id,
// //       title: titleProperty,
// //       created_time: page.created_time,
// //       last_edited_time: page.last_edited_time,
// //       content: blocks.results, // This is raw blocks, you might want to parse them nicely
// //     });
// //   } catch (error) {
// //     console.error('Error fetching Notion page:', error);
// //     return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
// //   }
// // }







// import { NextResponse } from 'next/server'
// import { Client } from '@notionhq/client'
// import { validate as uuidValidate } from 'uuid'
// // import { validate as uuidValidate } from '@uuid'

// const notion = new Client({ auth: process.env.NOTION_API_KEY })

// export async function GET(req, { params }) {
//   const { slug } = params;

//   // ✅ Validate the slug as UUID (Notion ID)
//   if (!uuidValidate(slug)) {
//     return NextResponse.json({ success: false, error: 'Invalid page ID' }, { status: 400 });
//   }

//   try {
//     // Now you can use slug as a page/database ID
//     const page = await notion.pages.retrieve({ page_id: slug });

//     return NextResponse.json({ success: true, data: page });
//   } catch (error) {
//     console.error('Notion Error:', error.message);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }






import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { validate as uuidValidate } from 'uuid';

export const dynamic = 'force-dynamic' // Disable all caching
// export const runtime = 'edge' // Optional: Better for Notion API


const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req, { params }) {
  const { slug } = params;

  if (!uuidValidate(slug)) {
    return NextResponse.json({ success: false, error: 'Invalid page ID' }, { status: 400 });
  }

  try {
    // Get page metadata
    const page = await notion.pages.retrieve({ page_id: slug });

    // Get blocks (actual body content)
    const blocks = await notion.blocks.children.list({
      block_id: slug,
      page_size: 100, // increase if needed
    });

    return NextResponse.json({
      success: true,
      data: {
        page,
        blocks: blocks.results,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Failed to fetch Notion page' }, { status: 500 });
  }
}
