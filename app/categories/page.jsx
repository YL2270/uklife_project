// app/categories/page.jsx
import { Notion } from "../../lib/notion";

export default async function CategoriesPage() {
  // const categories = await Notion.getDatabaseCategories(
  //   process.env.SEO_POSTS_PAGE,
  //   'Category' // Change this to match your Notion property name
  // );

  // return (
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-2xl font-bold mb-4">
  //       Categories in {process.env.DATABASE_COLLECTION_NAME}
  //     </h1>
      
  //     {categories.length > 0 ? (
  //       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
  //         {categories.map((category) => (
  //           <li 
  //             key={category} 
  //             className="p-3 border rounded-lg hover:bg-gray-50"
  //           >
  //             {category}
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p className="text-gray-500">No categories found</p>
  //     )}
  //   </div>
  // );
}