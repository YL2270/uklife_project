// lib/notion-blocks.jsx
// 把 Notion blocks 渲染成 JSX
// 重點：image block 直接變成 <img>，所以你在 Notion 貼 Cloudinary 網址會自動顯示

import Image from "next/image"
import { richTextToHTML } from "./utils"

// 渲染整篇文章的 blocks
export function NotionBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </>
  )
}

// 渲染單一 block
function NotionBlock({ block }) {
  const { type } = block
  const value = block[type]

  switch (type) {
    case "paragraph":
      return (
        <p
          className="mb-4 leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
        />
      )

    case "heading_1":
      return (
        <h1
          className="mt-12 mb-4 text-3xl font-serif font-bold text-foreground"
          dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
        />
      )

    case "heading_2":
      return (
        <h2
          className="mt-10 mb-3 text-2xl font-serif font-bold text-foreground"
          dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
        />
      )

    case "heading_3":
      return (
        <h3
          className="mt-8 mb-3 text-xl font-serif font-semibold text-foreground"
          dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
        />
      )

    case "bulleted_list_item":
      return (
        <li
          className="ml-6 mb-2 list-disc text-foreground"
          dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
        />
      )

    case "numbered_list_item":
      return (
        <li
          className="ml-6 mb-2 list-decimal text-foreground"
          dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
        />
      )

    case "quote":
      return (
        <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
          <span dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }} />
        </blockquote>
      )

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{value.rich_text.map((t) => t.plain_text).join("")}</code>
        </pre>
      )

    case "divider":
      return <hr className="my-8 border-border" />

    // 🎯 圖片！這就是你「圖片要手動打」問題的解
    // 在 Notion 用 /image 貼 Cloudinary 網址，這裡就會自動 render 出來
    case "image": {
      const src = value.external?.url || value.file?.url
      if (!src) return null
      const caption = value.caption?.[0]?.plain_text || ""

      return (
        <figure className="my-8">
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image
              src={src}
              alt={caption || "Article image"}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized={true} // Cloudinary 已經優化過了，不用 Vercel 再處理
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    // 影片 embed
    case "video": {
      const src = value.external?.url || value.file?.url
      if (!src) return null
      // YouTube 處理
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        const youtubeId =
          src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/)?.[1]
        if (youtubeId) {
          return (
            <div className="my-8 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                className="h-full w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )
        }
      }
      return (
        <video controls className="my-8 w-full rounded-lg">
          <source src={src} />
        </video>
      )
    }

    case "bookmark":
    case "embed":
    case "link_preview": {
      const url = value.url
      if (!url) return null
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-4 block rounded-md border border-border p-4 hover:bg-muted"
        >
          <span className="text-sm text-muted-foreground">{url}</span>
        </a>
      )
    }

    case "toggle":
      return (
        <details className="my-4 rounded-md border border-border p-4">
          <summary
            className="cursor-pointer font-medium"
            dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
          />
          {block.children && (
            <div className="mt-4">
              <NotionBlocks blocks={block.children} />
            </div>
          )}
        </details>
      )

    case "callout": {
      const emoji = value.icon?.emoji || "💡"
      return (
        <div className="my-6 flex gap-3 rounded-md bg-muted p-4">
          <span className="text-xl">{emoji}</span>
          <div
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: richTextToHTML(value.rich_text) }}
          />
        </div>
      )
    }

    // 不認識的 block type → 不渲染（不要拋錯）
    default:
      return null
  }
}
