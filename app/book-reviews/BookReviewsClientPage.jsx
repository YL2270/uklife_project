// // "use client"

// // import { useEffect } from "react"
// // import PostCard from "../../components/post-card"
// // import { BookOpen, RefreshCw } from "lucide-react"
// // import Header from "../../components/header"
// // import Image from "next/image"
// // import { Button } from "../../components/ui/button"
// // import { useNotionPosts } from "../../hooks/use-notion-posts"
// // import { generateSlug } from "../../lib/utils" 


// // export default function BookReviewsClientPage({ initialPosts, initialUniqueTags }) {
  
// //   const { data, loading, error, refresh } = useNotionPosts("/api/posts/book-reviews", {
// //     posts: initialPosts,
// //     uniqueTags: initialUniqueTags,
// //   })

// //   const posts = data?.posts || initialPosts || []
// //   const uniqueTags = data?.uniqueTags || initialUniqueTags || []

  
// //   useEffect(() => {
// //     const interval = setInterval(
// //       () => {
// //         refresh()
// //       },
// //       5 * 60 * 1000,
// //     ) 

// //     return () => clearInterval(interval)
// //   }, [refresh])

// //   const pinnedPosts = posts.filter((post) => post.pinned)
// //   const nonPinnedPosts = posts.filter((post) => !post.pinned)

  
// //   nonPinnedPosts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

// //   return (
// //     <div className="min-h-screen flex flex-col bg-background theme-book-reviews">
// //       <Header />

// //       {}
// //       <section className="relative bg-gradient-to-r from-accent via-primary to-secondary text-primary-foreground py-20 pt-32 overflow-hidden">
// //         <Image
// //           src="/images/bookreview.png" 
// //           alt="Book Reviews Header"
// //           fill
// //           className="object-cover absolute inset-0 opacity-70"
// //           priority
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center animate-fade-in">
// //             <div className="flex justify-center mb-6">
// //               <div className="p-4 bg-primary-foreground/20 backdrop-blur-sm rounded-full">
// //                 <BookOpen className="w-12 h-12" />
// //               </div>
// //             </div>
// //             <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Book Reviews</h1>
// //             <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-6">
// //               Dive into my literary journey. From timeless classics to contemporary masterpieces, discover books that
// //               have shaped my perspective and might inspire yours.
// //             </p>
// //             <Button
// //               onClick={refresh}
// //               variant="secondary"
// //               disabled={loading}
// //               className="animate-fade-in"
// //               style={{ animationDelay: "0.5s" }}
// //             >
// //               <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
// //               Refresh Reviews
// //             </Button>
// //           </div>
// //         </div>
// //       </section>

// //       {}
// //       <section className="py-16 flex-grow">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           {error && (
// //             <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
// //               <p className="text-red-800">Error loading reviews: {error}</p>
// //               <Button onClick={refresh} variant="outline" size="sm" className="mt-2 bg-transparent">
// //                 Try Again
// //               </Button>
// //             </div>
// //           )}

// //           {loading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <div className="loading-dots">
// //                 <div></div>
// //                 <div></div>
// //                 <div></div>
// //                 <div></div>
// //               </div>
// //             </div>
// //           ) : (
// //             <>
// //               {}
// //               {pinnedPosts.length > 0 && (
// //                 <div id="pinned-reviews" className="mb-16 animate-slide-up pt-16 -mt-16">
// //                   <div className="flex items-center justify-between mb-8">
// //                     <h2 className="text-3xl font-serif font-bold text-foreground">Pinned Reviews</h2>
// //                     <span className="text-sm text-muted-foreground">
// //                       {pinnedPosts.length} pinned review{pinnedPosts.length !== 1 ? "s" : ""}
// //                     </span>
// //                   </div>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {pinnedPosts.map((post, index) => (
// //                       <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
// //                         <PostCard post={post} featured={true} />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {}
// //               {uniqueTags.length > 0 ? (
// //                 <div className="space-y-16">
// //                   {uniqueTags.map((tag, blockIndex) => {
// //                     const postsForTag = nonPinnedPosts.filter((post) => post.tags && post.tags.includes(tag))
// //                     if (postsForTag.length === 0) return null
// //                     return (
// //                       <div
// //                         key={tag}
// //                         id={generateSlug(tag)} 
// //                         className="animate-slide-up pt-16 -mt-16" 
// //                         style={{ animationDelay: `${blockIndex * 0.1}s` }}
// //                       >
// //                         <div className="flex items-center justify-between mb-8">
// //                           <h2 className="text-3xl font-serif font-bold text-foreground">#{tag}</h2>
// //                           <span className="text-sm text-muted-foreground">
// //                             {postsForTag.length} review{postsForTag.length !== 1 ? "s" : ""}
// //                           </span>
// //                         </div>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                           {postsForTag.map((post, postIndex) => (
// //                             <div
// //                               key={post.id}
// //                               className="animate-fade-in"
// //                               style={{ animationDelay: `${postIndex * 0.05}s` }}
// //                             >
// //                               <PostCard post={post} />
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )
// //                   })}
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-16">
// //                   <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //                   <h3 className="text-xl font-serif font-semibold text-foreground mb-2">No book reviews yet</h3>
// //                   <p className="text-muted-foreground mb-4">
// //                     Check back soon for my latest book reviews and recommendations!
// //                   </p>
// //                   <Button onClick={refresh} variant="outline">
// //                     <RefreshCw className="h-4 w-4 mr-2" />
// //                     Check for Updates
// //                   </Button>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </section>
// //     </div>
// //   )
// // }















