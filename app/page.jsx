// // // import Link from "next/link"
// // // import { Button } from "../components/ui/button"
// // // import Header from "../components/header"

// // // export default function HomePage() {
// // //   return (
    
// // //     <>

// // //     <Header />

// // //     {/* <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200 max-h-[50vh] overflow-y-auto">
// // //       <nav className="flex flex-col space-y-2">
// // //         <Link
// // //           href="/about"
// // //           className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// // //         >
// // //           <span className="font-medium">About Me</span>
// // //         </Link>
// // //       </nav>
// // //     </div> */}
    
// // //       {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
// // //         <h1 className="text-5xl font-bold mb-6 text-center">Welcome to Your Notion Blog</h1>
// // //         <p className="text-xl text-center mb-8 max-w-2xl">
// // //           This site dynamically displays content synced from your Notion database via Make.com webhooks.
// // //         </p>
// // //         <div className="flex space-x-4">
// // //           <Button asChild>
// // //             <Link href="/book-reviews">View Book Reviews</Link>
// // //           </Button>
// // //           <Button asChild variant="outline">
// // //             <Link href="/uklife">View UK Life Posts</Link>
// // //           </Button>
// // //           <Button asChild variant="secondary">
// // //             <Link href="/notion-dashboard">Integration Dashboard</Link>
// // //           </Button>
// // //         </div>
// // //         <footer className="absolute bottom-4 text-sm text-gray-500">Powered by Next.js, Notion, and Make.com</footer>
// // //       </div> */}


// // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4 mt-10">
// // //         <h1 className="text-5xl font-bold text-center mb-4">
// // //           Welcome to <span className="text-amber-800">yilungc</span>
// // //         </h1>
// // //         <p className="text-lg text-center text-gray-600 mb-10 max-w-xl">
// // //           Choose your adventure: Dive into insightful book reviews or explore captivating UK life experiences.
// // //         </p>

// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
// // //           {/* Book Reviews Card */}
// // //           <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition duration-300 cursor-pointer">
// // //             <div className="flex flex-col items-center text-center">
// // //               <div className="bg-green-100 p-4 rounded-full mb-4">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2M4 6h16M4 6v12M20 6v12M4 18h16" />
// // //                 </svg>
// // //               </div>
// // //               <h2 className="text-2xl font-semibold text-green-700 mb-2">Book Reviews</h2>
// // //               <p className="text-gray-600 mb-4">Explore my thoughts on various books, from fiction to non-fiction.</p>
// // //               <a href="/book-reviews" className="text-green-700 font-medium hover:underline">
// // //                 Start Reading →
// // //               </a>
// // //             </div>
// // //           </div>

// // //           {/* UK Life Card */}
// // //           <div className="bg-white rounded-xl shadow-md p-6 border border-rose-200 hover:shadow-lg transition duration-300 cursor-pointer">
// // //             <div className="flex flex-col items-center text-center">
// // //               <div className="bg-rose-100 p-4 rounded-full mb-4">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318C5.11 5.526 6.136 5 7.2 5c1.063 0 2.09.526 2.882 1.318L12 8.236l1.918-1.918C14.71 5.526 15.737 5 16.8 5c1.064 0 2.09.526 2.882 1.318A4.013 4.013 0 0121 9.2c0 1.063-.526 2.09-1.318 2.882L12 19.764l-7.682-7.682A4.013 4.013 0 013 9.2c0-1.063.526-2.09 1.318-2.882z" />
// // //                 </svg>
// // //               </div>
// // //               <h2 className="text-2xl font-semibold text-rose-700 mb-2">UK Life</h2>
// // //               <p className="text-gray-600 mb-4">Discover personal stories, travel experiences, and insights into UK life.</p>
// // //               <a href="/uklife" className="text-rose-700 font-medium hover:underline">
// // //                 Start Exploring →
// // //               </a>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

      
// // //       </>
// // //   )
// // // }










// // 'use client'

// // import Link from "next/link"
// // import { Button } from "../components/ui/button"
// // import Header from "../components/header"

// // import { motion } from "framer-motion"

// // export default function HomePage() {
// //   // Floating animation variants
// //   const floatVariants = {
// //     float: {
// //       y: [0, -15, 0],
// //       transition: {
// //         duration: 6,
// //         repeat: Infinity,
// //         ease: "easeInOut"
// //       }
// //     }
// //   }

// //   return (
// //     <>
// //       <Header />
      
