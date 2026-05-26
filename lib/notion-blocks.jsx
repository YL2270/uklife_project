// lib/notion-blocks.jsx
// V2: 智能段落處理
// 重點修改：
// 1. 段落內如果是純圖片網址 → 自動變圖片（解你 Cloudinary 工作流）
// 2. 段落以 "## " / "### " 開頭 → 變標題
// 3. 段落以 "- " 開頭 → 變列點
// 4. 文字內的網址 → 自動變可點連結
// 5. 同時支援正規 Notion image block（如果你以後用 /image）

import { richTextToHTML } from "./utils"

// 偵測一行文字是不是圖片網址
function isImageUrl(text) {
  const t = text.trim()
  if (!/^https?:\/\/\S+$/.test(t)) return false
  return (
    /\.(jpg|jpeg|png|gif|webp|avif)(\?.*)?$/i.test(t) ||
    t.includes("cloudinary.com") ||
    t.includes("imgur.com")
  )
}

// 把純文字裡的 URL 包成 <a>
function autoLinkUrls(html) {
  // 只處理還沒被包在 href="" 或 <a> 裡的網址
  // 簡單但實用的正則
  return html.replace(
    /(^|[\s>(])(https?:\/\/[^\s<()]+[^\s<().,;:!?)\]])/g,
    '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="text-secondary underline break-all hover:text-primary">$2</a>'
  )
}

// HTML escape
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// 渲染一張圖片（在段落中偵測到的網址）
function ImageFromUrl({ src }) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Article image"
        className="w-full rounded-lg border border-border shadow-sm"
        loading="lazy"
      />
    </figure>
  )
}

// 把單行純文字渲染成正確的元素（heading / bullet / image / text）
function RenderTextLine({ line, lineIdx, lineKey }) {
  const trimmed = line.trim()
  if (!trimmed) return null

  // 圖片網址
  if (isImageUrl(trimmed)) {
    return <ImageFromUrl key={lineKey} src={trimmed} />
  }

  // ## / ### Heading
  const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/)
  if (headingMatch) {
    const level = headingMatch[1].length
    const content = headingMatch[2]
    const html = autoLinkUrls(escapeHtml(content))

    if (level === 1) {
      return (
        <h2
          key={lineKey}
          className="mt-12 mb-4 text-3xl font-serif font-bold text-foreground"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }
    if (level === 2) {
      return (
        <h3
          key={lineKey}
          className="mt-10 mb-3 text-2xl font-serif font-bold text-foreground"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }
    return (
      <h4
        key={lineKey}
        className="mt-8 mb-2 text-xl font-serif font-semibold text-foreground"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  // - / * / • Bullet list item
  const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/)
  if (bulletMatch) {
    const html = autoLinkUrls(escapeHtml(bulletMatch[1]))
    return (
      <p
        key={lineKey}
        className="mb-2 ml-6 leading-relaxed text-foreground flex"
      >
        <span className="mr-2 text-muted-foreground">•</span>
        <span className="flex-1" dangerouslySetInnerHTML={{ __html: html }} />
      </p>
    )
  }

  // 一般段落
  return (
    <p
      key={lineKey}
      className="mb-4 leading-relaxed text-foreground"
      dangerouslySetInnerHTML={{ __html: autoLinkUrls(escapeHtml(trimmed)) }}
    />
  )
}

// 渲染整篇文章
export function NotionBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </>
  )
}

