// // "use client"

// // import { useEffect, useState } from "react"
// // import { useParams } from "next/navigation"
// // import Header from "../../../components/header"
// // import Image from "next/image"
// // import { richTextToHTML, formatDate, calculateReadingTime } from "../../../lib/utils"

// // import ReactMarkdown from "react-markdown"
// // import remarkGfm from 'remark-gfm';
// // import rehypeRaw from 'rehype-raw';

// // export default function BookReviewDetailPage() {
// //   const params = useParams()
// //   const slug = params.slug

// //   const [post, setPost] = useState(null)
// //   const [contentMarkdown, setContentMarkdown] = useState("")
// //   const [loading, setLoading] = useState(true)
// //   const [imageError, setImageError] = useState(false)

// //   useEffect(() => {
// //     if (!slug) return

// //     async function fetchPost() {
// //       try {
// //         const res = await fetch(`/api/posts/uklife/${slug}`)
// //         const data = await res.json()

// //         if (data.success && data.data.page) {
// //           const page = data.data.page
// //           const blocks = data.data.blocks || []

// //           // Extract title safely:
// //           const title =
// //             page.properties?.["Post name"]?.title?.[0]?.plain_text ||
// //             "Untitled post"

// //           // Extract featured image URL from Photo URL property or page cover:
// //           const featured_image =
// //             page.properties?.["Photo URL"]?.url ||
// //             page.cover?.file?.url ||
// //             page.cover?.external?.url ||
// //             null

// //           // Excerpt text (optional)
// //           const excerpt =
// //             page.properties?.Excerpt?.rich_text?.[0]?.plain_text || ""

// //           // Published date (fallback to created_time)
// //           const published_at =
// //             page.properties?.["Post date original"]?.date?.start ||
// //             page.created_time

// //           // Extract content markdown by concatenating all paragraph blocks text:
// //           let fullContent = ""
// //           blocks.forEach((block) => {
// //             if (block.type === "paragraph") {
// //               const texts = block.paragraph.rich_text || []
// //               texts.forEach((txt) => {
// //                 // fullContent += txt.plain_text + "\n\n"
// //                 fullContent += richTextToHTML(texts) + "\n\n";
// //               })
// //             }
// //             // You can extend here to support other block types if needed.
// //           })

// //           setPost({
// //             title,
// //             featured_image,
// //             excerpt,
// //             published_at,
// //           })
// //           setContentMarkdown(fullContent.trim())
// //         } else {
// //           setPost(null)
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch post:", err)
// //         setPost(null)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchPost()
// //   }, [slug])

// //   const handleImageError = () => setImageError(true)

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div class="flex items-center justify-center w-56 h-56 rounded-lg">
// //             <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!post) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         Post not found
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-background theme-uk-life">
// //       <Header />
// //       <div style={{ paddingTop: "80px" }}>
// //         <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
// //           {/* Cover Image Section */}
// //           <div className="w-full h-[300px] overflow-hidden bg-gray-100 relative">
// //             {post.featured_image && !imageError ? (
// //               <Image
// //                 src={post.featured_image}
// //                 alt={post.title}
// //                 fill
// //                 className="object-cover"
// //                 onError={handleImageError}
// //                 unoptimized={true}
// //               />
// //             ) : (
// //               <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
// //                 <Image
// //                   src="/images/featured-image-placeholder.png"
// //                   alt={post.title}
// //                   width={200}
// //                   height={200}
// //                   className="opacity-50"
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           {/* Content Section */}
// //           <div className="p-8">
// //             <div className="mb-6">
// //               <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3 leading-tight">
// //                 {post.title}
// //               </h1>
// //               <div className="flex items-center text-sm text-gray-500 space-x-4">
// //                 <span>{formatDate(post.published_at)}</span>
// //                 <span>•</span>
// //                 <span>{calculateReadingTime(contentMarkdown)} min read</span>
// //               </div>
// //             </div>

// //             {/* <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
// //               {post.excerpt && (
// //                 <p className="text-xl text-gray-600 leading-relaxed mb-6">
// //                   {post.excerpt}
// //                 </p>
// //               )}
// //               {contentMarkdown}
// //             </div> */}

// //             <div className="prose prose-lg max-w-none text-gray-700">
// //               {post.excerpt && (
// //                 <p className="text-xl text-gray-600 leading-relaxed mb-6">
// //                   {post.excerpt}
// //                 </p>
// //               )}