// //       <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 overflow-hidden">
// //         {/* Floating decorative elements */}
// //         <motion.div
// //           className="absolute top-20 left-10 w-8 h-8 rounded-full bg-amber-200/30 dark:bg-amber-600/20 blur-md"
// //           animate={{
// //             x: [0, 40, 0],
// //             y: [0, 60, 0],
// //           }}
// //           transition={{
// //             duration: 20,
// //             repeat: Infinity,
// //             repeatType: "reverse"
// //           }}
// //         />
// //         <motion.div
// //           className="absolute bottom-1/4 right-20 w-12 h-12 rounded-full bg-green-200/30 dark:bg-green-600/20 blur-md"
// //           animate={{
// //             x: [0, -30, 0],
// //             y: [0, -40, 0],
// //           }}
// //           transition={{
// //             duration: 15,
// //             repeat: Infinity,
// //             repeatType: "reverse"
// //           }}
// //         />
// //         <motion.div
// //           className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-rose-200/30 dark:bg-rose-600/20 blur-md"
// //           animate={{
// //             x: [0, 50, 0],
// //             y: [0, -30, 0],
// //           }}
// //           transition={{
// //             duration: 25,
// //             repeat: Infinity,
// //             repeatType: "reverse"
// //           }}
// //         />

// //         <div className="container mx-auto flex flex-col items-center justify-center min-h-[90vh] py-12 relative z-10">
// //           {/* Animated title */}
// //           <motion.h1 
// //             className="text-5xl md:text-6xl font-bold text-center mb-6"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             Welcome to <span className="text-amber-600 dark:text-amber-400">yilungc</span>
// //           </motion.h1>
          
// //           <motion.p 
// //             className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-xl"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             Choose your adventure: Dive into insightful book reviews or explore captivating UK life experiences.
// //           </motion.p>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
// //             {/* Book Reviews Card */}
// //             <motion.div
// //               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-200 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
// //               whileHover={{ y: -5 }}
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5, delay: 0.4 }}
// //             >
// //               <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full opacity-20 group-hover:opacity-30 transition duration-500"></div>
// //               <div className="relative z-10 flex flex-col items-center text-center">
// //                 <motion.div 
// //                   className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6"
// //                   variants={floatVariants}
// //                   animate="float"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2M4 6h16M4 6v12M20 6v12M4 18h16" />
// //                   </svg>
// //                 </motion.div>
// //                 <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-3">Book Reviews</h2>
// //                 <p className="text-gray-600 dark:text-gray-300 mb-6">Explore my thoughts on various books, from fiction to non-fiction.</p>
// //                 <Link href="/book-reviews" className="inline-flex items-center text-green-700 dark:text-green-400 font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
// //                   Start Reading <span className="ml-1">→</span>
// //                 </Link>
// //               </div>
// //             </motion.div>

// //             {/* UK Life Card */}
// //             <motion.div
// //               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-rose-200 dark:border-rose-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
// //               whileHover={{ y: -5 }}
// //               initial={{ opacity: 0, x: 20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5, delay: 0.4 }}
// //             >
// //               <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-100 dark:bg-rose-900/30 rounded-full opacity-20 group-hover:opacity-30 transition duration-500"></div>
// //               <div className="relative z-10 flex flex-col items-center text-center">
// //                 <motion.div 
// //                   className="bg-rose-100 dark:bg-rose-900/30 p-4 rounded-full mb-6"
// //                   variants={floatVariants}
// //                   animate="float"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318C5.11 5.526 6.136 5 7.2 5c1.063 0 2.09.526 2.882 1.318L12 8.236l1.918-1.918C14.71 5.526 15.737 5 16.8 5c1.064 0 2.09.526 2.882 1.318A4.013 4.013 0 0121 9.2c0 1.063-.526 2.09-1.318 2.882L12 19.764l-7.682-7.682A4.013 4.013 0 013 9.2c0-1.063.526-2.09 1.318-2.882z" />
// //                   </svg>
// //                 </motion.div>
// //                 <h2 className="text-2xl font-semibold text-rose-700 dark:text-rose-400 mb-3">UK Life</h2>
// //                 <p className="text-gray-600 dark:text-gray-300 mb-6">Discover personal stories, travel experiences, and insights into UK life.</p>
// //                 <Link href="/uklife" className="inline-flex items-center text-rose-700 dark:text-rose-400 font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
// //                   Start Exploring <span className="ml-1">→</span>
// //                 </Link>
// //               </div>
// //             </motion.div>
// //           </div>

