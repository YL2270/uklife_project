// // // // "use client"

// // // // import Link from "next/link"
// // // // import { useState, useEffect } from "react"
// // // // import { Menu, XIcon, Search } from "lucide-react"
// // // // import { usePathname } from "next/navigation"
// // // // import { generateSlug } from "../lib/utils" 
// // // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
// // // // import SearchOverlay from "./search-overlay"

// // // // export default function Header() {
// // // //   const [isMenuOpen, setIsMenuOpen] = useState(false)
// // // //   const [isSearchOpen, setIsSearchOpen] = useState(false) 
// // // //   const [navCategories, setNavCategories] = useState([])
// // // //   const [openDropdown, setOpenDropdown] = useState(null) 
// // // //   const pathname = usePathname()
// // // //   const isUKLifePage = pathname.startsWith("/uklife")
// // // //   const isBookReviewsPage = pathname.startsWith("/book-reviews")
// // // //   const isHomePage = pathname === "/"

// // // //   useEffect(() => {
// // // //     const fetchCategories = async () => {
// // // //       try {
// // // //         if (isUKLifePage) {
// // // //           // const response = await fetch('/api/categories/uklife?pageId=' + process.env.SEO_POSTS_PAGE);
// // // //           const pageId = "21e65d1f-6c1c-801b-9e7d-d48fe01b17c8";
// // // //           const response = await fetch(`/api/categories/uklife?pageId=${pageId}`);
          
// // // //           const data = await response.json();

// // // //           // console.log("Data: ", data);
          
// // // //           if (data.success) {
// // // //             // Transform API response to match your expected format
// // // //             const transformedCategories = [];
            
// // // //             // Handle "人生其他" (Life Other) categories
// // // //             const lifeOther = data.data.categories.lifeOther;
// // // //             if (lifeOther) {
// // // //               const mainCategories = {
// // // //                 "Personal Thoughts": [],
// // // //                 "Homepreneur": [],
// // // //                 "Raising Kids": []
// // // //               };
              
// // // //               lifeOther.options.forEach(option => {
// // // //                 const englishName = option.name.split(' ').pop(); // Get the English part
// // // //                 if (option.name.includes('個人所思')) {
// // // //                   mainCategories["Personal Thoughts"].push({
// // // //                     name: englishName,
// // // //                     slug: generateSlug(englishName)
// // // //                   });
// // // //                 } else if (option.name.includes('在家創業')) {
// // // //                   mainCategories["Homepreneur"].push({
// // // //                     name: englishName,
// // // //                     slug: generateSlug(englishName)
// // // //                   });
// // // //                 } else if (option.name.includes('親子育兒')) {
// // // //                   mainCategories["Raising Kids"].push({
// // // //                     name: englishName,
// // // //                     slug: generateSlug(englishName)
// // // //                   });
// // // //                 }
// // // //               });
              
// // // //               // Add to transformed categories only if they have subcategories
// // // //               Object.entries(mainCategories).forEach(([name, subCats]) => {
// // // //                 if (subCats.length > 0) {
// // // //                   transformedCategories.push({
// // // //                     name: name,
// // // //                     subCategories: subCats
// // // //                   });
// // // //                 }
// // // //               });
// // // //             }
            
// // // //             setNavCategories(transformedCategories);
// // // //           }
// // // //         } else if (isBookReviewsPage) {
// // // //           // You can keep your mock data for book reviews or implement similar API call
// // // //           const bookReviewHeaderCategories = [
// // // //             { name: "HerRead", slug: "herread" },
// // // //             // ... other book review categories
// // // //           ];
// // // //           setNavCategories(bookReviewHeaderCategories);
// // // //         } else {
// // // //           setNavCategories([]);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Failed to fetch categories:", error);
// // // //         // Fallback to empty array
// // // //         setNavCategories([]);
// // // //       }
// // // //     };
    
// // // //     fetchCategories();
// // // //   }, [pathname, isUKLifePage, isBookReviewsPage]);
  

// // // //   const baseHref = isUKLifePage ? "/uklife#" : "/book-reviews#"

// // // //   // console.log("Category: ", navCategories);


// // // //   return (
// // // //     <>
// // // //       <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex justify-between items-center h-16">
// // // //             {/* Logo */}
// // // //             <Link href="/" className="flex items-center space-x-2 group">
// // // //               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200">
// // // //                 <span className="text-primary-foreground font-bold text-sm">YL</span>
// // // //               </div>
// // // //               <span className="font-serif text-xl font-bold text-foreground">yilungc</span>
// // // //             </Link>

// // // //             {/* Desktop Navigation */}
// // // //             <nav className="hidden md:flex items-center space-x-8">
// // // //               {isHomePage ? (
// // // //                 <Link
// // // //                   href="/about"
// // // //                   className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// // // //                 >
// // // //                   <span className="font-medium">About Me</span>
// // // //                 </Link>
// // // //               ) : isBookReviewsPage ? (
// // // //                 navCategories.map((category) => (
// // // //                   <Link
// // // //                     key={category.slug}
// // // //                     href={`${baseHref}${category.slug}`}
// // // //                     className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// // // //                   >
// // // //                     <span className="font-medium">{category.name}</span>
// // // //                   </Link>
// // // //                 ))
// // // //               ) : (
// // // //                 // Modify your Header component's navigation rendering
// // // //                 navCategories.map((category) =>

// // // //                   category.subCategories && category.subCategories.length > 0 ? (
// // // //                     <DropdownMenu
// // // //                       key={category.name}
// // // //                       open={openDropdown === category.name}
// // // //                       onOpenChange={(isOpen) => setOpenDropdown(isOpen ? category.name : null)}
// // // //                     >
// // // //                       <DropdownMenuTrigger
// // // //                         asChild
// // // //                         onMouseEnter={() => setOpenDropdown(category.name)}
// // // //                         onMouseLeave={() => setOpenDropdown(null)}
// // // //                       >
// // // //                         <a 
// // // //                         href={`/uklife/${generateSlug(category.name)}`}
// // // //                         className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group font-medium">
// // // //                           {category.name}
// // // //                         </a>
// // // //                       </DropdownMenuTrigger>
// // // //                       {/* <DropdownMenuContent
// // // //                         className="w-48"
// // // //                         onMouseEnter={() => setOpenDropdown(category.name)}
// // // //                         onMouseLeave={() => setOpenDropdown(null)}
// // // //                       >
// // // //                         {category.subCategories.map((subCat) => (
// // // //                           // <DropdownMenuItem key={subCat.slug} asChild>
// // // //                           //   <Link 
// // // //                           //     href={`/categories/${subCat.slug}?id=${subCat.id}`} 
// // // //                           //     onClick={() => setIsMenuOpen(false)}
// // // //                           //   >
// // // //                           //     {subCat.name}
// // // //                           //   </Link>
// // // //                           // </DropdownMenuItem>

// // // //                           // In your Header component
// // // //                           <DropdownMenuItem key={subCat.slug} asChild>
// // // //                             <Link 
// // // //                               href={`/uklife/categories/${subCat.slug}`} // Changed from slug to id
// // // //                               onClick={() => setIsMenuOpen(false)}
// // // //                             >
// // // //                               {subCat.name}
// // // //                             </Link>
// // // //                           </DropdownMenuItem>

// // // //                         ))}
// // // //                       </DropdownMenuContent> */}
// // // //                     </DropdownMenu>
// // // //                   ) : (
// // // //                     <Link
// // // //                       key={category.name}
// // // //                       href={`/categories/${generateSlug(category.name)}?id=${option.id}`}
// // // //                       className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// // // //                     >
// // // //                       <span className="font-medium">{category.name}</span>
// // // //                     </Link>
// // // //                   )
// // // //                 )
// // // //               )}
// // // //               <button
// // // //                 onClick={() => setIsSearchOpen(true)}
// // // //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
// // // //                 aria-label="Search"
// // // //               >
// // // //                 <Search className="w-5 h-5 text-foreground" />
// // // //               </button>
// // // //             </nav>

