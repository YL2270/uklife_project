// app/api/items/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";        // Ensure Node runtime on Vercel
export const dynamic = "force-dynamic"; // Disable caching for dev/debug

// --- Notion client ---
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// --------------------- Helpers ---------------------
async function fetchAllBlocks(blockId, startCursor = undefined) {
  let allBlocks = [];
  let cursor = startCursor;

  // Paginate through block children
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

  // Recursively pull children for blocks that have children
  for (const block of allBlocks) {
    if (block.has_children) {
      const childBlocks = await fetchAllBlocks(block.id);
      block.content = childBlocks.map((b) => b.id);
      allBlocks = allBlocks.concat(childBlocks); // flatten into allBlocks set
    } else {
      block.content = [];
    }
  }

  return dedupeBlocks(allBlocks);
}

// Some blocks will be duplicated when flattening recursion; dedupe by id
function dedupeBlocks(blocks) {
  const map = new Map();
  for (const b of blocks) {
    map.set(b.id, b);
  }
  return Array.from(map.values());
}

async function fetchCollectionData(databaseId, filterStatus) {
  const db = await notion.databases.retrieve({ database_id: databaseId });

  const queryOptions = {
    database_id: databaseId,
    page_size: 100,
  };

  if (filterStatus) {
    queryOptions.filter = {
      property: "Status",
      status: { equals: filterStatus },
    };
  }

  const query = await notion.databases.query(queryOptions);
  return { db, query };
}

// --------------------- Handler ---------------------
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  // Optional override: ?status=Life (defaults below)
  const filterStatus = searchParams.get("status") || "Life";

  if (!pageId) {
    return NextResponse.json(
      { error: "Missing pageId parameter." },
      { status: 400 }
    );
  }

  try {
    // Fetch main page + all nested blocks
    const page = await notion.pages.retrieve({ page_id: pageId });
    const allBlocks = await fetchAllBlocks(pageId);

    // Build recordMap similar to your Express version
    const recordMap = {
      block: {
        [pageId]: {
          ...page,
          id: pageId,
          value: {
            ...page,
            id: pageId,
            type: "page",
            properties: page.properties || {},
            content: allBlocks.map((b) => b.id),
          },
        },
        ...allBlocks.reduce((acc, block) => {
          const blockValue = {
            id: block.id,
            type: block.type,
            created_time: block.created_time,
            last_edited_time: block.last_edited_time,
            parent: block.parent,
            archived: block.archived,
            in_trash: block.in_trash,
            ...(block[block.type] && typeof block[block.type] === "object"
              ? block[block.type]
              : {}),
            content: block.content || [],
            properties: block.properties || {},
          };
          acc[block.id] = { ...block, value: blockValue };
          return acc;
        }, {}),
      },
      collection: {},
      collection_view: {},
      collection_query: {},
    };

    // Attach child_database metadata + filtered rows
    for (const block of allBlocks) {
      if (block.type === "child_database") {
        const { db, query } = await fetchCollectionData(block.id, filterStatus);
        recordMap.collection[block.id] = db;
        recordMap.collection_query[block.id] = query;
      }
    }

    return NextResponse.json(recordMap, { status: 200 });
  } catch (err) {
    console.error("Notion API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