// "use client"

// import { useEffect, useState } from "react"
// import PostCard from "../../components/post-card"
// import { BookOpen, RefreshCw } from "lucide-react"
// import Header from "../../components/header"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "../../components/ui/button"
// import { generateSlug } from "../../lib/utils"

// export default function BookReviewsClientPage({ initialPosts = [], initialUniqueTags = [] }) {
//   const [posts, setPosts] = useState(initialPosts)
//   const [uniqueTags, setUniqueTags] = useState(initialUniqueTags)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const fetchPosts = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch('/api/posts/book-reviews')
//       const data = await response.json()
//       if (data.success) {
//         setPosts(data.data.posts)
//         extractAndSetTags(data.data.posts)
//       } else {
//         throw new Error(data.error || 'Failed to fetch book reviews')
//       }
//     } catch (err) {
//       setError(err.message)
//       console.error('Fetch error:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const extractAndSetTags = (posts) => {
//     const tagMap = new Map()
    
//     posts.forEach(post => {
//       const postTags = post.tags || []
      
//       postTags.forEach(tag => {
//         tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
//       })
//     })
    
//     const sortedTags = Array.from(tagMap.entries())
//       .sort((a, b) => b[1] - a[1])
//       .map(([tag]) => tag)
    
//     setUniqueTags(sortedTags)
//   }

//   useEffect(() => {
//     if (initialPosts.length === 0) {
//       fetchPosts()
//     } else {
//       extractAndSetTags(initialPosts)
//     }
//   }, [])

//   useEffect(() => {
//     const interval = setInterval(fetchPosts, 5 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [])

//   const getPostsForTag = (tag) => {
//     return posts.filter(post => {
//       const postTags = post.tags || []
//       return postTags.includes(tag)
//     })
//   }

//   const pinnedPosts = posts.filter((post) => post.pinned)
//   const nonPinnedPosts = posts.filter((post) => !post.pinned)
  
//   nonPinnedPosts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

//   return (
//     <div className="min-h-screen flex flex-col bg-background theme-book-reviews">
//       <Header />

//       {/* <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-16 bg-background">
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
//           <div className="text-foreground text-center md:text-left flex flex-col justify-center h-full">
//             <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
//               Literary <br />
//               <span className="book-reviews-gradient-text">Explorations</span>
//             </h1>
//             <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
//               Discover my journey through books - from timeless classics to contemporary masterpieces that have shaped my perspective.
//             </p>
//             <div className="flex gap-4 items-center">
//               <Link
//                 href="#reviews-section"
//                 className="inline-block w-fit mx-auto md:mx-0 px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-hover transition-colors duration-300 animate-slide-up"
//                 style={{ animationDelay: "0.6s" }}
//               >
//                 Browse Reviews
//               </Link>
//               <Button
//                 onClick={fetchPosts}
//                 variant="outline"
//                 size="sm"
//                 disabled={loading}
//                 className="animate-slide-up bg-transparent"
//                 style={{ animationDelay: "0.7s" }}
//               >
//                 <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
//                 Refresh
//               </Button>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center justify-center h-full p-8">
//             <div className="relative w-full h-full max-w-md max-h-[400px] lg:max-h-[500px] animate-scale-in group" style={{ animationDelay: "0.8s" }}>
//               <Image
//                 src="/images/bookreview.png"
//                 alt="Book Reviews Decorative"
//                 fill
//                 className="object-cover rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </section> */}



      