// //               {/* <ReactMarkdown
// //                 children={contentMarkdown}
// //                 remarkPlugins={[remarkGfm]}
// //                 rehypePlugins={[rehypeRaw]}
// //               /> */}

// //               <p className="w-100">
// //                 {contentMarkdown}
// //                 {/* <ReactMarkdown>{contentMarkdown}</ReactMarkdown> */}
// //               </p>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }







// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import Header from "../../../components/header"
// import Image from "next/image"
// import { richTextToHTML, formatDate, calculateReadingTime } from "../../../lib/utils"

// import ReactMarkdown from "react-markdown"
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';

// export default function BookReviewDetailPage() {
//   const params = useParams()
//   const slug = params.slug

//   const [post, setPost] = useState(null)
//   const [contentMarkdown, setContentMarkdown] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [imageError, setImageError] = useState(false)

//   useEffect(() => {
//     if (!slug) return

//     async function fetchPost() {
//       try {
//         const res = await fetch(`/api/posts/uklife/${slug}`)
//         const data = await res.json()

//         if (data.success && data.data.page) {
//           const page = data.data.page
//           const blocks = data.data.blocks || []

//           // Extract title safely:
//           const title =
//             page.properties?.["Post name"]?.title?.[0]?.plain_text ||
//             "Untitled post"

//           // Extract featured image URL from Photo URL property or page cover:
//           const featured_image =
//             page.properties?.["Photo URL"]?.url ||
//             page.cover?.file?.url ||
//             page.cover?.external?.url ||
//             null

//           // Excerpt text (optional)
//           const excerpt =
//             page.properties?.Excerpt?.rich_text?.[0]?.plain_text || ""

//           // Published date (fallback to created_time)
//           const published_at =
//             page.properties?.["Post date original"]?.date?.start ||
//             page.created_time

//           // Extract content markdown by concatenating all paragraph blocks text:
//           let fullContent = ""
//           blocks.forEach((block) => {
//             if (block.type === "paragraph") {
//               const texts = block.paragraph.rich_text || []
//               texts.forEach((txt) => {
//                 fullContent += richTextToHTML(texts) + "\n\n";
//               })
//             }
//           })

//           setPost({
//             title,
//             featured_image,
//             excerpt,
//             published_at,
//           })
//           setContentMarkdown(fullContent.trim())
//         } else {
//           setPost(null)
//         }
//       } catch (err) {
//         console.error("Failed to fetch post:", err)
//         setPost(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPost()
//   }, [slug])

//   const handleImageError = () => setImageError(true)

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="flex items-center justify-center w-56 h-56 rounded-lg">
//             <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-200 bg-blue-900 rounded-full animate-pulse">loading...</div>
//         </div>
//       </div>
//     )
//   }

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         Post not found
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 theme-book-reviews theme-book-reviews">
//       <Header />
//       <div style={{ paddingTop: "80px" }}>
//         <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
//           {/* Cover Image Section */}
//           <div className="w-full h-[300px] overflow-hidden bg-gray-700 relative">
//             {post.featured_image && !imageError ? (
//               <Image
//                 src={post.featured_image}
//                 alt={post.title}
//                 fill
//                 className="object-cover"
//                 onError={handleImageError}
//                 unoptimized={true}
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
//                 <Image
//                   src="/images/featured-image-placeholder.png"
//                   alt={post.title}
//                   width={200}
//                   height={200}
//                   className="opacity-50 invert"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Content Section */}
//           <div className="p-8">
//             <div className="mb-6">
//               <h1 className="text-4xl font-serif font-bold text-white mb-3 leading-tight">
//                 {post.title}
//               </h1>
//               <div className="flex items-center text-sm text-gray-400 space-x-4">
//                 <span>{formatDate(post.published_at)}</span>
//                 <span>•</span>
//                 <span>{calculateReadingTime(contentMarkdown)} min read</span>
//               </div>
//             </div>

//             <div className="prose prose-lg max-w-none text-gray-300 prose-invert">
//               {post.excerpt && (
//                 <p className="text-xl text-gray-300 leading-relaxed mb-6">
//                   {post.excerpt}
//                 </p>
//               )}