// // // //             {/* Mobile Navigation */}
// // // //             <div className="flex items-center md:hidden">
// // // //               <button
// // // //                 onClick={() => setIsSearchOpen(true)}
// // // //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 mr-2"
// // // //                 aria-label="Search"
// // // //               >
// // // //                 <Search className="w-6 h-6" />
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
// // // //                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
// // // //               >
// // // //                 {isMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Mobile Menu Content */}
// // // //           {isMenuOpen && (
// // // //             <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200 max-h-[50vh] overflow-y-auto">
// // // //               <nav className="flex flex-col space-y-2">
// // // //                 {isHomePage ? (
// // // //                   <Link
// // // //                     href="/about"
// // // //                     onClick={() => setIsMenuOpen(false)}
// // // //                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// // // //                   >
// // // //                     <span className="font-medium">About Me</span>
// // // //                   </Link>
// // // //                 ) : isBookReviewsPage ? (
// // // //                   navCategories.map((category) => (
// // // //                     <Link
// // // //                       key={category.slug}
// // // //                       href={`${baseHref}${category.slug}`}
// // // //                       onClick={() => setIsMenuOpen(false)}
// // // //                       className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// // // //                     >
// // // //                       <span className="font-medium">{category.name}</span>
// // // //                     </Link>
// // // //                   ))
// // // //                 ) : (
// // // //                   navCategories.map((category) => (
// // // //                     <div key={category.name}>
// // // //                       <span className="block px-3 py-2 font-medium text-foreground">{category.name}</span>
// // // //                       {category.subCategories && category.subCategories.length > 0 ? (
// // // //                         <div className="pl-6 flex flex-col space-y-1">
// // // //                           {category.subCategories.map((subCat) => (
// // // //                             <Link
// // // //                               key={subCat.slug}
// // // //                               href={`${baseHref}${subCat.slug}`}
// // // //                               onClick={() => setIsMenuOpen(false)}
// // // //                               className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200 text-sm"
// // // //                             >
// // // //                               {subCat.name}
// // // //                             </Link>
// // // //                           ))}
// // // //                         </div>
// // // //                       ) : (
// // // //                         <Link
// // // //                           key={category.slug}
// // // //                           href={`${baseHref}${generateSlug(category.name)}`}
// // // //                           onClick={() => setIsMenuOpen(false)}
// // // //                           className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// // // //                         >
// // // //                           <span className="font-medium">{category.name}</span>
// // // //                         </Link>
// // // //                       )}
// // // //                     </div>
// // // //                   ))
// // // //                 )}
// // // //               </nav>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </header>
// // // //       <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
// // // //     </>
// // // //   )
// // // // }












// // // "use client"

// // // import Link from "next/link"
// // // import { useState, useEffect } from "react"
// // // import { Menu, XIcon, Search, Loader2 } from "lucide-react" // Added Loader2
// // // import { usePathname } from "next/navigation"
// // // import { generateSlug } from "../lib/utils"
// // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
// // // import SearchOverlay from "./search-overlay"

// // // export default function Header() {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false)
// // //   const [isSearchOpen, setIsSearchOpen] = useState(false)
// // //   const [navCategories, setNavCategories] = useState([])
// // //   const [openDropdown, setOpenDropdown] = useState(null)
// // //   const [isLoading, setIsLoading] = useState(false) // Added loading state
// // //   const pathname = usePathname()
// // //   const isUKLifePage = pathname.startsWith("/uklife")
// // //   const isBookReviewsPage = pathname.startsWith("/book-reviews")
// // //   const isHomePage = pathname === "/"

// // //   useEffect(() => {
// // //     const fetchCategories = async () => {
// // //       setIsLoading(true) // Start loading
// // //       try {
// // //         if (isUKLifePage) {
// // //           const pageId = "21e65d1f-6c1c-801b-9e7d-d48fe01b17c8";
// // //           const response = await fetch(`/api/categories/uklife?pageId=${pageId}`)
// // //           const data = await response.json()

// // //           if (data.success) {
// // //             const transformedCategories = []
            
// // //             const lifeOther = data.data.categories.lifeOther
// // //             if (lifeOther) {
// // //               const mainCategories = {
// // //                 "Personal Thoughts": [],
// // //                 "Homepreneur": [],
// // //                 "Raising Kids": []
// // //               }
              
// // //               lifeOther.options.forEach(option => {
// // //                 const englishName = option.name.split(' ').pop()
// // //                 if (option.name.includes('個人所思')) {
// // //                   mainCategories["Personal Thoughts"].push({
// // //                     name: englishName,
// // //                     slug: generateSlug(englishName)
// // //                   })
// // //                 } else if (option.name.includes('在家創業')) {
// // //                   mainCategories["Homepreneur"].push({
// // //                     name: englishName,
// // //                     slug: generateSlug(englishName)
// // //                   })
// // //                 } else if (option.name.includes('親子育兒')) {
// // //                   mainCategories["Raising Kids"].push({
// // //                     name: englishName,
// // //                     slug: generateSlug(englishName)
// // //                   })
// // //                 }
// // //               })
              
// // //               Object.entries(mainCategories).forEach(([name, subCats]) => {
// // //                 if (subCats.length > 0) {
// // //                   transformedCategories.push({
// // //                     name: name,
// // //                     subCategories: subCats
// // //                   })
// // //                 }
// // //               })
// // //             }
            
// // //             setNavCategories(transformedCategories)
// // //           }
// // //         } else if (isBookReviewsPage) {
// // //           // Mock data or API call for book reviews
// // //           const bookReviewHeaderCategories = [
// // //             { name: "HerRead", slug: "herread" },
// // //             // ... other book review categories
// // //           ]
// // //           setNavCategories(bookReviewHeaderCategories)
// // //         } else {
// // //           setNavCategories([])
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch categories:", error)
// // //         setNavCategories([])
// // //       } finally {
// // //         setIsLoading(false) // End loading
// // //       }
// // //     }
    
// // //     fetchCategories()
// // //   }, [pathname, isUKLifePage, isBookReviewsPage])

// // //   const baseHref = isUKLifePage ? "/uklife#" : "/book-reviews#"

// // //   return (
// // //     <>
// // //       <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center h-16">
// // //             {/* Logo */}
// // //             <Link href="/" className="flex items-center space-x-2 group">
// // //               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200">
// // //                 <span className="text-primary-foreground font-bold text-sm">YL</span>
// // //               </div>
// // //               <span className="font-serif text-xl font-bold text-foreground">yilungc</span>
// // //             </Link>

// // //             {/* Desktop Navigation */}
// // //             <nav className="hidden md:flex items-center space-x-8">
// // //               {isHomePage ? (
// // //                 <Link
// // //                   href="/about"
// // //                   className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// // //                 >
// // //                   <span className="font-medium">About Me</span>
// // //                 </Link>
// // //               ) : isLoading ? (
// // //                 // Loading state for desktop
// // //                 <div className="flex items-center space-x-4">
// // //                   {[...Array(3)].map((_, i) => (
// // //                     <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse"></div>
// // //                   ))}
// // //                 </div>
// // //               ) : isBookReviewsPage ? (
// // //                 navCategories.map((category) => (
// // //                   <Link
// // //                     key={category.slug}
// // //                     href={`${baseHref}${category.slug}`}
// // //                     className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// // //                   >
// // //                     <span className="font-medium">{category.name}</span>
// // //                   </Link>
// // //                 ))
// // //               ) : (
// // //                 navCategories.map((category) =>
// // //                   category.subCategories && category.subCategories.length > 0 ? (
// // //                     <DropdownMenu
// // //                       key={category.name}
// // //                       open={openDropdown === category.name}
// // //                       onOpenChange={(isOpen) => setOpenDropdown(isOpen ? category.name : null)}
// // //                     >
// // //                       <DropdownMenuTrigger
// // //                         asChild
// // //                         onMouseEnter={() => setOpenDropdown(category.name)}
// // //                         onMouseLeave={() => setOpenDropdown(null)}
// // //                       >
// // //                         <a 
// // //                           href={`/uklife/${generateSlug(category.name)}`}
// // //                           className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group font-medium"
// // //                         >
// // //                           {category.name}
// // //                         </a>
// // //                       </DropdownMenuTrigger>
// // //                     </DropdownMenu>
// // //                   ) : (
// // //                     <Link
// // //                       key={category.name}
// // //                       href={`/categories/${generateSlug(category.name)}?id=${option.id}`}
// // //                       className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// // //                     >
// // //                       <span className="font-medium">{category.name}</span>
// // //                     </Link>
// // //                   )
// // //                 )
// // //               )}
// // //               <button
// // //                 onClick={() => setIsSearchOpen(true)}
// // //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
// // //                 aria-label="Search"
// // //               >
// // //                 <Search className="w-5 h-5 text-foreground" />
// // //               </button>
// // //             </nav>

