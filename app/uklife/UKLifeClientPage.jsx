// // "use client"

// // import { useEffect } from "react"
// // import PostCard from "../../components/post-card"
// // import { Heart, RefreshCw } from "lucide-react"
// // import Header from "../../components/header"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { Button } from "../../components/ui/button"
// // import { useNotionPosts } from "../../hooks/use-notion-posts"
// // import { generateSlug } from "../../lib/utils" // Corrected import path

// // export default function UKLifeClientPage({ initialPosts, initialUniqueSubTopics }) {
// //   // Use the custom hook for real-time updates
// //   const { data, loading, error, refresh } = useNotionPosts("/api/posts/uklife", {
// //     posts: initialPosts,
// //     uniqueSubTopics: initialUniqueSubTopics,
// //   })

// //   // const posts = data?.posts || initialPosts || []
// //   const posts = (data?.posts || initialPosts || []).map(post => ({
// //     ...post,
// //     collections: post.collections || [] // Ensure collections exists
// //   }))

// //   const uniqueSubTopics = data?.uniqueSubTopics || initialUniqueSubTopics || []

// //   // Auto-refresh every 5 minutes to catch webhook updates
// //   useEffect(() => {
// //     const interval = setInterval(
// //       () => {
// //         refresh()
// //       },
// //       5 * 60 * 1000,
// //     ) // 5 minutes

// //     return () => clearInterval(interval)
// //   }, [refresh])

// //   return (
// //     <div className="min-h-screen flex flex-col bg-background theme-uk-life">
// //       <Header />

// //       {/* Hero Section - Updated to solid background */}
// //       <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-16 bg-background">
// //         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
// //           {/* Left Content Area */}
// //           <div className="text-foreground text-center md:text-left flex flex-col justify-center h-full">


            


// //             <h1
// //               className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in"
// //               style={{ animationDelay: "0.2s" }}
// //             >
// //               Life In <br />
// //               <span className="uk-life-gradient-text">United Kingdom</span>
// //             </h1>
// //             <p
// //               className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in"
// //               style={{ animationDelay: "0.4s" }}
// //             >
// //               Discover personal stories, travel experiences, and insights into life in the United Kingdom. From bustling
// //               cities to serene countryside, explore the charm and nuances of British living.
// //             </p>
// //             <div className="flex gap-4 items-center">
// //               <Link
// //                 href="#posts-section"
// //                 className="inline-block w-fit mx-auto md:mx-0 px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-hover transition-colors duration-300 animate-slide-up"
// //                 style={{ animationDelay: "0.6s" }}
// //               >
// //                 Read More
// //               </Link>
// //               <Button
// //                 onClick={refresh}
// //                 variant="outline"
// //                 size="sm"
// //                 disabled={loading}
// //                 className="animate-slide-up bg-transparent"
// //                 style={{ animationDelay: "0.7s" }}
// //               >
// //                 <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
// //                 Refresh
// //               </Button>
// //             </div>
// //           </div>

// //           {/* Right Image Area */}
// //           <div className="hidden md:flex items-center justify-center h-full p-8">
// //             <div
// //               className="relative w-full h-full max-w-md max-h-[400px] lg:max-h-[500px] animate-scale-in group"
// //               style={{ animationDelay: "0.8s" }}
// //             >
// //               <Image
// //                 src="/images/uklife.webp" // Corrected image path
// //                 alt="UK Life Decorative"
// //                 fill
// //                 className="object-cover rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
// //                 priority
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Posts Section - Grouped by Sub-topic */}
// //       <section id="posts-section" className="py-16 flex-grow">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           {error && (
// //             <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
// //               <p className="text-red-800">Error loading posts: {error}</p>
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
// //           ) : uniqueSubTopics.length > 0 ? (
// //             <div className="space-y-16">
// //               {uniqueSubTopics.map((topic, blockIndex) => {
// //                 const postsForTopic = posts.filter((post) => post.sub_topic === topic)
// //                 if (postsForTopic.length === 0) return null
// //                 return (
// //                   <div
// //                     key={topic}
// //                     id={generateSlug(topic)} // Add ID for scrolling
// //                     className="animate-slide-up pt-16 -mt-16" // pt-16 and -mt-16 for scroll offset
// //                     style={{ animationDelay: `${blockIndex * 0.1}s` }}
// //                   >
// //                     <div className="flex items-center justify-between mb-8">
// //                       <h2 className="text-3xl font-serif font-bold text-foreground">{topic}</h2>
// //                       <span className="text-sm text-muted-foreground">
// //                         {postsForTopic.length} post{postsForTopic.length !== 1 ? "s" : ""}
// //                       </span>
// //                     </div>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                       {postsForTopic.map((post, postIndex) => (
// //                         <div
// //                           key={post.id}
// //                           className="animate-fade-in"
// //                           style={{ animationDelay: `${postIndex * 0.05}s` }}
// //                         >
// //                           <PostCard post={post} />
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )
// //               })}
// //             </div>
// //           ) : (
// //             <div className="text-center py-16">
// //               <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //               <h3 className="text-xl font-serif font-semibold text-foreground mb-2">No UK life stories yet</h3>
// //               <p className="text-muted-foreground">
// //                 Check back soon for personal stories and life experiences in the UK!
// //               </p>
// //               <Button onClick={refresh} variant="outline" className="mt-4 bg-transparent">
// //                 <RefreshCw className="h-4 w-4 mr-2" />
// //                 Check for Updates
// //               </Button>
// //             </div>
// //           )}
// //         </div>
// //       </section>
// //     </div>
// //   )
// // }

















