// // import { getUniqueSubTopics }  from "/lib/db"
// // import { NextResponse } from "next/server"

// // export async function GET() {
// //   try {
// //     const subTopics = await getUniqueSubTopics("life-blog")
// //     return NextResponse.json(subTopics)
// //   } catch (error) {
// //     console.error("Error fetching UK Life sub-topics:", error)
// //     return NextResponse.json({ error: "Failed to fetch UK Life sub-topics" }, { status: 500 })
// //   }
// // }











// // app/api/categories/uklife/route.js
// import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const pageId = searchParams.get("pageId");

//   if (!pageId) {
//     return NextResponse.json(
//       { error: "Missing pageId parameter." },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch all blocks to find child databases
//     const allBlocks = await fetchAllBlocks(pageId);
//     const childDatabases = allBlocks.filter(block => block.type === "child_database");

//     // Initialize category structure
//     const categories = {
//       propertyTypes: {
//         ukProperty: { name: "英國房產", type: "multi_select", options: [] },
//         lifeOther: { name: "人生其他", type: "multi_select", options: [] },
//         readingNotes: { name: "讀書心得", type: "multi_select", options: [] },
//         platform: { name: "Platform", type: "multi_select", options: [] },
//         label: { name: "Label", type: "select", options: [] }
//       },
//       groupedCategories: {
//         byType: {},
//         byColor: {}
//       }
//     };

//     // Process each database
//     for (const dbBlock of childDatabases) {
//       const dbId = dbBlock.id;
//       const db = await notion.databases.retrieve({ database_id: dbId });
      
//       // Process each property we care about
//       for (const [propKey, propConfig] of Object.entries(categories.propertyTypes)) {
//         const prop = db.properties[propConfig.name];
//         if (prop && prop.type === propConfig.type) {
//           categories.propertyTypes[propKey].options = [
//             ...categories.propertyTypes[propKey].options,
//             ...prop[prop.type].options
//           ];
//         }
//       }
//     }

//     // Deduplicate and organize options
//     for (const [propKey, propData] of Object.entries(categories.propertyTypes)) {
//       // Deduplicate by id
//       const uniqueOptions = [];
//       const seenIds = new Set();
      
//       for (const option of propData.options) {
//         if (!seenIds.has(option.id)) {
//           seenIds.add(option.id);
//           uniqueOptions.push(option);
//         }
//       }
      
//       // Sort alphabetically by name
//       propData.options = uniqueOptions.sort((a, b) => 
//         a.name.localeCompare(b.name)
//       );

//       // Group by type for easy access
//       if (!categories.groupedCategories.byType[propData.type]) {
//         categories.groupedCategories.byType[propData.type] = [];
//       }
//       categories.groupedCategories.byType[propData.type].push({
//         name: propData.name,
//         options: propData.options
//       });

//       // Group by color
//       for (const option of propData.options) {
//         if (!categories.groupedCategories.byColor[option.color]) {
//           categories.groupedCategories.byColor[option.color] = [];
//         }
//         categories.groupedCategories.byColor[option.color].push({
//           property: propData.name,
//           ...option
//         });
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         propertyTypes: categories.propertyTypes,
//         groupedCategories: categories.groupedCategories,
//         // Add simplified flat lists if needed
//         allCategories: Object.values(categories.propertyTypes).flatMap(prop => prop.options),
//         allColors: Object.keys(categories.groupedCategories.byColor)
//       }
//     }, { status: 200 });
//   } catch (err) {
//     console.error("Notion API error:", err);
//     return NextResponse.json({ 
//       success: false,
//       error: err.message 
//     }, { status: 500 });
//   }
// }

// // Reuse your existing helper functions
// async function fetchAllBlocks(blockId, startCursor = undefined) {
//   let allBlocks = [];
//   let cursor = startCursor;

//   while (true) {
//     const resp = await notion.blocks.children.list({
//       block_id: blockId,
//       start_cursor: cursor,
//       page_size: 100,
//     });
//     allBlocks.push(...resp.results);
//     if (!resp.has_more) break;
//     cursor = resp.next_cursor;
//   }

//   for (const block of allBlocks) {
//     if (block.has_children) {
//       const childBlocks = await fetchAllBlocks(block.id);
//       block.content = childBlocks.map((b) => b.id);
//       allBlocks = allBlocks.concat(childBlocks);
//     } else {
//       block.content = [];
//     }
//   }

//   return dedupeBlocks(allBlocks);
// }