// // //             {/* Mobile Navigation */}
// // //             <div className="flex items-center md:hidden">
// // //               <button
// // //                 onClick={() => setIsSearchOpen(true)}
// // //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 mr-2"
// // //                 aria-label="Search"
// // //               >
// // //                 <Search className="w-6 h-6" />
// // //               </button>
// // //               <button
// // //                 onClick={() => setIsMenuOpen(!isMenuOpen)}
// // //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
// // //                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
// // //               >
// // //                 {isMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Mobile Menu Content */}
// // //           {isMenuOpen && (
// // //             <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200 max-h-[50vh] overflow-y-auto">
// // //               <nav className="flex flex-col space-y-2">
// // //                 {isHomePage ? (
// // //                   <Link
// // //                     href="/about"
// // //                     onClick={() => setIsMenuOpen(false)}
// // //                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// // //                   >
// // //                     <span className="font-medium">About Me</span>
// // //                   </Link>
// // //                 ) : isLoading ? (
// // //                   // Loading state for mobile
// // //                   <div className="space-y-2 px-3">
// // //                     {[...Array(4)].map((_, i) => (
// // //                       <div key={i} className="h-10 w-full bg-muted rounded animate-pulse"></div>
// // //                     ))}
// // //                   </div>
// // //                 ) : isBookReviewsPage ? (
// // //                   navCategories.map((category) => (
// // //                     <Link
// // //                       key={category.slug}
// // //                       href={`${baseHref}${category.slug}`}
// // //                       onClick={() => setIsMenuOpen(false)}
// // //                       className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// // //                     >
// // //                       <span className="font-medium">{category.name}</span>
// // //                     </Link>
// // //                   ))
// // //                 ) : (
// // //                   navCategories.map((category) => (
// // //                     <div key={category.name}>
// // //                       <span className="block px-3 py-2 font-medium text-foreground">{category.name}</span>
// // //                       {category.subCategories && category.subCategories.length > 0 ? (
// // //                         <div className="pl-6 flex flex-col space-y-1">
// // //                           {category.subCategories.map((subCat) => (
// // //                             <Link
// // //                               key={subCat.slug}
// // //                               href={`${baseHref}${subCat.slug}`}
// // //                               onClick={() => setIsMenuOpen(false)}
// // //                               className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200 text-sm"
// // //                             >
// // //                               {subCat.name}
// // //                             </Link>
// // //                           ))}
// // //                         </div>
// // //                       ) : null}
// // //                     </div>
// // //                   ))
// // //                 )}
// // //               </nav>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </header>
// // //       <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
// // //     </>
// // //   )
// // // }














// // "use client"

// // import Link from "next/link"
// // import { useState, useEffect } from "react"
// // import { Menu, XIcon, Search, Loader2 } from "lucide-react"
// // import { usePathname } from "next/navigation"
// // import { generateSlug } from "../lib/utils"
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
// // import SearchOverlay from "./search-overlay"

// // export default function Header() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false)
// //   const [isSearchOpen, setIsSearchOpen] = useState(false)
// //   const [navCategories, setNavCategories] = useState([])
// //   const [openDropdown, setOpenDropdown] = useState(null)
// //   const [isLoading, setIsLoading] = useState(false)
// //   const pathname = usePathname()
// //   const isUKLifePage = pathname.startsWith("/uklife")
// //   const isBookReviewsPage = pathname.startsWith("/book-reviews")
// //   const isHomePage = pathname === "/"

// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       setIsLoading(true)
// //       try {
// //         if (isUKLifePage) {
// //           const pageId = "21e65d1f-6c1c-801b-9e7d-d48fe01b17c8";
// //           const response = await fetch(`/api/categories/uklife?pageId=${pageId}`)
// //           const data = await response.json()

// //           if (data.success) {
// //             // For UK Life page, we want the lifeOther categories
// //             const categories = data.data.categories?.lifeOther?.options?.map(option => ({
// //               name: option.englishName || option.name.split(' ').pop(),
// //               slug: generateSlug(option.englishName || option.name.split(' ').pop())
// //             })) || []
            
// //             setNavCategories(categories)
// //           }
// //         } else if (isBookReviewsPage) {
// //           const pageId = "21e65d1f-6c1c-801b-9e7d-d48fe01b17c8";
// //           const response = await fetch(`/api/categories/book-reviews?pageId=${pageId}`)
// //           const data = await response.json()

// //           if (data.success) {
// //             // For Book Reviews page, we want the ukProperty categories
// //             const categories = data.data.categories?.ukProperty?.options?.map(option => ({
// //               name: option.englishName || option.name,
// //               slug: generateSlug(option.englishName || option.name)
// //             })) || []
            
// //             setNavCategories(categories)
// //           }
// //         } else {
// //           setNavCategories([])
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch categories:", error)
// //         setNavCategories([])
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }
    
// //     fetchCategories()
// //   }, [pathname, isUKLifePage, isBookReviewsPage])

// //   const baseHref = isUKLifePage ? "/uklife#" : "/book-reviews#"

// //   return (
// //     <>
// //       <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Logo */}
// //             <Link href="/" className="flex items-center space-x-2 group">
// //               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200">
// //                 <span className="text-primary-foreground font-bold text-sm">YL</span>
// //               </div>
// //               <span className="font-serif text-xl font-bold text-foreground">yilungc</span>
// //             </Link>

// //             {/* Desktop Navigation */}
// //             <nav className="hidden md:flex items-center space-x-8">
// //               {isHomePage ? (
// //                 <Link
// //                   href="/about"
// //                   className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// //                 >
// //                   <span className="font-medium">About Me</span>
// //                 </Link>
// //               ) : isLoading ? (
// //                 <div className="flex items-center space-x-4">
// //                   {[...Array(3)].map((_, i) => (
// //                     <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse"></div>
// //                   ))}
// //                 </div>
// //               ) : navCategories.length > 0 ? (
// //                 navCategories.map((category) => (
// //                   <Link
// //                     key={category.slug}
// //                     href={`${baseHref}${category.slug}`}
// //                     className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
// //                   >
// //                     <span className="font-medium">{category.name}</span>
// //                   </Link>
// //                 ))
// //               ) : (
// //                 <div className="text-muted-foreground">No categories found</div>
// //               )}
// //               <button
// //                 onClick={() => setIsSearchOpen(true)}
// //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
// //                 aria-label="Search"
// //               >
// //                 <Search className="w-5 h-5 text-foreground" />
// //               </button>
// //             </nav>

