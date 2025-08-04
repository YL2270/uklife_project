
// "use client"

// import { useEffect, useState } from "react"
// import PostCard from "../../../../components/post-card"
// import { Heart, RefreshCw } from "lucide-react"
// import Header from "../../../../components/header"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "../../../../components/ui/button"
// import { generateSlug } from "../../../../lib/utils"

// export default function UKLifeClientPage({params, initialPosts = [], initialUniqueSubTopics = [] }) {
//   const [posts, setPosts] = useState(initialPosts)
//   const [uniqueSubTopics, setUniqueSubTopics] = useState(initialUniqueSubTopics)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)


//   // console.log("I AM FROM PAGE: ", "Hi How Are you Route?");
//   // console.log("SLUG: ", params.slug);

//   const fetchPosts = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch(`/api/posts/book-reviews/category/${params.slug}`)
//       const data = await response.json()

//       console.log("Data: ", data);

//       if (data.success) {
//         setPosts(data.data.posts)
//         // Extract and organize topics from posts
//         extractAndSetTopics(data.data.posts)
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

//   const extractAndSetTopics = (posts) => {
//     // Create a map to count topic occurrences
//     const topicMap = new Map()
    
//     posts.forEach(post => {
//       // First try to get from sub_topic select field
//       const subTopic = post.rawProperties?.sub_topic?.select?.name
      
//       // Then try to get from tags if no sub_topic
//       const primaryTag = post.tags?.[0]
      
//       // Determine the topic to use
//       const topic = subTopic || primaryTag || 'General'
      
//       // Update the count in our map
//       topicMap.set(topic, (topicMap.get(topic) || 0) + 1)
//     })
    
//     // Convert to array and sort by count (descending)
//     const sortedTopics = Array.from(topicMap.entries())
//       .sort((a, b) => b[1] - a[1])
//       .map(([topic]) => topic)
    
//     setUniqueSubTopics(sortedTopics)
//   }

//   useEffect(() => {
//     // Initial load if no initial posts
//     if (initialPosts.length === 0) {
//       fetchPosts()
//     } else {
//       // Extract topics from initial posts if provided
//       extractAndSetTopics(initialPosts)
//     }
//   }, [])

//   useEffect(() => {
//     // Auto-refresh every 5 minutes
//     const interval = setInterval(fetchPosts, 5 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [])

//   const getPostsForTopic = (topic) => {
//     return posts.filter(post => {
//       const postSubTopic = post.rawProperties?.sub_topic?.select?.name
//       const postTags = post.tags || []
      
//       // Match if:
//       // 1. The post's sub_topic matches the topic
//       // 2. Or the topic is in the post's tags
//       // 3. Or it's the General category and post has no specific topic
//       return (
//         postSubTopic === topic ||
//         postTags.includes(topic) ||
//         (topic === 'General' && !postSubTopic && postTags.length === 0)
//       )
//     })
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-background theme-uk-life">
//       <Header />

//       {/* Posts Section */}
//       <section id="posts-section" className="py-16 flex-grow mt-5">
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
//                 const postsForTopic = getPostsForTopic(topic)
                
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
import PostCard from "../../../../components/post-card"
import { Heart, RefreshCw } from "lucide-react"
import Header from "../../../../components/header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { generateSlug } from "../../../../lib/utils"
import PostCardDark from "../../../../components/post-card-dark.jsx"

export default function BookReviewClientPage({params, initialPosts = [], initialUniqueSubTopics = [] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [uniqueSubTopics, setUniqueSubTopics] = useState(initialUniqueSubTopics)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/posts/book-reviews/category/${params.slug}`)
      const data = await response.json()

      console.log("Data: ", data);

      if (data.success) {
        setPosts(data.data.posts)
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
    const topicMap = new Map()
    
    posts.forEach(post => {
      const subTopic = post.rawProperties?.sub_topic?.select?.name
      const primaryTag = post.tags?.[0]
      const topic = subTopic || primaryTag || 'General'
      topicMap.set(topic, (topicMap.get(topic) || 0) + 1)
    })
    
    const sortedTopics = Array.from(topicMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([topic]) => topic)
    
    setUniqueSubTopics(sortedTopics)
  }

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchPosts()
    } else {
      extractAndSetTopics(initialPosts)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchPosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getPostsForTopic = (topic) => {
    return posts.filter(post => {
      const postSubTopic = post.rawProperties?.sub_topic?.select?.name
      const postTags = post.tags || []
      
      return (
        postSubTopic === topic ||
        postTags.includes(topic) ||
        (topic === 'General' && !postSubTopic && postTags.length === 0)
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 theme-book-reviews">
      <Header />

      {/* Posts Section */}
      <section id="posts-section" className="py-16 flex-grow mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-4 mb-8">
              <p className="text-red-200">Error loading posts: {error}</p>
              <Button 
                onClick={fetchPosts} 
                variant="outline" 
                size="sm" 
                className="mt-2 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
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
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                      <h2 className="text-3xl font-serif font-bold text-white">
                        {topic}
                        <span className="ml-3 text-sm font-sans font-normal text-gray-400">
                          {postsForTopic.length} {postsForTopic.length === 1 ? 'story' : 'stories'}
                        </span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {postsForTopic.map((post, postIndex) => (
                        <div
                          key={post.id}
                          className="animate-fade-in hover:scale-[1.02] transition-transform duration-300"
                          style={{ animationDelay: `${postIndex * 0.05}s` }}
                        >
                          <PostCardDark post={post} darkMode />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-white mb-2">No UK life stories yet</h3>
              <p className="text-gray-400">
                Check back soon for personal stories and life experiences in the UK!
              </p>
              <Button 
                onClick={fetchPosts} 
                variant="outline" 
                className="mt-4 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
              >
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