// "use client"

// import { useEffect, useState } from "react"
// import PostCard from "../../components/post-card"
// import { Heart, RefreshCw } from "lucide-react"
// import Header from "../../components/header"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "../../components/ui/button"
// import { generateSlug } from "../../lib/utils"

// export default function UKLifeClientPage({ initialPosts = [], initialUniqueSubTopics = [] }) {
//   const [posts, setPosts] = useState(initialPosts)
//   const [uniqueSubTopics, setUniqueSubTopics] = useState(initialUniqueSubTopics)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const fetchPosts = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch('/api/posts/uklife')
//       const data = await response.json()
//       if (data.success) {
//         setPosts(data.data.posts)
//         // Extract unique sub-topics from posts
//         const topics = [...new Set(data.data.posts.map(post => 
//           post.rawProperties?.sub_topic?.select?.name || 'General'
//         ))]
//         setUniqueSubTopics(topics)
//       } else {
//         throw new Error(data.error || 'Failed to fetch posts')
//       }
//     } catch (err) {
//       setError(err.message)
//       console.error('Fetch error:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     // Initial load if no initial posts
//     if (initialPosts.length === 0) {
//       fetchPosts()
//     }
//   }, [])

//   useEffect(() => {
//     // Auto-refresh every 5 minutes
//     const interval = setInterval(fetchPosts, 5 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="min-h-screen flex flex-col bg-background theme-uk-life">
//       <Header />

//       {/* Hero Section */}
//       <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-16 bg-background">
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
//           <div className="text-foreground text-center md:text-left flex flex-col justify-center h-full">
//             <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
//               Life In <br />
//               <span className="uk-life-gradient-text">United Kingdom</span>
//             </h1>
//             <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
//               Discover personal stories, travel experiences, and insights into life in the United Kingdom.
//             </p>
//             <div className="flex gap-4 items-center">
//               <Link
//                 href="#posts-section"
//                 className="inline-block w-fit mx-auto md:mx-0 px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-hover transition-colors duration-300 animate-slide-up"
//                 style={{ animationDelay: "0.6s" }}
//               >
//                 Read More
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
//                 src="/images/uklife.webp"
//                 alt="UK Life Decorative"
//                 fill
//                 className="object-cover rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Posts Section */}
//       <section id="posts-section" className="py-16 flex-grow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
//               <p className="text-red-800">Error loading posts: {error}</p>
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
//           ) : uniqueSubTopics.length > 0 ? (
//             <div className="space-y-16">
//               {uniqueSubTopics.map((topic, blockIndex) => {
//                 const postsForTopic = posts.filter(post => 
//                   post.rawProperties?.sub_topic?.select?.name === topic || 
//                   (topic === 'General' && !post.rawProperties?.sub_topic?.select?.name)
//                 )
                
//                 if (postsForTopic.length === 0) return null
                
//                 return (
//                   <div
//                     key={topic}
//                     id={generateSlug(topic)}
//                     className="animate-slide-up pt-16 -mt-16"
//                     style={{ animationDelay: `${blockIndex * 0.1}s` }}
//                   >
//                     <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
//                       <h2 className="text-3xl font-serif font-bold text-foreground">
//                         {topic}
//                         <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
//                           {postsForTopic.length} {postsForTopic.length === 1 ? 'story' : 'stories'}
//                         </span>
//                       </h2>
//                       <Link 
//                         href={`/uk-life/${generateSlug(topic)}`}
//                         className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
//                       >
//                         View all →
//                       </Link>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                       {postsForTopic.map((post, postIndex) => (
//                         <div
//                           key={post.id}
//                           className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
//                           style={{ animationDelay: `${postIndex * 0.05}s` }}
//                         >
//                           <PostCard post={post} />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-xl font-serif font-semibold text-foreground mb-2">No UK life stories yet</h3>
//               <p className="text-muted-foreground">
//                 Check back soon for personal stories and life experiences in the UK!
//               </p>
//               <Button onClick={fetchPosts} variant="outline" className="mt-4 bg-transparent">
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Check for Updates
//               </Button>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }















"use client"