// //             {/* Mobile Navigation */}
// //             <div className="flex items-center md:hidden">
// //               <button
// //                 onClick={() => setIsSearchOpen(true)}
// //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 mr-2"
// //                 aria-label="Search"
// //               >
// //                 <Search className="w-6 h-6" />
// //               </button>
// //               <button
// //                 onClick={() => setIsMenuOpen(!isMenuOpen)}
// //                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
// //                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
// //               >
// //                 {isMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Mobile Menu Content */}
// //           {isMenuOpen && (
// //             <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200 max-h-[50vh] overflow-y-auto">
// //               <nav className="flex flex-col space-y-2">
// //                 {isHomePage ? (
// //                   <Link
// //                     href="/about"
// //                     onClick={() => setIsMenuOpen(false)}
// //                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// //                   >
// //                     <span className="font-medium">About Me</span>
// //                   </Link>
// //                 ) : isLoading ? (
// //                   <div className="space-y-2 px-3">
// //                     {[...Array(4)].map((_, i) => (
// //                       <div key={i} className="h-10 w-full bg-muted rounded animate-pulse"></div>
// //                     ))}
// //                   </div>
// //                 ) : navCategories.length > 0 ? (
// //                   navCategories.map((category) => (
// //                     <Link
// //                       key={category.slug}
// //                       href={`${baseHref}${category.slug}`}
// //                       onClick={() => setIsMenuOpen(false)}
// //                       className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
// //                     >
// //                       <span className="font-medium">{category.name}</span>
// //                     </Link>
// //                   ))
// //                 ) : (
// //                   <div className="px-3 py-2 text-muted-foreground">No categories found</div>
// //                 )}
// //               </nav>
// //             </div>
// //           )}
// //         </div>
// //       </header>
// //       <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
// //     </>
// //   )
// // }























// "use client"

// import Link from "next/link"
// import { useState, useEffect } from "react"
// import { Menu, XIcon, Search, ChevronDown, ChevronUp } from "lucide-react"
// import { usePathname } from "next/navigation"
// import { generateSlug } from "../lib/utils"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
// import SearchOverlay from "./search-overlay"

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [navCategories, setNavCategories] = useState([])
//   const [mainNavItems, setMainNavItems] = useState([])
//   const [openDropdown, setOpenDropdown] = useState(null)
//   const [openMobileMenu, setOpenMobileMenu] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const pathname = usePathname()
//   const isUKLifePage = pathname.startsWith("/uklife")
//   const isBookReviewsPage = pathname.startsWith("/book-reviews")
//   const isHomePage = pathname === "/"

//   const transformUKLifeData = (data) => {
//     if (!data?.categories?.lifeOther?.options) return []
    
//     // Group by Chinese category names
//     const groupedCategories = {
//       "親子育兒 Raising kids": [],
//       "親子旅遊 Travel with kids": [],
//       "倫敦 London": [],
//       "個人所思 Personal thoughts": []
//     }

//     data.categories.lifeOther.options.forEach(option => {
//       const chineseName = option.chineseName
//       const englishName = option.englishName
      
//       if (chineseName.includes('親子育兒')) {
//         groupedCategories["親子育兒 Raising kids"].push({
//           name: englishName,
//           slug: generateSlug(englishName)
//         })
//       } else if (chineseName.includes('親子旅遊')) {
//         groupedCategories["親子旅遊 Travel with kids"].push({
//           name: englishName,
//           slug: generateSlug(englishName)
//         })
//       } else if (chineseName.includes('倫敦')) {
//         groupedCategories["倫敦 London"].push({
//           name: englishName,
//           slug: generateSlug(englishName)
//         })
//       } else if (chineseName.includes('個人所思')) {
//         groupedCategories["個人所思 Personal thoughts"].push({
//           name: englishName,
//           slug: generateSlug(englishName)
//         })
//       }
//     })

//     // Add standalone categories
//     const result = [
//       {
//         name: "親子育兒 Raising kids",
//         subCategories: groupedCategories["親子育兒 Raising kids"]
//       },
//       {
//         name: "親子旅遊 Travel with kids",
//         subCategories: groupedCategories["親子旅遊 Travel with kids"]
//       },
//       {
//         name: "英倫下午茶特輯 London afternoon tea",
//         slug: "london-afternoon-tea"
//       },
//       {
//         name: "倫敦 London",
//         subCategories: groupedCategories["倫敦 London"]
//       },
//       {
//         name: "個人所思 Personal thoughts",
//         subCategories: groupedCategories["個人所思 Personal thoughts"]
//       }
//     ]

//     return result.filter(cat => 
//       (cat.subCategories && cat.subCategories.length > 0) || cat.slug
//     )
//   }

//   const transformBookReviewsData = (data) => {
//     if (!data?.categories?.ukProperty?.options) return []
    
//     return data.categories.ukProperty.options.map(option => ({
//       name: option.englishName || option.name,
//       slug: generateSlug(option.englishName || option.name)
//     }))
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         if (isUKLifePage) {
//           const response = await fetch('/api/categories/uklife?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
//           const data = await response.json()
//           if (data.success) {
//             setNavCategories(transformUKLifeData(data.data))
//           }
//         } else if (isBookReviewsPage) {
//           const response = await fetch('/api/categories/book-reviews?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
//           const data = await response.json()
//           if (data.success) {
//             setNavCategories(transformBookReviewsData(data.data))
//           }
//         } else {
//           // For home page, fetch both
//           const [ukLifeRes, bookReviewsRes] = await Promise.all([
//             fetch('/api/categories/uklife?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'),
//             fetch('/api/categories/book-reviews?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
//           ])
          
//           const ukLifeData = await ukLifeRes.json()
//           const bookReviewsData = await bookReviewsRes.json()
          
//           setMainNavItems([
//             {
//               name: "Life in UK",
//               subCategories: ukLifeData.success ? transformUKLifeData(ukLifeData.data) : []
//             },
//             {
//               name: "Book review",
//               subCategories: bookReviewsData.success ? transformBookReviewsData(bookReviewsData.data) : []
//             },
//             {
//               name: "About Us",
//               href: "/about"
//             }
//           ])
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [pathname, isUKLifePage, isBookReviewsPage])

//   const toggleMobileMenu = (name) => {
//     setOpenMobileMenu(openMobileMenu === name ? null : name)
//   }

//   const baseHref = isUKLifePage ? "/uklife#" : "/book-reviews#"

