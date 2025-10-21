
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { validate as uuidValidate } from 'uuid';

// 假設您的 lib/utils 中包含 generateSlug 和 notionRichTextToPlainText
import { generateSlug, notionRichTextToPlainText } from '../../../../../../lib/utils'; 

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

    // 2. 獲取頁面內容 (Blocks) - 使用循環分頁 (解決長文章截斷問題)
        let allBlocks = [];
        let cursor = undefined; // 游標，用於請求下一頁
        let hasMore = true;     // 檢查是否還有更多內容

        // 🚨 這裡就是 hasMore 的位置和作用 🚨
        while (hasMore) {
            const blockResponse = await notion.blocks.children.list({ 
                block_id: slug,
                start_cursor: cursor, // 傳入游標以獲取下一頁
                page_size: 100,      // 每次請求 100 個區塊
            });

            allBlocks = allBlocks.concat(blockResponse.results);
            // 關鍵步驟：更新 hasMore 和 cursor 
            hasMore = blockResponse.has_more;
            cursor = blockResponse.next_cursor;
        }


    // 3. 格式化文章 (確保前端能正確解析所有欄位)
        const title = page.properties?.Name?.title?.[0]?.plain_text || 
                      page.properties?.['Post name']?.title?.[0]?.plain_text || 
                      'Untitled';
        
        const formattedPost = {
            id: page.id,
            title: title,
            slug: generateSlug(title), 
            url: page.properties?.['Post URL']?.url || page.url,
            featured_image: page.cover?.file?.url ||
                            page.cover?.external?.url ||
                            page.properties?.['Photo URL']?.url ||
                            null,
            published_at: page.properties?.['Post date original']?.date?.start ||
                          page.properties?.['Created time']?.created_time ||
                          page.last_edited_time,
            
            category: 'book-reviews', // 確保類別名稱正確
            
            tags: page.properties?.[CATEGORY_PROPERTY_NAME]?.multi_select?.map(cat => cat.name) || [],
            pinned: page.properties?.Pinned?.checkbox || false,
            excerpt: notionRichTextToPlainText(page.properties?.Excerpt?.rich_text) || '',
            
            // 使用累積的 allBlocks 數組
            content: formatBlocks(allBlocks), 
            rawProperties: page.properties
        };

        return NextResponse.json({
            success: true,
            data: formattedPost
        });
    // Get blocks (actual body content)
  //  const blocks = await notion.blocks.children.list({
  //    block_id: slug,
 //     page_size: 100, // increase if needed
//    });

 //   return NextResponse.json({
//      success: true,
//      data: {
//        page,
//        blocks: blocks.results,
//      },
//    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Failed to fetch Notion page' }, { status: 500 });
  }
}