function NotionBlock({ block }) {
  const { type } = block
  const value = block[type]

  switch (type) {
    // ─── 段落：智能處理 ───
    case "paragraph": {
      if (!value?.rich_text?.length) return null

      const fullText = value.rich_text.map((t) => t.plain_text).join("")
      if (!fullText.trim()) return null

      // 整段是圖片網址
      if (isImageUrl(fullText)) {
        return <ImageFromUrl src={fullText.trim()} />
      }

      // 段落內可能有多行（shift+enter）或內嵌的 ## 標記
      // 先用換行切，再用 " ## " 切（處理一行內塞多段的狀況）
      let lines = fullText.split("\n")

      // 進一步切：如果一行裡有 " ## "，視為兩段
      const expandedLines = []
      for (const line of lines) {
        // 如果整行剛好是 ## ... 開頭，不要再切
        if (/^#{1,3}\s/.test(line.trim())) {
          expandedLines.push(line)
          continue
        }
        // 找文字中段的 "  ## " 標記，切開
        const splits = line.split(/\s+(?=#{2,3}\s)/g)
        expandedLines.push(...splits)
      }

      // 如果切出來多行，逐行渲染
      if (expandedLines.length > 1) {
        return (
          <>
            {expandedLines.map((line, idx) => (
              <RenderTextLine
                key={`${block.id}-${idx}`}
                line={line}
                lineIdx={idx}
                lineKey={`${block.id}-${idx}`}
              />
            ))}
          </>
        )
      }

      // 單行：依然要檢查是不是 heading/bullet/image
      return (
        <RenderTextLine
          line={fullText}
          lineIdx={0}
          lineKey={block.id}
        />
      )
    }

    // ─── 正規 Notion 區塊（如果用 /heading2 真的建出來的） ───
    case "heading_1":
      return (
        <h1
          className="mt-12 mb-4 text-4xl font-serif font-bold text-foreground"
          dangerouslySetInnerHTML={{
            __html: autoLinkUrls(richTextToHTML(value.rich_text)),
          }}
        />
      )

    case "heading_2":
      return (
        <h2
          className="mt-10 mb-3 text-3xl font-serif font-bold text-foreground"
          dangerouslySetInnerHTML={{
            __html: autoLinkUrls(richTextToHTML(value.rich_text)),
          }}
        />
      )

    case "heading_3":
      return (
        <h3
          className="mt-8 mb-3 text-2xl font-serif font-semibold text-foreground"
          dangerouslySetInnerHTML={{
            __html: autoLinkUrls(richTextToHTML(value.rich_text)),
          }}
        />
      )

    case "bulleted_list_item":
      return (
        <p className="mb-2 ml-6 leading-relaxed text-foreground flex">
          <span className="mr-2 text-muted-foreground">•</span>
          <span
            className="flex-1"
            dangerouslySetInnerHTML={{
              __html: autoLinkUrls(richTextToHTML(value.rich_text)),
            }}
          />
        </p>
      )

    case "numbered_list_item":
      return (
        <li
          className="ml-6 mb-2 list-decimal text-foreground"
          dangerouslySetInnerHTML={{
            __html: autoLinkUrls(richTextToHTML(value.rich_text)),
          }}
        />
      )

    case "quote":
      return (
        <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
          <span
            dangerouslySetInnerHTML={{
              __html: autoLinkUrls(richTextToHTML(value.rich_text)),
            }}
          />
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

    // ─── 正規 Notion image block（拖拉 or /image 建出來的） ───
    case "image": {
      const src = value.external?.url || value.file?.url
      if (!src) return null
      const caption = value.caption?.[0]?.plain_text || ""

      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={caption || "Article image"}
            className="w-full rounded-lg border border-border shadow-sm"
            loading="lazy"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    // ─── 影片 ───
    case "video": {
      const src = value.external?.url || value.file?.url
      if (!src) return null
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        const youtubeId = src.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/
        )?.[1]
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
          <span className="text-sm text-secondary underline break-all">{url}</span>
        </a>
      )
    }

    case "toggle":
      return (
        <details className="my-4 rounded-md border border-border p-4">
          <summary
            className="cursor-pointer font-medium"
            dangerouslySetInnerHTML={{
              __html: autoLinkUrls(richTextToHTML(value.rich_text)),
            }}
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
            dangerouslySetInnerHTML={{
              __html: autoLinkUrls(richTextToHTML(value.rich_text)),
            }}
          />
        </div>
      )
    }

    default:
      return null
  }
}