//               <div className="text-gray-300">
//                 {/* <ReactMarkdown
//                   children={contentMarkdown}
//                   remarkPlugins={[remarkGfm]}
//                   rehypePlugins={[rehypeRaw]}
//                   components={{
//                     p: ({node, ...props}) => <p className="mb-4 text-gray-300" {...props} />,
//                     a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300" {...props} />,
//                     h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
//                     h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
//                     h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-5 mb-3" {...props} />,
//                     ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
//                     ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
//                     li: ({node, ...props}) => <li className="mb-2" {...props} />,
//                     blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4" {...props} />,
//                     code: ({node, ...props}) => <code className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-sm" {...props} />,
//                     pre: ({node, ...props}) => <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
//                   }}
//                 /> */}


//                 <ReactMarkdown
//   children={contentMarkdown}
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeRaw]}
//   components={{
//     // Headings
//     h1: ({ node, ...props }) => (
//       <h1 style={{ 
//         fontSize: "2rem", 
//         marginBottom: "20px", 
//         fontWeight: "bolder",
//         color: "#e5e7eb" // Light gray for dark theme
//       }} {...props} />
//     ),
//     h2: ({ node, ...props }) => (
//       <h2 style={{
//         fontSize: "1.25rem",
//         marginBottom: "8px", 
//         fontWeight: "bold",
//         color: "#e5e7eb"
//       }} {...props} />
//     ),
    
//     // Paragraph
//     p: ({ node, ...props }) => (
//       <p style={{
//         marginBottom: "20px",
//         color: "#d1d5db" // Lighter gray for text
//       }} {...props} />
//     ),
    
//     // Horizontal rule
//     hr: ({ node, ...props }) => (
//       <hr style={{
//         borderColor: "#374151", // Dark gray border
//         margin: "12px 0"
//       }} {...props} />
//     ),
    
//     // Links
//     a: ({ node, ...props }) => (
//       <a style={{
//         color: "#60a5fa", // Blue that works in dark mode
//         textDecoration: "none",
//         fontWeight: "500"
//       }} {...props} />
//     ),
    
//     // Code blocks
//     code: ({ node, inline, className, children, ...props }) => (
//       <code
//         style={{
//           background: "#1f2937", // Dark gray background
//           color: "#f3f4f6", // Light text
//           padding: inline ? "0.2em 0.4em" : "1em",
//           borderRadius: "3px",
//           fontFamily: "monospace",
//           display: inline ? "inline-block" : "block",
//           marginBottom: inline ? "0" : "20px",
//           overflowX: "auto"
//         }}
//         {...props}
//       >
//         {children}
//       </code>
//     ),
    
//     // Blockquotes
//     blockquote: ({ node, ...props }) => (
//       <blockquote
//         style={{
//           borderLeft: "4px solid #4b5563",
//           paddingLeft: "1em",
//           color: "#9ca3af",
//           marginBottom: "20px",
//           backgroundColor: "rgba(17, 24, 39, 0.5)" // Slightly darker background
//         }}
//         {...props}
//       />
//     ),
    
//     // Lists
//     ul: ({ node, depth, ...props }) => (
//       <ul 
//         style={{
//           listStyleType: depth > 0 ? 'circle' : 'disc',
//           paddingLeft: depth > 0 ? '1.5rem' : '1rem',
//           marginBottom: '1.5rem',
//           color: '#d1d5db' // Light gray text
//         }}
//         {...props}
//       />
//     ),
    
//     ol: ({ node, depth, ...props }) => (
//       <ol 
//         style={{
//           listStyleType: depth > 0 ? 'lower-alpha' : 'decimal',
//           paddingLeft: depth > 0 ? '1.5rem' : '1rem',
//           marginBottom: '1rem',
//           color: '#d1d5db'
//         }}
//         {...props}
//       />
//     ),
    
//     li: ({ node, ordered, ...props }) => (
//       <li 
//         style={{
//           marginBottom: '0.5rem',
//           lineHeight: '1.6',
//           position: 'relative',
//           paddingLeft: '0.5rem',
//           color: '#d1d5db'
//         }}
//         {...props}
//       />
//     ),
    
