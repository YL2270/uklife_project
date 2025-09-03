import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
  if (!dateString) return "N/A"
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

/*
export function calculateReadingTime(content) {
  if (!content) return "1 min read"
  const wordsPerMinute = 200 
  const textContent = content.replace(/<[^>]*>/g, "") 
  const wordCount = textContent.split(/\s+/).length
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
  return `${readingTimeMinutes} min read`
}
*/

export function calculateReadingTime(content) {
  if (!content) {
    return "1 min read";
  }

  const wordsPerMinute = 200;
  // 移除 HTML 標籤
  const textContent = content.replace(/<[^>]*>/g, "");
  
  // 結合中英文單字計算：匹配每個中文字或每個連續的英文字母/數字
  const wordMatches = textContent.match(/[\u4e00-\u9fff]|[a-zA-Z0-9]+/g);
  const wordCount = wordMatches ? wordMatches.length : 0;
  
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (readingTimeMinutes === 0) {
    return "1 min read";
  }

  return `${readingTimeMinutes} min read`;
}




export function richTextToHTML(richTextArray) {
  return richTextArray.map(text => {
    let content = text.text?.content || '';
    if (text.annotations.bold) content = `<strong>${content}</strong>`;
    if (text.annotations.italic) content = `<em>${content}</em>`;
    if (text.annotations.underline) content = `<u>${content}</u>`;
    if (text.annotations.strikethrough) content = `<s>${content}</s>`;
    if (text.annotations.code) content = `<code>${content}</code>`;
    if (text.href) content = `<a href="${text.href}" target="_blank">${content}</a>`;
    if (text.annotations.color && text.annotations.color !== 'default') {
      content = `<span style="color:${notionColorToCSS(text.annotations.color)}">${content}</span>`;
    }
    return content;
  }).join('');
}

export function notionColorToCSS(color) {
  const colorMap = {
    red: '#e03e3e', blue: '#0b6e99', green: '#2ecc71',
    yellow: '#f1c40f', orange: '#e67e22', pink: '#e84393',
    purple: '#9b59b6', gray: '#7f8c8d', brown: '#8e6e53',
    default: 'inherit',
  };
  return colorMap[color.replace('_background', '')] || 'inherit';
}






// export function generateSlug(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "") 
//     .trim()
//     .replace(/\s+/g, "-") 
//     .replace(/-+/g, "-") 
// }

export function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFKD") // Normalize Unicode characters
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // Allow Unicode letters/numbers
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}


// export function removeChinese(title) {
//   const titleFinal = title
//     .replace(/[\u4e00-\u9fff]/g, '');
//     // .replace(/[^\x00-\x7F ]/g, "")         // Remove non-ASCII (e.g. Chinese) BUT keep spaces

//   // console.log("Process Category: ", titleFinal);
  
//   return titleFinal;
// }


export function removeChinese(str) {
  return str
    .replace(/[\u4e00-\u9fff]/g, '') // Remove Chinese chars
    .replace(/\s+/g, ' ')            // Collapse multiple spaces into one
    .trim()
    .toLowerCase()
    ;                         // Remove leading/trailing spaces
}


export function extractPageId(notionUrl) {
  if (!notionUrl) return null
  
  const match = notionUrl.match(/([a-f0-9]{32})$/)
  if (match && match[1]) {
    return match[1]
  }
  
  const uuidMatch = notionUrl.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  if (uuidMatch && uuidMatch[0]) {
    return uuidMatch[0].replace(/-/g, "") 
  }
  return null
}