// //           {/* Footer */}
// //           <motion.footer 
// //             className="mt-16 text-sm text-gray-500 dark:text-gray-400 text-center"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ duration: 0.8, delay: 0.6 }}
// //           >
// //             <p>Powered by Next.js, Notion, and Make.com</p>
// //           </motion.footer>
// //         </div>
// //       </div>
// //     </>
// //   )
// // }




// 'use client'

// import Link from "next/link"
// import { Button } from "../components/ui/button"
// import Header from "../components/header"
// import { motion } from "framer-motion"

// // Floating particle component
// const FloatingParticle = ({ color, size, position, duration }) => {
//   return (
//     <motion.div
//       className={`absolute rounded-full ${color} ${size}`}
//       style={{
//         left: `${position.x}%`,
//         top: `${position.y}%`,
//       }}
//       animate={{
//         x: [0, Math.random() * 100 - 50],
//         y: [0, Math.random() * 100 - 50],
//         opacity: [0.2, 0.8, 0.2],
//       }}
//       transition={{
//         duration: duration,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//       }}
//     />
//   )
// }

// export default function HomePage() {
//   // Generate random particles
//   const particles = Array.from({ length: 15 }).map((_, i) => ({
//     id: i,
//     color: i % 3 === 0 ? 'bg-green-400/10' : i % 3 === 1 ? 'bg-rose-400/10' : 'bg-amber-400/10',
//     size: i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-4 h-4' : 'w-2 h-2',
//     position: {
//       x: Math.random() * 90 + 5,
//       y: Math.random() * 90 + 5,
//     },
//     duration: Math.random() * 15 + 10,
//   }))

//   // Floating animation variants
//   const floatVariants = {
//     float: {
//       y: [0, -15, 0],
//       transition: {
//         duration: 6,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   }

//   return (
//     <>
//       <Header />
      
//       <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 overflow-hidden">
//         {/* Animated background particles */}
//         {particles.map((particle) => (
//           <FloatingParticle
//             key={particle.id}
//             color={particle.color}
//             size={particle.size}
//             position={particle.position}
//             duration={particle.duration}
//           />
//         ))}

//         {/* Main content container with proper spacing */}
//         <div className="container mx-auto flex flex-col items-center justify-center pt-24 pb-12 relative z-10">
//           {/* Animated title with new color scheme */}
//           <motion.h1 
//             className="text-5xl md:text-6xl font-bold text-center mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="text-green-600 dark:text-green-400">Welcome to </span>
//             <span className="text-rose-600 dark:text-rose-400">yilungc</span>
//           </motion.h1>
          
//           <motion.p 
//             className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-xl"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Choose your adventure: Dive into insightful book reviews or explore captivating UK life experiences.
//           </motion.p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
//             {/* Book Reviews Card */}
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-200 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full opacity-20 group-hover:opacity-30 transition duration-500"></div>
//               <div className="relative z-10 flex flex-col items-center text-center">
//                 <motion.div 
//                   className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6"
//                   variants={floatVariants}
//                   animate="float"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2M4 6h16M4 6v12M20 6v12M4 18h16" />
//                   </svg>
//                 </motion.div>
//                 <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-3">Book Reviews</h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">Explore my thoughts on various books, from fiction to non-fiction.</p>
//                 <Link href="/book-reviews" className="inline-flex items-center text-green-700 dark:text-green-400 font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
//                   Start Reading <span className="ml-1">→</span>
//                 </Link>
//               </div>
//             </motion.div>

//             {/* UK Life Card */}
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-rose-200 dark:border-rose-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-100 dark:bg-rose-900/30 rounded-full opacity-20 group-hover:opacity-30 transition duration-500"></div>
//               <div className="relative z-10 flex flex-col items-center text-center">
//                 <motion.div 
//                   className="bg-rose-100 dark:bg-rose-900/30 p-4 rounded-full mb-6"
//                   variants={floatVariants}
//                   animate="float"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318C5.11 5.526 6.136 5 7.2 5c1.063 0 2.09.526 2.882 1.318L12 8.236l1.918-1.918C14.71 5.526 15.737 5 16.8 5c1.064 0 2.09.526 2.882 1.318A4.013 4.013 0 0121 9.2c0 1.063-.526 2.09-1.318 2.882L12 19.764l-7.682-7.682A4.013 4.013 0 013 9.2c0-1.063.526-2.09 1.318-2.882z" />
//                   </svg>
//                 </motion.div>
//                 <h2 className="text-2xl font-semibold text-rose-700 dark:text-rose-400 mb-3">UK Life</h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">Discover personal stories, travel experiences, and insights into UK life.</p>
//                 <Link href="/uklife" className="inline-flex items-center text-rose-700 dark:text-rose-400 font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
//                   Start Exploring <span className="ml-1">→</span>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>