// function dedupeBlocks(blocks) {
//   const map = new Map();
//   for (const b of blocks) {
//     map.set(b.id, b);
//   }
//   return Array.from(map.values());
// }


















// app/api/categories/uklife/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  // const filterStatus = "Life"; // Hardcoded to filter for Life status
  const filterStatus = "Life"; // Hardcoded to filter for Life status

  if (!pageId) {
    return NextResponse.json(
      { error: "Missing pageId parameter." },
      { status: 400 }
    );
  }

  try {
    // Fetch all blocks to find child databases
    const allBlocks = await fetchAllBlocks(pageId);
    const childDatabases = allBlocks.filter(block => block.type === "child_database");

    // console.log("All Page Blocks: ", allBlocks);

    // Initialize category structure
    const categories = {
      propertyTypes: {
        ukProperty: { name: "英國房產", type: "multi_select", options: [] },
        lifeOther: { name: "人生其他", type: "multi_select", options: [] },
        readingNotes: { name: "讀書心得", type: "multi_select", options: [] },
        platform: { name: "Platform", type: "multi_select", options: [] },
        label: { name: "Label", type: "select", options: [] }
      },
      usedCategories: new Set() // Track used category names to avoid duplicates
    };

    // Process each database
    for (const dbBlock of childDatabases) {
      const dbId = dbBlock.id;
      
      // First query the database for pages with Life status
      const queryResponse = await notion.databases.query({
        database_id: dbId,
        filter: {
          property: "Status",
          status: { equals: filterStatus }
        }
      });

      // If no pages with Life status, skip this database
      if (queryResponse.results.length === 0) continue;

      // Get the database schema
      const db = await notion.databases.retrieve({ database_id: dbId });
      
      // Process each property we care about
      for (const [propKey, propConfig] of Object.entries(categories.propertyTypes)) {
        const prop = db.properties[propConfig.name];
        if (prop && prop.type === propConfig.type) {
          // Only add options that are actually used in the filtered pages
          const usedOptions = new Set();
          
          // Check which options are used in the filtered pages
          for (const page of queryResponse.results) {
            const propValue = page.properties[propConfig.name];
            if (propValue) {
              if (propValue.type === 'multi_select' && propValue.multi_select) {
                propValue.multi_select.forEach(opt => usedOptions.add(opt.id));
              } else if (propValue.type === 'select' && propValue.select) {
                usedOptions.add(propValue.select.id);
              }
            }
          }

          // Then modify the option adding logic:
          prop[prop.type].options.forEach(option => {
            if (usedOptions.has(option.id) && isValidNotionId(option.id)) {
              if (!categories.usedCategories.has(option.name)) {
                categories.propertyTypes[propKey].options.push(option);
                categories.usedCategories.add(option.name);
              }
            }
          });
        }
      }
    }

    // Sort options alphabetically by name
    for (const propData of Object.values(categories.propertyTypes)) {
      propData.options.sort((a, b) => a.name.localeCompare(b.name));
    }

    // In your try block, modify the final response:
    return NextResponse.json({
      success: true,
      data: {
        filteredStatus: filterStatus,
        categories: Object.fromEntries(
          Object.entries(categories.propertyTypes)
            .filter(([_, propData]) => propData.options.length > 0)
            .map(([key, propData]) => [
              key,
              {
                ...propData,
                options: propData.options.map(option => {
                  const [chineseName, ...englishParts] = option.name.split(' ')
                  const englishName = englishParts.join(' ')
                  return {
                    ...option,
                    englishName,
                    chineseName
                  }
                })
              }
            ])
        )
      }
    }, { status: 200 });
  } catch (err) {
    console.error("Notion API error:", err);
    return NextResponse.json({ 
      success: false,
      error: err.message 
    }, { status: 500 });
  }
}



// Add this helper function at the top
function isValidNotionId(id) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}



// Reuse your existing helper functions
async function fetchAllBlocks(blockId, startCursor = undefined) {
  let allBlocks = [];
  let cursor = startCursor;

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

  for (const block of allBlocks) {
    if (block.has_children) {
      const childBlocks = await fetchAllBlocks(block.id);
      //block.content = childBlocks.map((b) => b.id);
      allBlocks = allBlocks.concat(childBlocks);
    } else {
      block.content = [];
    }
  }

  return dedupeBlocks(allBlocks);
}

function dedupeBlocks(blocks) {
  const map = new Map();
  for (const b of blocks) {
    map.set(b.id, b);
  }
  return Array.from(map.values());
}