import { useEffect, useState } from "react"
import PostCard from "../../components/post-card"
import { Heart, RefreshCw } from "lucide-react"
import Header from "../../components/header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { generateSlug } from "../../lib/utils"

export default function UKLifeClientPage({ initialPosts = [], initialUniqueSubTopics = [] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [uniqueSubTopics, setUniqueSubTopics] = useState(initialUniqueSubTopics)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/posts/uklife')
      const data = await response.json()
      if (data.success) {
        setPosts(data.data.posts)
        // Extract and organize topics from posts
        extractAndSetTopics(data.data.posts)
      } else {
        throw new Error(data.error || 'Failed to fetch posts')
      }
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const extractAndSetTopics = (posts) => {
    // Create a map to count topic occurrences
    const topicMap = new Map()
    
    posts.forEach(post => {
      // First try to get from sub_topic select field
      const subTopic = post.rawProperties?.sub_topic?.select?.name
      
      // Then try to get from tags if no sub_topic
      const primaryTag = post.tags?.[0]
      
      // Determine the topic to use
      const topic = subTopic || primaryTag || 'General'
      
      // Update the count in our map
      topicMap.set(topic, (topicMap.get(topic) || 0) + 1)
    })
    
    // Convert to array and sort by count (descending)
    const sortedTopics = Array.from(topicMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([topic]) => topic)
    
    setUniqueSubTopics(sortedTopics)
  }

  useEffect(() => {
    // Initial load if no initial posts
    if (initialPosts.length === 0) {
      fetchPosts()
    } else {
      // Extract topics from initial posts if provided
      extractAndSetTopics(initialPosts)
    }
  }, [])

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchPosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getPostsForTopic = (topic) => {
    return posts.filter(post => {
      const postSubTopic = post.rawProperties?.sub_topic?.select?.name
      const postTags = post.tags || []
      
      // Match if:
      // 1. The post's sub_topic matches the topic
      // 2. Or the topic is in the post's tags
      // 3. Or it's the General category and post has no specific topic
      return (
        postSubTopic === topic ||
        postTags.includes(topic) ||
        (topic === 'General' && !postSubTopic && postTags.length === 0)
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background theme-uk-life">
      <Header />

      {/* Hero Section (unchanged) */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-16 bg-background">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="text-foreground text-center md:text-left flex flex-col justify-center h-full">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              YL <br />
              <span className="uk-life-gradient-text">英國生活</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
             Hi ，我是YL，旅英台灣人。和另一半定居倫敦、共同養育兩男寶中。我在這裡分享我的英倫育兒生活、英國教育和私校心得、親子旅遊、以及我的創業和居家生活。
            </p>
            <div className="flex gap-4 items-center">
              <Link
                href="#posts-section"
                className="inline-block w-fit mx-auto md:mx-0 px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-hover transition-colors duration-300 animate-slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                Read More
              </Link>
              <Button
                onClick={fetchPosts}
                variant="outline"
                size="sm"
                disabled={loading}
                className="animate-slide-up bg-transparent"
                style={{ animationDelay: "0.7s" }}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center h-full p-8">
            <div className="relative w-full h-full max-w-md max-h-[400px] lg:max-h-[500px] animate-scale-in group" style={{ animationDelay: "0.8s" }}>
              <Image
                src="/images/uk_life_header_image.JPG"
                alt="UK Life Decorative"
                fill
                className="object-cover rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts-section" className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
              <p className="text-red-800">Error loading posts: {error}</p>
              <Button onClick={fetchPosts} variant="outline" size="sm" className="mt-2 bg-transparent">
                Try Again
              </Button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : uniqueSubTopics.length > 0 ? (
            <div className="space-y-16">
              {uniqueSubTopics.map((topic, blockIndex) => {
                const postsForTopic = getPostsForTopic(topic)
                
                if (postsForTopic.length === 0) return null
                
                return (
                  <div
                    key={topic}
                    id={generateSlug(topic)}
                    className="animate-slide-up pt-16 -mt-16"
                    style={{ animationDelay: `${blockIndex * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                      <h2 className="text-3xl font-serif font-bold text-foreground">
                        {topic}
                        <span className="ml-3 text-sm font-sans font-normal text-muted-foreground">
                          {postsForTopic.length} {postsForTopic.length === 1 ? 'story' : 'stories'}
                        </span>
                      </h2>
                      <Link 
                        href={`/uklife/category/${topic}`}
                        className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                      >
                        All →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {postsForTopic.map((post, postIndex) => (
                        <div
                          key={post.id}
                          className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
                          style={{ animationDelay: `${postIndex * 0.05}s` }}
                        >
                          <PostCard post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">No UK life stories yet</h3>
              <p className="text-muted-foreground">
                Check back soon for personal stories and life experiences in the UK!
              </p>
              <Button onClick={fetchPosts} variant="outline" className="mt-4 bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Check for Updates
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