//   return (
//     <>
//       <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-2 group">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200">
//                 <span className="text-primary-foreground font-bold text-sm">YL</span>
//               </div>
//               <span className="font-serif text-xl font-bold text-foreground">yilungc</span>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               {isLoading ? (
//                 <div className="flex items-center space-x-4">
//                   {[...Array(3)].map((_, i) => (
//                     <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse"></div>
//                   ))}
//                 </div>
//               ) : isHomePage ? (
//                 <>
//                   {mainNavItems.map((item) =>
//                     item.subCategories ? (
//                       <DropdownMenu
//                         key={item.name}
//                         open={openDropdown === item.name}
//                         onOpenChange={(isOpen) => setOpenDropdown(isOpen ? item.name : null)}
//                       >
//                         <DropdownMenuTrigger
//                           asChild
//                           onMouseEnter={() => setOpenDropdown(item.name)}
//                           onMouseLeave={() => setOpenDropdown(null)}
//                         >
//                           <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group font-medium">
//                             {item.name}
//                             {openDropdown === item.name ? (
//                               <ChevronUp className="w-4 h-4" />
//                             ) : (
//                               <ChevronDown className="w-4 h-4" />
//                             )}
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent
//                           onMouseEnter={() => setOpenDropdown(item.name)}
//                           onMouseLeave={() => setOpenDropdown(null)}
//                           className="min-w-[250px]"
//                         >
//                           {item.subCategories.map((category) => (
//                             <div key={category.name || category.slug}>
//                               {category.subCategories ? (
//                                 <>
//                                   <DropdownMenuItem className="font-medium">
//                                     {category.name}
//                                   </DropdownMenuItem>
//                                   {category.subCategories.map((subCat) => (
//                                     <DropdownMenuItem key={subCat.slug} asChild>
//                                       <Link 
//                                         href={item.name === "Life in UK" ? 
//                                           `/uklife#${subCat.slug}` : 
//                                           `/book-reviews#${subCat.slug}`}
//                                         className="pl-6 w-full"
//                                       >
//                                         {subCat.name}
//                                       </Link>
//                                     </DropdownMenuItem>
//                                   ))}
//                                 </>
//                               ) : (
//                                 <DropdownMenuItem key={category.slug} asChild>
//                                   <Link 
//                                     href={item.name === "Life in UK" ? 
//                                       `/uklife#${category.slug}` : 
//                                       `/book-reviews#${category.slug}`}
//                                     className="w-full"
//                                   >
//                                     {category.name}
//                                   </Link>
//                                 </DropdownMenuItem>
//                               )}
//                             </div>
//                           ))}
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     ) : (
//                       <Link
//                         key={item.name}
//                         href={item.href}
//                         className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
//                       >
//                         <span className="font-medium">{item.name}</span>
//                       </Link>
//                     )
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {navCategories.map((category) => (
//                     <DropdownMenu
//                       key={category.name || category.slug}
//                       open={openDropdown === (category.name || category.slug)}
//                       onOpenChange={(isOpen) => setOpenDropdown(isOpen ? (category.name || category.slug) : null)}
//                     >
//                       <DropdownMenuTrigger
//                         asChild
//                         onMouseEnter={() => setOpenDropdown(category.name || category.slug)}
//                         onMouseLeave={() => setOpenDropdown(null)}
//                       >
//                         <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group font-medium">
//                           {category.name || category.slug}
//                           {category.subCategories && (
//                             openDropdown === (category.name || category.slug) ? (
//                               <ChevronUp className="w-4 h-4" />
//                             ) : (
//                               <ChevronDown className="w-4 h-4" />
//                             )
//                           )}
//                         </button>
//                       </DropdownMenuTrigger>
//                       {category.subCategories && (
//                         <DropdownMenuContent
//                           onMouseEnter={() => setOpenDropdown(category.name || category.slug)}
//                           onMouseLeave={() => setOpenDropdown(null)}
//                           className="min-w-[250px]"
//                         >
//                           {category.subCategories.map((subCat) => (
//                             <DropdownMenuItem key={subCat.slug} asChild>
//                               <Link 
//                                 href={`${baseHref}${subCat.slug}`}
//                                 className="w-full"
//                               >
//                                 {subCat.name}
//                               </Link>
//                             </DropdownMenuItem>
//                           ))}
//                         </DropdownMenuContent>
//                       )}
//                     </DropdownMenu>
//                   ))}
//                 </>
//               )}
//               <button
//                 onClick={() => setIsSearchOpen(true)}
//                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
//                 aria-label="Search"
//               >
//                 <Search className="w-5 h-5 text-foreground" />
//               </button>
//             </nav>

//             {/* Mobile Navigation */}
//             <div className="flex items-center md:hidden">
//               <button
//                 onClick={() => setIsSearchOpen(true)}
//                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 mr-2"
//                 aria-label="Search"
//               >
//                 <Search className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
//                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//               >
//                 {isMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Content */}
//           {isMenuOpen && (
//             <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
//               <nav className="flex flex-col space-y-2">
//                 {isLoading ? (
//                   <div className="space-y-2 px-3">
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="h-10 w-full bg-muted rounded animate-pulse"></div>
//                     ))}
//                   </div>
//                 ) : isHomePage ? (
//                   <>
//                     {mainNavItems.map((item) => (
//                       <div key={item.name}>
//                         {item.subCategories ? (
//                           <>
//                             <button
//                               onClick={() => toggleMobileMenu(item.name)}
//                               className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
//                             >
//                               {item.name}
//                               {openMobileMenu === item.name ? (
//                                 <ChevronUp className="w-5 h-5" />
//                               ) : (
//                                 <ChevronDown className="w-5 h-5" />
//                               )}
//                             </button>
//                             {openMobileMenu === item.name && (
//                               <div className="pl-4">
//                                 {item.subCategories.map((category) => (
//                                   <div key={category.name || category.slug}>
//                                     {category.subCategories ? (
//                                       <>
//                                         <button
//                                           onClick={() => toggleMobileMenu(category.name || category.slug)}
//                                           className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
//                                         >
//                                           {category.name}
//                                           {openMobileMenu === (category.name || category.slug) ? (
//                                             <ChevronUp className="w-4 h-4" />
//                                           ) : (
//                                             <ChevronDown className="w-4 h-4" />
//                                           )}
//                                         </button>
//                                         {openMobileMenu === (category.name || category.slug) && (
//                                           <div className="pl-4">
//                                             {category.subCategories.map((subCat) => (
//                                               <Link
//                                                 key={subCat.slug}
//                                                 href={item.name === "Life in UK" ? 
//                                                   `/uklife#${subCat.slug}` : 
//                                                   `/book-reviews#${subCat.slug}`}
//                                                 onClick={() => setIsMenuOpen(false)}
//                                                 className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200 text-sm"
//                                               >
//                                                 {subCat.name}
//                                               </Link>
//                                             ))}
//                                           </div>
//                                         )}
//                                       </>
//                                     ) : (
//                                       <Link
//                                         href={item.name === "Life in UK" ? 
//                                           `/uklife#${category.slug}` : 
//                                           `/book-reviews#${category.slug}`}
//                                         onClick={() => setIsMenuOpen(false)}
//                                         className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
//                                       >
//                                         {category.name}
//                                       </Link>
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <Link
//                             href={item.href}
//                             onClick={() => setIsMenuOpen(false)}
//                             className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
//                           >
//                             {item.name}
//                           </Link>
//                         )}
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <>
//                     {navCategories.map((category) => (
//                       <div key={category.name || category.slug}>
//                         {category.subCategories ? (
//                           <>
//                             <button
//                               onClick={() => toggleMobileMenu(category.name || category.slug)}
//                               className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
//                             >
//                               {category.name}
//                               {openMobileMenu === (category.name || category.slug) ? (
//                                 <ChevronUp className="w-5 h-5" />
//                               ) : (
//                                 <ChevronDown className="w-5 h-5" />
//                               )}
//                             </button>
//                             {openMobileMenu === (category.name || category.slug) && (
//                               <div className="pl-4">
//                                 {category.subCategories.map((subCat) => (
//                                   <Link
//                                     key={subCat.slug}
//                                     href={`${baseHref}${subCat.slug}`}
//                                     onClick={() => setIsMenuOpen(false)}
//                                     className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200"
//                                   >
//                                     {subCat.name}
//                                   </Link>
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <Link
//                             href={`${baseHref}${category.slug}`}
//                             onClick={() => setIsMenuOpen(false)}
//                             className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
//                           >
//                             {category.name}
//                           </Link>
//                         )}
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>
//       <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
//     </>
//   )
// }






// LAST WORKING CODE
"use client"

import Link from "next/link"
import slugify from "slugify";

import { useState, useEffect } from "react"
import { Menu, XIcon, Search, ChevronDown, ChevronUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { generateSlug } from "../lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import SearchOverlay from "./search-overlay"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [navCategories, setNavCategories] = useState([])
  const [mainNavItems, setMainNavItems] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const isUKLifePage = pathname.startsWith("/uklife")
  const isBookReviewsPage = pathname.startsWith("/book-reviews")
  const isHomePage = pathname === "/"

  const transformUKLifeData = (data) => {
    if (!data?.categories?.lifeOther?.options) return []
    
    // Group by Chinese category names
    const groupedCategories = {
      "親子育兒 Raising kids": [],
      "親子旅遊 Travel with kids": [],
      "倫敦 London": [],
      "個人所思 Personal thoughts": []
    }

    data.categories.lifeOther.options.forEach(option => {
      const chineseName = option.chineseName || option.name.split(' ')[0]
      const englishName = option.englishName || option.name.split(' ').pop()
      
      if (chineseName.includes('親子育兒')) {
        groupedCategories["親子育兒 Raising kids"].push({
          name: englishName,
          slug: generateSlug(englishName)
        })
      } else if (chineseName.includes('親子旅遊')) {
        groupedCategories["親子旅遊 Travel with kids"].push({
          name: englishName,
          slug: generateSlug(englishName)
        })
      } else if (chineseName.includes('倫敦')) {
        groupedCategories["倫敦 London"].push({
          name: englishName,
          slug: generateSlug(englishName)
        })
      } else if (chineseName.includes('個人所思')) {
        groupedCategories["個人所思 Personal thoughts"].push({
          name: englishName,
          slug: generateSlug(englishName)
        })
      }
    })

    // Add standalone categories
    const result = [
      {
        name: "親子育兒 Raising kids",
        slug: "親子育兒 Raising kids",
        subCategories: [
            {
                "name": "倫敦育兒 Raising kids in London",
                "slug": "rasing kids in london"
            },
            {
                "name": "英國私校 UK private education",
                "slug": "uk private education"
            },
            {
                "name": "海外家庭 Oversea family",
                "slug": "oversea family"
            },
            {
                "name": "母職 Being a Mother",
                "slug": "being a mother"
            }

        ]
      },
      {
        name: "親子旅遊 Travel with kids",
        slug: "親子旅遊 Travel with kids",
        subCategories: 
        [
          {
              "name": "英倫親子遊 Travel with kids in UK",
              "slug": "travel with kids in uk"
          },
          {
              "name": "海外親子遊 Travel with kids aboard",
              "slug": "travel with kids aboard"
          },
          {
              "name": "台灣親子遊 Travel with kids in Taiwan",
              "slug": "travel with kids in taiwan"
          }
        ]
      },
      {
        name: "英倫下午茶特輯 London afternoon tea",
        slug: "英倫下午茶特輯 London afternoon tea"
      },
      {
        name: "倫敦 London",
        slug: "倫敦 London",
        subCategories: 
        [
          {
              "name": "倫敦美食 London restaurants",
              "slug": "london restaurants"
          },
          {
              "name": "倫敦總有新鮮事 London never gets boring",
              "slug": "london never gets boring"
          }
        ]
        
      },
      {
        name: "個人所思 Personal thoughts",
        slug: "個人所思 Personal thoughts",
        subCategories: 
        [
          {
              "name": "在家創業 Homepreneur",
              "slug": "homepreneur"
          },
          {
              "name": "感情生活 Love hacks",
              "slug": "love hacks"
          },
          {
              "name": "居家生活 Home style",
              "slug": "home style"
          }
        ]
        
      }
      
      // {
      //   name: "Personal thoughts",
      //   subCategories: groupedCategories["個人所思 Personal thoughts"]
      // }
    ]

    // console.log("Category Group: ", result);

    return result.filter(cat => 
      (cat.subCategories && cat.subCategories.length > 0) || cat.slug
    )
  }

  const transformBookReviewsData = (data) => {
    if (!data?.categories?.ukProperty?.options) return []
    
    // // // Group book reviews into categories and subcategories
    // // const groupedCategories = {
    // //   "HerRead": [],
    // //   "Taiwan and Transitional Justice": [],
    // //   "Parenting": [],
    // //   "Business and start up": [],
    // //   "Life and finance": [],
    // //   "Science and Tech": [],
    // //   "Novel and bio": [],
    // //   "Reading list": []
    // // }
    
    // // const groupedCategories = {
    // //   "HerRead": [],
    // //   "Taiwan and Transitional Justice": [],
    // //   "Parenting": [],
    // //   "Business and start up": [],
    // //   "Life and finance": [],
    // //   "Science and Tech": [],
    // //   "Novel and bio": [],
    // //   "Readling list": []
    // // }
    
    
    // const groupedCategories = {
    //   "HerRead": [],
    //   "Taiwan Justice": [],
    //   "Parenting": [],
    //   "Business": [],
    //   "Finance": [],
    //   "Science & Tech": [],
    //   "Fiction": [],
    //   "Booklist": []
    // }

    // data.categories.ukProperty.options.forEach(option => {
    //   const englishName = option.englishName || option.name
    //   const slug = generateSlug(englishName)

    //   // // Map each option to its appropriate category
    //   // if (englishName.includes('HerRead') || englishName.includes('女書')) {
    //   //   groupedCategories["女書 HerRead"].push({ name: "englishName", slug })
    //   // } else if (englishName.includes('Taiwan') || englishName.includes('台灣')) {
    //   //   groupedCategories["台灣與轉型正義 Taiwan and Transitional Justice"].push({ name: englishName, slug })
    //   // } else if (englishName.includes('Parenting') || englishName.includes('親子')) {
    //   //   groupedCategories["親子教養 Parenting"].push({ name: englishName, slug })
    //   // } else if (englishName.includes('Business') || englishName.includes('商業')) {
    //   //   groupedCategories["商業與創業 Business and start up"].push({ name: englishName, slug })
    //   // } else if (englishName.includes('Life') || englishName.includes('人生')) {
    //   //   groupedCategories["人生與理財 Life and finance"].push({ name: englishName, slug })
    //   // } else if (englishName.includes('Science') || englishName.includes('科學')) {
    //   //   groupedCategories["科學與科技 Science and Tech"].push({ name: englishName, slug })
    //   // } else if (englishName.includes('Novel') || englishName.includes('小說')) {
    //   //   groupedCategories["小說與自傳 Novel and bio"].push({ name: englishName, slug })
    //   // } else if (englishName.includes('Reading') || englishName.includes('閱讀')) {
    //   //   groupedCategories["閱讀書單 Reading list"].push({ name: englishName, slug })
    //   // }

    //   // Map each option to its appropriate category
    //   if (englishName.includes('HerRead') || englishName.includes('女書')) {
    //     groupedCategories["女書 HerRead"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Taiwan') || englishName.includes('台灣')) {
    //     groupedCategories["台灣與轉型正義 Taiwan and Transitional Justice"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Parenting') || englishName.includes('親子')) {
    //     groupedCategories["親子教養 Parenting"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Business') || englishName.includes('商業')) {
    //     groupedCategories["商業與創業 Business and start up"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Finance') || englishName.includes('人生')) {
    //     groupedCategories["人生與理財 Life and finance"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Science') || englishName.includes('科學')) {
    //     groupedCategories["科學與科技 Science and Tech"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Fiction') || englishName.includes('小說')) {
    //     groupedCategories["小說與自傳 Novel and bio"].push({ name: englishName, slug })
    //   } else if (englishName.includes('Booklist') || englishName.includes('閱讀')) {
    //     groupedCategories["閱讀書單 Reading list"].push({ name: englishName, slug })
    //   }
    // })

    // // Convert to array format
    // return Object.entries(groupedCategories).map(([name, subCategories]) => ({
    //   name,
    //   subCategories: subCategories.length > 0 ? subCategories : undefined,
    //   slug: subCategories.length === 0 ? generateSlug(name) : undefined
    // }))



    // const categoryMappings = {
    //   "HerRead": { fullName: "女書 HerRead", slugName: "女書 HerRead" },
    //   "Taiwan and <br />Transitional Justice": { fullName: "台灣與轉型正義 Taiwan and Transitional Justice", slugName: "台灣與轉型正義 Taiwan and Transitional Justice" },
    //   "Parenting": { fullName: "親子教養 Parenting", slugName: "親子教養 Parenting" },
    //   "Business and <br />start up": { fullName: "商業與創業 Business and start up", slugName: "商業與創業 Business and start up" },
    //   "Life and <br />finance": { fullName: "人生與理財 Life and finance", slugName: "life and finance人生與理財 Life and finance" },
    //   "Science <br />and Tech": { fullName: "科學與科技 Science and Tech", slugName: "科學與科技 Science and Tech" },
    //   "Novel <br />and bio": { fullName: "小說與自傳 Novel and bio", slugName: "小說與自傳 Novel and bio" },
    //   "Reading <br />list": { fullName: "閱讀書單 Reading list", slugName: "閱讀書單 Reading list" }
    // };

    // const groupedCategories = {
    //   "HerRead": [],
    //   "Taiwan and <br />Transitional Justice": [],
    //   "Parenting": [],
    //   "Business and <br />start up": [],
    //   "Life and <br />finance": [],
    //   "Science <br />and Tech": [],
    //   "Novel <br />and bio": [],
    //   "Reading <br />list": []
    // };
    
    
    
    // const categoryMappings = {
    //   "女書 <br />HerRead": { fullName: "女書 HerRead", slugName: "女書 HerRead" },
    //   "台灣與轉型正義 <br />Taiwan and <br />Transitional Justice": { fullName: "台灣與轉型正義 Taiwan and Transitional Justice", slugName: "台灣與轉型正義 Taiwan and Transitional Justice" },
    //   "親子教養 <br />Parenting": { fullName: "親子教養 Parenting", slugName: "親子教養 Parenting" },
    //   "商業與創業 <br />Business and <br />start up": { fullName: "商業與創業 Business and start up", slugName: "商業與創業 Business and start up" },
    //   "人生與理財 <br />Life and <br />finance": { fullName: "人生與理財 Life and finance", slugName: "life and finance人生與理財 Life and finance" },
    //   "科學與科技 <br />Science <br />and Tech": { fullName: "科學與科技 Science and Tech", slugName: "科學與科技 Science and Tech" },
    //   "小說與自傳 <br />Novel <br />and bio": { fullName: "小說與自傳 Novel and bio", slugName: "小說與自傳 Novel and bio" },
    //   "閱讀書單  <br />Reading <br />list": { fullName: "閱讀書單 Reading list", slugName: "閱讀書單 Reading list" }
    // };

    // const groupedCategories = {
    //   "女書 <br />HerRead": [],
    //   "台灣與轉型正義 <br />Taiwan and <br />Transitional Justice": [],
    //   "親子教養 <br />Parenting": [],
    //   "商業與創業 <br />Business and <br />start up": [],
    //   "人生與理財 <br />Life and <br />finance": [],
    //   "科學與科技 <br />Science <br />and Tech": [],
    //   "科學與科技 <br />Novel <br />and bio": [],
    //   "閱讀書單  <br />Reading <br />list": []
    // };

    // data.categories.ukProperty.options.forEach(option => {
    //   const englishName = option.englishName || option.name;
    //   const slug = generateSlug(englishName.replace(/[\u4e00-\u9fa5]/g, '').trim()); // Remove Chinese characters before generating slug

    //   // Map each option to its appropriate category
    //   if (englishName.includes('HerRead') || englishName.includes('女書')) {
    //     groupedCategories["HerRead"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Taiwan') || englishName.includes('台灣')) {
    //     groupedCategories["Taiwan Justice"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Parenting') || englishName.includes('親子')) {
    //     groupedCategories["Parenting"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Business') || englishName.includes('商業')) {
    //     groupedCategories["Business"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Finance') || englishName.includes('人生') || englishName.includes('理財')) {
    //     groupedCategories["Finance"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Science') || englishName.includes('科學') || englishName.includes('Tech') || englishName.includes('科技')) {
    //     groupedCategories["Science & Tech"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Fiction') || englishName.includes('小說') || englishName.includes('Novel') || englishName.includes('自傳')) {
    //     groupedCategories["Fiction"].push({ name: englishName, slug });
    //   } else if (englishName.includes('Booklist') || englishName.includes('閱讀') || englishName.includes('書單')) {
    //     groupedCategories["Booklist"].push({ name: englishName, slug });
    //   }
    // });

    // // Convert to array format
    // return Object.entries(groupedCategories).map(([shortName, subCategories]) => {
    //   const mapping = categoryMappings[shortName];
    //   return {
    //     name: shortName, // Use the short name for display
    //     fullName: mapping.fullName, // Include the full name if needed
    //     subCategories: subCategories.length > 0 ? subCategories : undefined,
    //     slug: subCategories.length === 0 ? mapping.slugName : undefined
    //   };
    // });





    const categoryMappings = {
      HerRead: {
        fullName: "女書 <br />HerRead",
        slugName: "女書 HerRead"
      },
      TaiwanJustice: {
        fullName: "台灣與轉型正義 <br />Taiwan and <br />Transitional Justice",
        slugName: "台灣與轉型正義 Taiwan and Transitional Justice"
      },
      Parenting: {
        fullName: "親子教養 <br />Parenting",
        slugName: "親子教養 Parenting"
      },
      Business: {
        fullName: "商業與創業 <br />Business and <br />start up",
        slugName: "商業與創業 Business and start up"
      },
      Finance: {
        fullName: "人生與理財 <br />Life and <br />finance",
        slugName: "人生與理財 Life and finance"
      },
      ScienceTech: {
        fullName: "科學與科技 <br />Science <br />and Tech",
        slugName: "科學與科技 Science and Tech"
      },
      Fiction: {
        fullName: "小說與自傳 <br />Novel <br />and bio",
        slugName: "小說與自傳 Novel and bio"
      },
      Booklist: {
        fullName: "閱讀書單  <br />Reading <br />list",
        slugName: "閱讀書單 Reading list"
      }
    };

    // Initialize empty buckets for grouping
    const groupedCategories = {
      HerRead: [],
      TaiwanJustice: [],
      Parenting: [],
      Business: [],
      Finance: [],
      ScienceTech: [],
      Fiction: [],
      Booklist: []
    };

    data.categories.ukProperty.options.forEach(option => {
      const englishName = option.englishName || option.name;
      const slug = generateSlug(englishName.replace(/[\u4e00-\u9fa5]/g, '').trim());

      // Assign to correct category
      if (englishName.includes('HerRead') || englishName.includes('女書')) {
        groupedCategories.HerRead.push({ name: englishName, slug });
      } else if (englishName.includes('Taiwan') || englishName.includes('台灣')) {
        groupedCategories.TaiwanJustice.push({ name: englishName, slug });
      } else if (englishName.includes('Parenting') || englishName.includes('親子')) {
        groupedCategories.Parenting.push({ name: englishName, slug });
      } else if (englishName.includes('Business') || englishName.includes('商業')) {
        groupedCategories.Business.push({ name: englishName, slug });
      } else if (englishName.includes('Finance') || englishName.includes('人生') || englishName.includes('理財')) {
        groupedCategories.Finance.push({ name: englishName, slug });
      } else if (englishName.includes('Science') || englishName.includes('科學') || englishName.includes('Tech') || englishName.includes('科技')) {
        groupedCategories.ScienceTech.push({ name: englishName, slug });
      } else if (englishName.includes('Fiction') || englishName.includes('小說') || englishName.includes('Novel') || englishName.includes('自傳')) {
        groupedCategories.Fiction.push({ name: englishName, slug });
      } else if (englishName.includes('Booklist') || englishName.includes('閱讀') || englishName.includes('書單')) {
        groupedCategories.Booklist.push({ name: englishName, slug });
      }
    });

    // Format output
    const finalCategories = Object.entries(groupedCategories).map(([key, subCategories]) => {
      const mapping = categoryMappings[key];
      return {
        // name: key,
        name: mapping.fullName,
        fullName: mapping.fullName,
        subCategories: subCategories.length > 0 ? subCategories : undefined,
        slug: subCategories.length === 0 ? mapping.slugName : undefined
      };
    });

    return finalCategories;



  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (isUKLifePage) {
          const response = await fetch('/api/categories/uklife?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
          const data = await response.json()
          if (data.success) {
            console.log("All Categories From Collections", data);
            setNavCategories(transformUKLifeData(data.data))
          }
        } else if (isBookReviewsPage) {
          const response = await fetch('/api/categories/book-reviews?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
          const data = await response.json()
          if (data.success) {
            console.log("All Categories From Collections", data);
            setNavCategories(transformBookReviewsData(data.data))
          }
        } else {
          // For home page, fetch both
          const [ukLifeRes, bookReviewsRes] = await Promise.all([
            fetch('/api/categories/uklife?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'),
            fetch('/api/categories/book-reviews?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
          ])
          
          const ukLifeData = await ukLifeRes.json()
          const bookReviewsData = await bookReviewsRes.json()
          
          setMainNavItems([
            // {
            //   name: "Life in UK",
            //   subCategories: ukLifeData.success ? transformUKLifeData(ukLifeData.data) : []
            // },
            // {
            //   name: "Book review",
            //   subCategories: bookReviewsData.success ? transformBookReviewsData(bookReviewsData.data) : []
            // },
            {
              name: "About Us",
              href: "/about"
            }
          ])
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [pathname, isUKLifePage, isBookReviewsPage])

  const toggleMobileMenu = (name) => {
    setOpenMobileMenu(openMobileMenu === name ? null : name)
  }

  const baseHref = isUKLifePage ? "/uklife/" : "/book-reviews/"

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">YL</span>
              </div>
              <span className="font-serif text-xl font-bold text-foreground">yilungc</span>
            </Link>

            
            <Link href="/uklife" className="flex items-center space-x-2 ms-3">
              <span className="font-serif text-sm text-foreground">UK Life</span>
            </Link>
            <Link href="/book-reviews" className="flex items-center space-x-2">
              <span className="font-serif text-sm text-foreground">Book Reviews</span>
            </Link>



            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm">
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              ) : isHomePage ? (
                <>
                  {mainNavItems.map((item) =>
                    item.subCategories ? (
                      <DropdownMenu
                        key={item.name}
                        open={openDropdown === item.name}
                        onOpenChange={(isOpen) => setOpenDropdown(isOpen ? item.name : null)}
                      >
                        <DropdownMenuTrigger
                          asChild
                          onMouseEnter={() => setOpenDropdown(item.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group font-medium">
                            {item.name}
                            {openDropdown === item.name ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          onMouseEnter={() => setOpenDropdown(item.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="min-w-[250px]"
                        >
                          {item.subCategories.map((category) => (
                            <div key={category.name || category.slug}>
                              {category.subCategories ? (
                                <>
                                  <DropdownMenuItem className="font-medium">
                                    {category.name}
                                  </DropdownMenuItem>
                                  {category.subCategories.map((subCat) => (
                                    <DropdownMenuItem key={subCat.slug} asChild>
                                      <Link 
                                        href={item.name === "Life in UK" ? 
                                          `/uklife/category/${subCat.name}` : 
                                          `/book-reviews/category/${subCat.slug.replace(/<br\s*\/?>/gi, "")}`}
                                        className="pl-6 w-full"
                                      >
                                        {subCat.name.replace(/<br\s*\/?>/gi, "")}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </>
                              ) : (
                                <DropdownMenuItem key={category.slug} asChild>
                                  <Link 
                                    href={item.name === "Life in UK" ? 
                                      `/uklife/category/${category.name}` : 
                                      `/book-reviews/category/${category.slug.replace(/<br\s*\/?>/gi, "")}`}
                                    className="w-full"
                                  >
                                    {category.name.replace(/<br\s*\/?>/gi, "")}
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </div>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <>
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                      </>
                    )
                  )}
                </>
              ) : (
                <>
                  {navCategories.map((category) => (
                    <>
                    <DropdownMenu
                      key={category.name || category.slug}
                      open={openDropdown === (category.name || category.slug)}
                      onOpenChange={(isOpen) => setOpenDropdown(isOpen ? (category.name || category.slug) : null)}
                    >
                      <DropdownMenuTrigger
                        asChild
                        onMouseEnter={() => setOpenDropdown(category.name || category.slug)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                      {/* THIS IS HERE THE MENU FOR THE BOOK REVIEW */}
                      <a 
                        className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group font-medium"
                        href={`${baseHref}category/${category.slug}`}  // Assuming category has a slug property
                      >
                        <span dangerouslySetInnerHTML={{ __html: category.name }} className="text-center" />
                        {/* {category.name} */}
                        {/* {dangerouslySetInnerHTML={ __html: category.name }} */}
                        {/* {category.name} */}

                          {/* {category.name || category.slug}
                          {category.subCategories && (
                            openDropdown === (category.name || category.slug) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )
                          )} */}
                        </a>
                      </DropdownMenuTrigger>
                      {category.subCategories && (
                        <DropdownMenuContent
                          onMouseEnter={() => setOpenDropdown(category.name || category.slug)}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="min-w-[250px]"
                        >
                          {category.subCategories.map((subCat) => (
                            <DropdownMenuItem key={subCat.slug} asChild>
                              <Link 
                                href={`${baseHref}category/${subCat.name}`}
                                className="w-full"
                              >
                                {subCat.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                    </>
                  ))}
                </>
              )}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>
            </nav>

            {/* Mobile Navigation */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 mr-2"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
              <nav className="flex flex-col space-y-2">
                {isLoading ? (
                  <div className="space-y-2 px-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-10 w-full bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : isHomePage ? (
                  <>
                    {mainNavItems.map((item) => (
                      <div key={item.slug}>
                        {item.subCategories ? (
                          <>
                            <button
                              onClick={() => toggleMobileMenu(item.slug)}
                              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                            >
                              <span dangerouslySetInnerHTML={{ __html: item.name }} />                              
                              {/* {item.name} */}

                              {openMobileMenu === item.name ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                            {openMobileMenu === item.name && (
                              <div className="pl-4">
                                {item.subCategories.map((category) => (
                                  <div key={category.name || category.name}>
                                    {category.subCategories ? (
                                      <>
                                        <button
                                          onClick={() => toggleMobileMenu(category.name || category.name)}
                                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
                                        >
                                          <span dangerouslySetInnerHTML={{ __html: category.name }} />
                                          {/* {category.name} */}
                                          {openMobileMenu === (category.name || category.name) ? (
                                            <ChevronUp className="w-4 h-4" />
                                          ) : (
                                            <ChevronDown className="w-4 h-4" />
                                          )}
                                        </button>
                                        {openMobileMenu === (category.name || category.name) && (
                                          <div className="pl-4">
                                            {category.subCategories.map((subCat) => (
                                              <Link
                                                key={subCat.slug}
                                                href={item.name === "Life in UK" ? 
                                                  `/uklife/category/${subCat.name}` : 
                                                  `/book-reviews/category/${subCat.slug}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200 text-sm"
                                              >
                                                <span dangerouslySetInnerHTML={{ __html: subCat.name }} />                              
                                                {/* {item.name} */}
                                                {/* {subCat.name.replace(/<br\s*\/?>/gi, "")} */}
                                              </Link>
                                            ))}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <Link
                                        href={item.name === "Life in UK" ? 
                                          `/uklife/category/${category.name}` : 
                                          `/book-reviews/category/${category.slug}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200"
                                      >
                                        {/* {category.name.replace(/<br\s*\/?>/gi, "")} */}
                                        <span dangerouslySetInnerHTML={{ __html: category.name }} />
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                          >
                            {item.slug}
                          </Link>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {navCategories.map((category) => (
                      <div key={category.name || category.slug}>
                        {category.subCategories ? (
                          <>
                            <button
                              onClick={() => toggleMobileMenu(category.slug || category.slug)}
                              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                            >
                              <span dangerouslySetInnerHTML={{ __html: category.name }} />
                              {/* {category.name} */}
                              {openMobileMenu === (category.name || category.name) ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                            {openMobileMenu === (category.name || category.slug) && (
                              <div className="pl-4">
                                {category.subCategories.map((subCat) => (
                                  <Link
                                    key={subCat.slug}
                                    href={`${baseHref}category/${subCat.name}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200"
                                  >
                                    <span dangerouslySetInnerHTML={{ __html: subCat.name }} />
                                    {/* {subCat.name} */}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={`${baseHref}category/${category.slug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                          >
                            <span dangerouslySetInnerHTML={{ __html: category.name }} />
                            {/* {category.name} */}
                          </Link>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
// LAST WORKING CODE