// // app/uklife/categories/[slug]/page.jsx
// import PostCard from "@/components/post-card";
// import { notFound } from "next/navigation";

// export default async function CategoryPage({ params }) {
//   const { slug } = params;
  
//   // Fetch posts for this category
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/uklife?categoryId=${slug}`);
//   const { data, success } = await res.json();

//   if (!success || !data.posts.length) return notFound();

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">
//         Posts in: <span className="text-primary">{data.category}</span>
//       </h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {data.posts.map(post => (
//           <PostCard key={post.id} post={post} />
//         ))}
//       </div>

//       {data.posts.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-xl text-muted-foreground">
//             No posts found in this category yet.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }







// app/uklife/categories/[slug]/page.jsx
import { notFound } from "next/navigation";
import PostCard from "../../../components/post-card";

export default async function CategoryPage({ params }) {
  const { slug } = params;
  
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/uklife?categoryId=${slug}`,
      { next: { revalidate: 3600 } } // Optional: Cache for 1 hour
    );
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    
    const { data, success } = await res.json();

    if (!success || !data?.posts?.length) return notFound();

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Posts in: <span className="text-primary">{data.category}</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return notFound();
  }
}