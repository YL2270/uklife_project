// app/api/page-inspector/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // Ensure dynamic rendering

const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * Fetches all blocks (including nested children) for a given Notion block ID.
 * This is a recursive function to traverse the block hierarchy.
 * @param {string} blockId The ID of the block to fetch children for.
 * @param {string} [startCursor] Cursor for pagination.
 * @returns {Promise<Array>} An array of Notion block objects.
 */
async function fetchAllBlocks(blockId, startCursor = undefined) {
  let allBlocks = [];
  let cursor = startCursor;

  while (true) {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100, // Max page size
    });
    allBlocks.push(...resp.results);
    if (!resp.has_more) break;
    cursor = resp.next_cursor;
  }

  // Recursively fetch children of blocks that have children
  for (const block of allBlocks) {
    if (block.has_children) {
      // For child databases, we'll retrieve their schema later,
      // so we don't need to fetch their content blocks here.
      // For other block types, if they have children, fetch them.
      if (block.type !== "child_database") {
        const childBlocks = await fetchAllBlocks(block.id);
        // Attach child blocks to the parent for easier inspection
        block.children_blocks = childBlocks;
      }
    }
  }

  return allBlocks;
}

/**
 * Handles GET requests to retrieve detailed information about a Notion page,
 * including its child databases and a sample of their properties and content.
 * @param {Request} request The incoming Next.js request object.
 * @returns {NextResponse} A JSON response containing the page data or an error.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return NextResponse.json(
      { error: "Missing pageId parameter. Please provide a Notion page ID." },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch the page itself to get its title (optional but good for context)
    const page = await notion.pages.retrieve({ page_id: pageId });

    // 2. Fetch all blocks within the page
    const allBlocks = await fetchAllBlocks(pageId);

    // 3. Filter for child databases
    const childDatabases = allBlocks.filter(block => block.type === "child_database");

    const detailedDatabases = [];

    // 4. For each child database, retrieve its schema and a sample of its pages
    for (const dbBlock of childDatabases) {
      const dbId = dbBlock.id;
      try {
        const dbSchema = await notion.databases.retrieve({ database_id: dbId });

        // Fetch a small sample of pages from the database to see property values
        const dbPagesResponse = await notion.databases.query({
          database_id: dbId,
          page_size: 5 // Fetch a small sample of pages
        });

        detailedDatabases.push({
          id: dbId,
          title: dbBlock.child_database.title,
          schema: dbSchema.properties, // The database properties/schema
          sample_pages: dbPagesResponse.results.map(page => ({
            id: page.id,
            properties: page.properties // Full properties of the sample page
          }))
        });
      } catch (dbError) {
        console.warn(`Could not retrieve database (ID: ${dbId}): ${dbError.message}`);
        detailedDatabases.push({
          id: dbId,
          title: dbBlock.child_database.title,
          error: `Failed to retrieve database details: ${dbError.message}`
        });
      }
    }

    return NextResponse.json({
      success: true,
      page_id: pageId,
      page_title: page.properties?.title?.title[0]?.plain_text || "Untitled Page",
      all_blocks: allBlocks, // All blocks of the page
      child_databases_details: detailedDatabases // Detailed info for child databases
    }, { status: 200 });

  } catch (err) {
    console.error("Notion API error in page-inspector:", err);
    return NextResponse.json({
      success: false,
      error: err.message,
      message: "Failed to fetch page data. Please check the pageId and Notion API key permissions."
    }, { status: 500 });
  }
}