//     // Tables (if using remarkGfm)
//     table: ({ node, ...props }) => (
//       <div style={{ overflowX: "auto", marginBottom: "20px" }}>
//         <table
//           style={{
//             borderCollapse: "collapse",
//             width: "100%",
//             backgroundColor: "#1f2937"
//           }}
//           {...props}
//         />
//       </div>
//     ),
//     th: ({ node, ...props }) => (
//       <th
//         style={{
//           border: "1px solid #374151",
//           padding: "8px 12px",
//           textAlign: "left",
//           backgroundColor: "#111827"
//         }}
//         {...props}
//       />
//     ),
//     td: ({ node, ...props }) => (
//       <td
//         style={{
//           border: "1px solid #374151",
//           padding: "8px 12px",
//           color: "#d1d5db"
//         }}
//         {...props}
//       />
//     )
//   }}
// />


//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }









"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "../../../components/header"
import Image from "next/image"
import { richTextToHTML, formatDate, calculateReadingTime } from "../../../lib/utils"

import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function BookReviewDetailPage() {
  const params = useParams()
  const slug = params.slug

  const [post, setPost] = useState(null)
  const [contentMarkdown, setContentMarkdown] = useState("")
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/uklife/${slug}`)
        const data = await res.json()

        if (data.success && data.data.page) {
          const page = data.data.page
          const blocks = data.data.blocks || []

          // Extract title safely:
          const title =
            page.properties?.["Post name"]?.title?.[0]?.plain_text ||
            "Untitled post"

          // Extract featured image URL from Photo URL property or page cover:
          const featured_image =
            page.properties?.["Photo URL"]?.url ||
            page.cover?.file?.url ||
            page.cover?.external?.url ||
            null

          // Excerpt text (optional)
          const excerpt =
            page.properties?.Excerpt?.rich_text?.[0]?.plain_text || ""

          // Published date (fallback to created_time)
          const published_at =
            page.properties?.["Post date original"]?.date?.start ||
            page.created_time

          // Extract content markdown by processing all blocks
          let fullContent = ""
          for (const block of blocks) {
            if (block.type === "paragraph") {
              const texts = block.paragraph.rich_text || []
              if (texts.length > 0) {
                fullContent += richTextToHTML(texts) + "\n\n"
              }
            } else if (block.type === "heading_1") {
              const texts = block.heading_1.rich_text || []
              if (texts.length > 0) {
                fullContent += "# " + texts.map(t => t.plain_text).join("") + "\n\n"
              }
            } else if (block.type === "heading_2") {
              const texts = block.heading_2.rich_text || []
              if (texts.length > 0) {
                fullContent += "## " + texts.map(t => t.plain_text).join("") + "\n\n"
              }
            } else if (block.type === "heading_3") {
              const texts = block.heading_3.rich_text || []
              if (texts.length > 0) {
                fullContent += "### " + texts.map(t => t.plain_text).join("") + "\n\n"
              }
            } else if (block.type === "bulleted_list_item") {
              const texts = block.bulleted_list_item.rich_text || []
              if (texts.length > 0) {
                fullContent += "- " + texts.map(t => t.plain_text).join("") + "\n"
              }
            } else if (block.type === "numbered_list_item") {
              const texts = block.numbered_list_item.rich_text || []
              if (texts.length > 0) {
                fullContent += "1. " + texts.map(t => t.plain_text).join("") + "\n"
              }
            } else if (block.type === "image") {
              const imageUrl = block.image.file?.url || block.image.external?.url || ""
              if (imageUrl) {
                fullContent += `![Alt text](${imageUrl})\n\n`
              }
            } else if (block.type === "quote") {
              const texts = block.quote.rich_text || []
              if (texts.length > 0) {
                fullContent += "> " + texts.map(t => t.plain_text).join("") + "\n\n"
              }
            } else if (block.type === "code") {
              const codeText = block.code.rich_text.map(t => t.plain_text).join("")
              const language = block.code.language
              fullContent += "```" + language + "\n" + codeText + "\n```\n\n"
            }
            // You can extend here to support other block types if needed.
          }

          setPost({
            title,
            featured_image,
            excerpt,
            published_at,
          })
          setContentMarkdown(fullContent.trim())
        } else {
          setPost(null)
        }
      } catch (err) {
        console.error("Failed to fetch post:", err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleImageError = () => setImageError(true)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex items-center justify-center w-56 h-56 rounded-lg">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-200 bg-blue-900 rounded-full animate-pulse">loading...</div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Post not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 theme-book-reviews theme-book-reviews">
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          {/* Cover Image Section */}
          <div className="w-full h-[300px] overflow-hidden bg-gray-700 relative">
            {post.featured_image && !imageError ? (
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                onError={handleImageError}
                unoptimized={true}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                <Image
                  src="/images/featured-image-placeholder.png"
                  alt={post.title}
                  width={200}
                  height={200}
                  className="opacity-50 invert"
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-serif font-bold text-white mb-3 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-400 space-x-4">
                <span>{formatDate(post.published_at)}</span>
                <span>•</span>
                <span>{calculateReadingTime(contentMarkdown)} </span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-300 prose-invert">
              {post.excerpt && (
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="text-gray-300">
                <ReactMarkdown
                  children={contentMarkdown}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    // Headings
                    h1: ({ node, ...props }) => (
                      <h1 style={{ 
                        fontSize: "2rem", 
                        marginBottom: "20px", 
                        fontWeight: "bolder",
                        color: "#e5e7eb"
                      }} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 style={{
                        fontSize: "1.25rem",
                        marginBottom: "8px", 
                        fontWeight: "bold",
                        color: "#e5e7eb"
                      }} {...props} />
                    ),
                    
                    // Paragraph
                    p: ({ node, ...props }) => (
                      <p style={{
                        marginBottom: "20px",
                        color: "#d1d5db"
                      }} {...props} />
                    ),
                    
                    // Horizontal rule
                    hr: ({ node, ...props }) => (
                      <hr style={{
                        borderColor: "#374151",
                        margin: "12px 0"
                      }} {...props} />
                    ),
                    
                    // Links
                    a: ({ node, ...props }) => (
                      <a style={{
                        color: "#60a5fa",
                        textDecoration: "none",
                        fontWeight: "500"
                      }} {...props} />
                    ),
                    
                    // Code blocks
                    code: ({ node, inline, className, children, ...props }) => (
                      <code
                        style={{
                          background: "#1f2937",
                          color: "#f3f4f6",
                          padding: inline ? "0.2em 0.4em" : "1em",
                          borderRadius: "3px",
                          fontFamily: "monospace",
                          display: inline ? "inline-block" : "block",
                          marginBottom: inline ? "0" : "20px",
                          overflowX: "auto"
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    ),
                    
                    // Blockquotes
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        style={{
                          borderLeft: "4px solid #4b5563",
                          paddingLeft: "1em",
                          color: "#9ca3af",
                          marginBottom: "20px",
                          backgroundColor: "rgba(17, 24, 39, 0.5)"
                        }}
                        {...props}
                      />
                    ),
                    
                    // Lists
                    ul: ({ node, depth, ...props }) => (
                      <ul 
                        style={{
                          listStyleType: depth > 0 ? 'circle' : 'disc',
                          paddingLeft: depth > 0 ? '1.5rem' : '1rem',
                          marginBottom: '1.5rem',
                          color: '#d1d5db'
                        }}
                        {...props}
                      />
                    ),
                    
                    ol: ({ node, depth, ...props }) => (
                      <ol 
                        style={{
                          listStyleType: depth > 0 ? 'lower-alpha' : 'decimal',
                          paddingLeft: depth > 0 ? '1.5rem' : '1rem',
                          marginBottom: '1rem',
                          color: '#d1d5db'
                        }}
                        {...props}
                      />
                    ),
                    
                    li: ({ node, ordered, ...props }) => (
                      <li 
                        style={{
                          marginBottom: '0.5rem',
                          lineHeight: '1.6',
                          position: 'relative',
                          paddingLeft: '0.5rem',
                          color: '#d1d5db'
                        }}
                        {...props}
                      />
                    ),
                    
                    // Tables (if using remarkGfm)
                    table: ({ node, ...props }) => (
                      <div style={{ overflowX: "auto", marginBottom: "20px" }}>
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            backgroundColor: "#1f2937"
                          }}
                          {...props}
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        style={{
                          border: "1px solid #374151",
                          padding: "8px 12px",
                          textAlign: "left",
                          backgroundColor: "#111827"
                        }}
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        style={{
                          border: "1px solid #374151",
                          padding: "8px 12px",
                          color: "#d1d5db"
                        }}
                        {...props}
                      />
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