//           {/* Animated connection line between cards */}
//           <motion.div 
//             className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-green-400/30 via-amber-400/30 to-rose-400/30 rounded-full"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 1, delay: 0.8 }}
//           />

//           {/* Footer */}
//           <motion.footer 
//             className="mt-16 text-sm text-gray-500 dark:text-gray-400 text-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <p>Powered by Next.js, Notion, and Make.com</p>
//           </motion.footer>
//         </div>
//       </div>
//     </>
//   )
// }






'use client'

import Link from "next/link"
import { Button } from "../components/ui/button"
import Header from "../components/header"
import { motion } from "framer-motion"

const FloatingOrb = ({ color, size, position, duration }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-md ${color} ${size}`}
      initial={{ opacity: 0 }}
      animate={{
        x: [0, position.x],
        y: [0, position.y],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}

export default function HomePage() {
  // Orb configurations
  const orbs = [
    { color: "bg-green-300/20", size: "w-32 h-32", position: { x: 40, y: -30 }, duration: 25 },
    { color: "bg-rose-300/20", size: "w-40 h-40", position: { x: -50, y: 20 }, duration: 30 },
    { color: "bg-amber-300/20", size: "w-24 h-24", position: { x: 30, y: 40 }, duration: 20 },
  ]

  // Floating animation
  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      <Header />
      
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Background orbs */}
        {orbs.map((orb, index) => (
          <FloatingOrb key={index} {...orb} />
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iY3VycmVudENvbG9yIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>

        <div className="container mx-auto flex flex-col items-center justify-center pt-28 pb-16 px-4 relative z-10">
          {/* Animated title */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {/* <span className="text-rose-600 dark:text-rose-400">Welcome to </span>
              <span className="text-green-600 dark:text-green-400">yilungc</span> */}
              <span className="text-5xl font-bold text-center mb-4">YL </span>
              <span className="text-amber-800">英國生活＆閱讀筆記</span>
            </h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hi，我是YL。我在這裡分享我的生活隨筆和閱讀筆記。
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            
            {/* Book Reviews Card - Now with green color scheme */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              // className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-200 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div 
                  className="bg-gray-700 dark:bg-gray-900/20 p-4 rounded-full mb-6"
                  // className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full mb-6"
                  variants={floatVariants}
                  animate="float"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2M4 6h16M4 6v12M20 6v12M4 18h16" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-grey-700 dark:text-grey-400 mb-3">YL閱讀筆記</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Hi，我是YL，愛書人。分享書單以女性議題、台灣與轉型正義、親子教養、商業與創業、人生與理財、科學與科技、小說與自傳等幾大類為主。</p>
                <Link href="/book-reviews" className="inline-flex items-center text-grey-700 dark:text-grey-400 font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
                  Start Reading <span className="ml-1">→</span>
                </Link>
              </div>
            </motion.div>
            
            {/* UK Life Card - Now with rose color scheme */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-rose-200 dark:border-rose-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-100 dark:bg-rose-900/20 rounded-full opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div 
                  className="bg-rose-100 dark:bg-rose-900/20 p-4 rounded-full mb-6"
                  variants={floatVariants}
                  animate="float"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318C5.11 5.526 6.136 5 7.2 5c1.063 0 2.09.526 2.882 1.318L12 8.236l1.918-1.918C14.71 5.526 15.737 5 16.8 5c1.064 0 2.09.526 2.882 1.318A4.013 4.013 0 0121 9.2c0 1.063-.526 2.09-1.318 2.882L12 19.764l-7.682-7.682A4.013 4.013 0 013 9.2c0-1.063.526-2.09 1.318-2.882z" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-rose-700 dark:text-rose-400 mb-3">YL英國生活</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6"> Hi ，我是YL，旅英台灣人。和另一半定居倫敦、共同養育兩男寶中。我在這裡分享我的英倫育兒生活、英國教育和私校心得、親子旅遊、以及我的創業和居家生活。</p>
                <Link href="/uklife" className="inline-flex items-center text-rose-700 dark:text-rose-400 font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
                  Start Exploring <span className="ml-1">→</span>
                </Link>
              </div>
            </motion.div>
            
          </div>

          {/* Footer */}
          {/* <motion.footer 
            className="mt-20 text-sm text-gray-500 dark:text-gray-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>Powered by Next.js, Notion, and Make.com</p>
          </motion.footer> */}
        </div>
      </div>
    </>
  )
}
