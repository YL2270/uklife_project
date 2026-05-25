// components/header.jsx
// 大改：拿掉那 30+ 個沒用的 Notion API 呼叫
// 你原本的 header fetch `/api/categories/...`，等了 5-10 秒，
// 拿到資料後完全沒用（因為選單 transformUKLifeData 是寫死的）
// 現在直接用寫死的選單，header 從此瞬開

"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, XIcon, Search, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import SearchOverlay from "./search-overlay"

// 寫死的 UK Life 選單（從原 code 抽出來的 hardcoded categories）
const UKLIFE_NAV = [
  {
    name: "親子育兒 Raising kids",
    slug: "親子育兒 Raising kids",
    subCategories: [
      { name: "倫敦育兒 Raising kids in London", slug: "倫敦育兒 Raising kids in London" },
      { name: "英國私校 UK private education", slug: "英國私校 UK private education" },
      { name: "海外家庭 Oversea family", slug: "海外家庭 Oversea family" },
      { name: "母職 Being a Mother", slug: "母職 Being a Mother" },
    ],
  },
  {
    name: "親子旅遊 Travel with kids",
    slug: "親子旅遊 Travel with kids",
    subCategories: [
      { name: "英倫親子遊 Travel with kids in UK", slug: "英倫親子遊 Travel with kids in UK" },
      { name: "海外親子遊 Travel with kids aboard", slug: "海外親子遊 Travel with kids aboard" },
      { name: "台灣親子遊 Travel with kids in Taiwan", slug: "台灣親子遊 Travel with kids in Taiwan" },
    ],
  },
  {
    name: "英倫下午茶特輯 London afternoon tea",
    slug: "英倫下午茶特輯 London afternoon tea",
  },
  {
    name: "倫敦 London",
    slug: "倫敦 London",
    subCategories: [
      { name: "倫敦美食 London restaurants", slug: "倫敦美食 London restaurants" },
      { name: "倫敦總有新鮮事 London never gets boring", slug: "倫敦總有新鮮事 London never gets boring" },
    ],
  },
  {
    name: "個人所思 Personal thoughts",
    slug: "個人所思 Personal thoughts",
    subCategories: [
      { name: "在家創業 Homepreneur", slug: "在家創業 Homepreneur" },
      { name: "感情生活 Love hacks", slug: "感情生活 Love hacks" },
      { name: "居家生活 Home style", slug: "居家生活 Home style" },
    ],
  },
]

// 寫死的 Book Reviews 選單（若需要請自行擴充）
const BOOKREVIEWS_NAV = [
  { name: "女性議題 HerRead", slug: "女性議題 HerRead" },
  { name: "台灣與轉型正義 Taiwan and Transitional Justice", slug: "台灣與轉型正義 Taiwan and Transitional Justice" },
  { name: "親子教養 Parenting", slug: "親子教養 Parenting" },
  { name: "商業與創業 Business and Startups", slug: "商業與創業 Business and Startups" },
  { name: "人生與理財 Life and Finance", slug: "人生與理財 Life and Finance" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)
  const pathname = usePathname()
  const isUKLifePage = pathname.startsWith("/uklife")
  const isBookReviewsPage = pathname.startsWith("/book-reviews")

  const navCategories = isUKLifePage
    ? UKLIFE_NAV
    : isBookReviewsPage
    ? BOOKREVIEWS_NAV
    : []

  const baseHref = isUKLifePage ? "/uklife/" : "/book-reviews/"

  const toggleMobileMenu = (name) => {
    setOpenMobileMenu(openMobileMenu === name ? null : name)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">YL</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">yilungc</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/uklife" className="hover:text-primary transition-colors">
              英國生活
            </Link>
            <Link href="/book-reviews" className="hover:text-primary transition-colors">
              閱讀筆記
            </Link>

            {/* 分類選單 */}
            {navCategories.map((category) => {
              if (category.subCategories) {
                return (
                  <DropdownMenu key={category.name}>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                      {category.name.split(" ")[0]}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {category.subCategories.map((sub) => (
                        <DropdownMenuItem key={sub.slug} asChild>
                          <Link href={`${baseHref}categories/${encodeURIComponent(sub.slug)}`}>
                            {sub.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <Link
                  key={category.slug}
                  href={`${baseHref}categories/${encodeURIComponent(category.slug)}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name.split(" ")[0]}
                </Link>
              )
            })}

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-primary transition-colors"
              aria-label="搜尋"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2"
              aria-label="搜尋"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="選單"
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/uklife"
                className="block py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                英國生活
              </Link>
              <Link
                href="/book-reviews"
                className="block py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                閱讀筆記
              </Link>
              {navCategories.map((category) => (
                <div key={category.name}>
                  {category.subCategories ? (
                    <>
                      <button
                        onClick={() => toggleMobileMenu(category.name)}
                        className="w-full text-left py-2 flex items-center justify-between"
                      >
                        {category.name.split(" ")[0]}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openMobileMenu === category.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openMobileMenu === category.name && (
                        <div className="pl-4 space-y-1">
                          {category.subCategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`${baseHref}categories/${encodeURIComponent(sub.slug)}`}
                              className="block py-1 text-sm hover:text-primary"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`${baseHref}categories/${encodeURIComponent(category.slug)}`}
                      className="block py-2 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name.split(" ")[0]}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
