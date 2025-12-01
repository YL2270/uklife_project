
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { validate as uuidValidate } from 'uuid';

export const dynamic = 'force-dynamic' // Disable all caching
// export const runtime = 'edge' // Optional: Better for Notion API


const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * 核心修改：使用 while 迴圈和游標來獲取 Notion 頁面的所有內容塊 (Blocks)。
 * Notion API 一次最多只返回 100 個 Block。
 */

async function getAllPageBlocks(blockId) {
    let allBlocks = [];
    let cursor = undefined; 

    // 只要 API 響應中的 has_more 為 true，就持續呼叫 API
    while (true) {
        const response = await notion.blocks.children.list({
            block_id: blockId, 
            start_cursor: cursor, // 傳入上一次響應的 next_cursor
            page_size: 100, // 每次請求最大值
        });

        // 1. 將當前批次獲取的結果添加到總列表中
        allBlocks = allBlocks.concat(response.results); 

        // 2. 檢查是否還有更多資料
        if (!response.has_more) {
            break; // 沒有更多內容了，跳出迴圈
        }

        // 3. 更新游標到下一頁的起始位置
        cursor = response.next_cursor; 
    }

    return allBlocks;
}

export async function GET(req, { params }) {
  const { slug } = params;

  // 這裡檢查 slug 是否是有效的 UUID，因為您可能使用 UUID 作為頁面 ID
  
  if (!uuidValidate(slug)) {
    return NextResponse.json({ success: false, error: 'Invalid page ID' }, { status: 400 });
  }

  try {
    // Get page metadata
    const page = await notion.pages.retrieve({ page_id: slug });

    {/*// Get blocks (actual body content)
    const blocks = await notion.blocks.children.list({
      block_id: slug,
      page_size: 100, // increase if needed
    });
*/}
    // Get ALL blocks (actual body content) using the new function
        const blocks = await getAllPageBlocks(slug);

        return NextResponse.json({
            success: true,
            data: {
                page,
                blocks, // blocks 現在包含所有內容塊
            },
          

    {/* return NextResponse.json({
      success: true,
      data: {
        page,
        blocks: blocks.results,
      },*/}
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Failed to fetch Notion page' }, { status: 500 });
  }
}