//       <section className="relative bg-gradient-to-r from-accent via-primary to-secondary text-primary-foreground py-20 pt-32 overflow-hidden">
//         <Image
//           src="/images/bookreview.jpeg"
//           alt="Book Reviews Header"
//           fill
//           className="object-cover absolute inset-0 opacity-70"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center animate-fade-in">
//             <div className="flex justify-center mb-6">
//               <div className="p-4 bg-primary-foreground/20 backdrop-blur-sm rounded-full">
//                 <BookOpen className="w-12 h-12" />
//               </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Book Reviews</h1>
//             <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-6">
//               Dive into my literary journey. From timeless classics to contemporary masterpieces, discover books that
//               have shaped my perspective and might inspire yours.
//             </p>
//             <Button
//                 onClick={fetchPosts}
//                 variant="outline"
//                 size="sm"
//                 disabled={loading}
//                 className="animate-slide-up bg-transparent"
//                 style={{ animationDelay: "0.7s" }}
//               >
//                 <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
//                 Refresh
//             </Button>
//           </div>
//         </div>
//       </section>







//       <section id="reviews-section" className="py-16 flex-grow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
//               <p className="text-red-800">Error loading reviews: {error}</p>
//               <Button onClick={fetchPosts} variant="outline" size="sm" className="mt-2 bg-transparent">
//                 Try Again
//               </Button>
//             </div>
//           )}

