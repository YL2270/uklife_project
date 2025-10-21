
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
