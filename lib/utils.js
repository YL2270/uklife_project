import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w一-鿿-]/g, "")
    .replace(/--+/g, "-")
    .trim()
}

export function richTextToHTML(richTextArr) {
  if (!Array.isArray(richTextArr)) return ""
  return richTextArr
    .map((t) => {
      let text = t.plain_text || ""
      // Escape HTML entities
      text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      if (t.annotations?.bold) text = `<strong>${text}</strong>`
      if (t.annotations?.italic) text = `<em>${text}</em>`
      if (t.annotations?.strikethrough) text = `<s>${text}</s>`
      if (t.annotations?.underline) text = `<u>${text}</u>`
      if (t.annotations?.code) text = `<code>${text}</code>`
      if (t.href) text = `<a href="${t.href}" target="_blank" rel="noopener noreferrer">${text}</a>`
      return text
    })
    .join("")
}

export function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateStr || ""
  }
}