//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="h-48 bg-muted rounded-t-lg"></div>
//                   <div className="p-6 space-y-4">
//                     <div className="h-6 bg-muted rounded"></div>
//                     <div className="h-4 bg-muted rounded w-3/4"></div>
//                     <div className="h-4 bg-muted rounded"></div>
//                     <div className="h-4 bg-muted rounded w-5/6"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <>
//               {pinnedPosts.length > 0 && (
//                 <div id="pinned-reviews" className="mb-16 animate-slide-up pt-16 -mt-16">
//                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
//                     <h2 className="text-3xl font-serif font-bold text-foreground">
//                       Featured Reviews
//                       <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
//                         {pinnedPosts.length} {pinnedPosts.length === 1 ? 'review' : 'reviews'}
//                       </span>
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {pinnedPosts.map((post, index) => (
//                       <div
//                         key={post.id}
//                         className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
//                         style={{ animationDelay: `${index * 0.1}s` }}
//                       >
//                         <PostCard post={post} featured={true} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {uniqueTags.length > 0 ? (
//                 <div className="space-y-16">
//                   {uniqueTags.map((tag, blockIndex) => {
//                     const postsForTag = getPostsForTag(tag)
                    
//                     if (postsForTag.length === 0) return null
                    
//                     return (
//                       <div
//                         key={tag}
//                         id={generateSlug(tag)}
//                         className="animate-slide-up pt-16 -mt-16"
//                         style={{ animationDelay: `${blockIndex * 0.1}s` }}
//                       >
//                         <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
//                           <h2 className="text-3xl font-serif font-bold text-foreground">
//                             #{tag}
//                             <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
//                               {postsForTag.length} {postsForTag.length === 1 ? 'review' : 'reviews'}
//                             </span>
//                           </h2>
//                           <Link 
//                             href={`/book-reviews/${generateSlug(tag)}`}
//                             className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
//                           >
//                             View all →
//                           </Link>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                           {postsForTag.map((post, postIndex) => (
//                             <div
//                               key={post.id}
//                               className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
//                               style={{ animationDelay: `${postIndex * 0.05}s` }}
//                             >
//                               <PostCard post={post} />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               ) : (
//                 <div className="text-center py-16">
//                   <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-xl font-serif font-semibold text-foreground mb-2">No book reviews yet</h3>
//                   <p className="text-muted-foreground">
//                     Check back soon for my latest book reviews and recommendations!
//                   </p>
//                   <Button onClick={fetchPosts} variant="outline" className="mt-4 bg-transparent">
//                     <RefreshCw className="h-4 w-4 mr-2" />
//                     Check for Updates
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }













"use client"

import { useEffect, useState } from "react"
import PostCardDark from "../../components/post-card-dark"
import { BookOpen, RefreshCw } from "lucide-react"
import Header from "../../components/header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { generateSlug } from "../../lib/utils"

export default function BookReviewsClientPage({ initialPosts = [], initialUniqueTags = [] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [uniqueTags, setUniqueTags] = useState(initialUniqueTags)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/posts/book-reviews')
      const data = await response.json()
      if (data.success) {
        setPosts(data.data.posts)
        extractAndSetTags(data.data.posts)
      } else {
        throw new Error(data.error || 'Failed to fetch book reviews')
      }
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const extractAndSetTags = (posts) => {
    const tagMap = new Map()
    
    posts.forEach(post => {
      const postTags = post.tags || []
      
      postTags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })
    
    const sortedTags = Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
    
    setUniqueTags(sortedTags)
  }

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchPosts()
    } else {
      extractAndSetTags(initialPosts)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchPosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getPostsForTag = (tag) => {
    return posts.filter(post => {
      const postTags = post.tags || []
      return postTags.includes(tag)
    })
  }

  const pinnedPosts = posts.filter((post) => post.pinned)
  const nonPinnedPosts = posts.filter((post) => !post.pinned)
  
  nonPinnedPosts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 theme-book-reviews">
      <Header />

      <section className="relative from-blue-900 via-blue-700 to-purple-700 text-white py-20 pt-32 overflow-hidden">
        <Image
          src="/images/book_review_image.jpg"
          alt="Book Reviews Header"
          fill
          className="object-cover absolute inset-0 opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Book Reviews</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
              Dive into my literary journey. From timeless classics to contemporary masterpieces, discover books that
              have shaped my perspective and might inspire yours.
            </p>
            <Button
              onClick={fetchPosts}
              variant="outline"
              size="sm"
              disabled={loading}
              className="animate-slide-up bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      <section id="reviews-section" className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-4 mb-8">
              <p className="text-red-200">Error loading reviews: {error}</p>
              <Button 
                onClick={fetchPosts} 
                variant="outline" 
                size="sm" 
                className="mt-2 bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
              >
                Try Again
              </Button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-800 rounded-t-lg"></div>
                  <div className="p-6 space-y-4 bg-gray-800 rounded-b-lg">
                    <div className="h-6 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {pinnedPosts.length > 0 && (
                <div id="pinned-reviews" className="mb-16 animate-slide-up pt-16 -mt-16">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                    <h2 className="text-3xl font-serif font-bold text-white">
                      Featured Reviews
                      <span className="ml-3 text-sm font-sans font-normal text-gray-400">
                        {pinnedPosts.length} {pinnedPosts.length === 1 ? 'review' : 'reviews'}
                      </span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pinnedPosts.map((post, index) => (
                      <div
                        key={post.id}
                        className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PostCardDark post={post} featured={true} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uniqueTags.length > 0 ? (
                <div className="space-y-16">
                  {uniqueTags.map((tag, blockIndex) => {
                    const postsForTag = getPostsForTag(tag)
                    
                    if (postsForTag.length === 0) return null
                    
                    return (
                      <div
                        key={tag}
                        id={generateSlug(tag)}
                        className="animate-slide-up pt-16 -mt-16"
                        style={{ animationDelay: `${blockIndex * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                          <h2 className="text-3xl font-serif font-bold text-white">
                            #{tag}
                            <span className="ml-3 text-sm font-sans font-normal text-gray-400">
                              {postsForTag.length} {postsForTag.length === 1 ? 'review' : 'reviews'}
                            </span>
                          </h2>
                          <Link 
                            href={`/book-reviews/category/${tag}`}
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            All →
                          </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {postsForTag.map((post, postIndex) => (
                            <div
                              key={post.id}
                              className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
                              style={{ animationDelay: `${postIndex * 0.05}s` }}
                            >
                              <PostCardDark post={post} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-white mb-2">No book reviews yet</h3>
                  <p className="text-gray-400">
                    Check back soon for my latest book reviews and recommendations!
                  </p>
                  <Button 
                    onClick={fetchPosts} 
                    variant="outline" 
                    className="mt-4 bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check for Updates
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}