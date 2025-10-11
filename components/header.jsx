
//這行是測試



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
              /*
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
              */

    // Add standalone categories
    const result = [
      {
        name: "親子育兒 Raising kids",
        slug: "親子育兒 Raising kids",
        subCategories: [
            {
                "name": "倫敦育兒 Raising kids in London",
                "slug": "倫敦育兒 Raising kids in London"
            },
            {
                "name": "英國私校 UK private education",
                "slug": "英國私校 UK private education"
            },
            {
                "name": "海外家庭 Oversea family",
                "slug": "海外家庭 Oversea family"
            },
            {
                "name": "母職 Being a Mother",
                "slug": "母職 Being a Mother"
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
              "slug": "英倫親子遊 Travel with kids in UK"
          },
          {
              "name": "海外親子遊 Travel with kids aboard",
              "slug": "海外親子遊 Travel with kids aboard"
          },
          {
              "name": "台灣親子遊 Travel with kids in Taiwan",
              "slug": "台灣親子遊 Travel with kids in Taiwan"
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
              "slug": "倫敦美食 London restaurants"
          },
          {
              "name": "倫敦總有新鮮事 London never gets boring",
              "slug": "倫敦總有新鮮事 London never gets boring"
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
              "slug": "在家創業 Homepreneur"
          },
          {
              "name": "感情生活 Love hacks",
              "slug": "感情生活 Love hacks"
          },
          {
              "name": "居家生活 Home style",
              "slug": "居家生活 Home style"
          }
        ]
        
      }
      
      // {
      //   name: "Personal thoughts",
      //   subCategories: groupedCategories["個人所思 Personal thoughts"]
      // }
    ]

    // console.log("Category Group: ", result);

   // return result.filter(cat => 
   // (cat.subCategories && cat.subCategories.length > 0) || cat.slug
              return result; // 直接返回您定義好的固定結構
   // )
  }

  const transformBookReviewsData = (data) => {
 //   if (!data?.categories?.readingNotes?.options) return []
    
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
         
            // 直接返回主分類，不生成子分類
  const finalCategories = Object.entries(categoryMappings).map(([key, mapping]) => {
    return {
      name: mapping.fullName,
      slug: mapping.slugName,
      // 完全移除 subCategories 屬性
       subCategories: undefined  // 不需要這行
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
          // 修改為直接使用 transformUKLifeData
          //setNavCategories(transformUKLifeData({})); // 傳入空對象，因為 transform函數不再依賴 data 參數
          
        
        } else if (isBookReviewsPage) {
          const response = await fetch('/api/categories/book-reviews?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
          const data = await response.json()
          if (data.success) {
            console.log("All Categories From Collections", data);
           setNavCategories(transformBookReviewsData(data.data))
          }
        //setNavCategories(transformBookReviewsData({})); // 傳入空對象
      
        } else {
          // For home page, fetch both
          const [ukLifeRes, bookReviewsRes] = await Promise.all([
            fetch('/api/categories/uklife?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8'),
            fetch('/api/categories/book-reviews?pageId=21e65d1f-6c1c-801b-9e7d-d48fe01b17c8')
            //fetch('/api/categories/uklife'), // <--- 這裡不需要 pageId 參數了
            //fetch('/api/categories/book-reviews') // <--- 這裡也不需要 pageId 參數了
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
              name: "About Me",
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
            {/* <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">YL</span>
              </div>
              <span className="font-serif text-xl font-bold text-foreground">yilungc</span>
            </Link> */}

            
            {/* <Link href="/uklife" className="flex items-center space-x-2 ms-3">
              <span className="font-serif text-sm text-foreground">UK Life</span>
            </Link>
            <Link href="/book-reviews" className="flex items-center space-x-2">
              <span className="font-serif text-sm text-foreground">Book Reviews</span>
            </Link> */}


            <Link href="/uklife" className="flex items-center space-x-2 me-3">
              <span className="font-serif text-sm text-foreground">YL英國生活</span>
            </Link>
            <Link href="/book-reviews" className="flex items-center space-x-2">
              <span className="font-serif text-sm text-foreground">閱讀筆記</span>
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
                                href={`${baseHref}category/${subCat.slug}`}
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
