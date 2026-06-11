// components/header.jsx
// V3 改動：
// 1. 母分類改成「文字導頁 + ▼ 箭頭展開子選單」
// 2. 桌機：hover 展開子選單（CSS group-hover），點文字直接導頁
// 3. 手機：點文字導頁，點箭頭展開子選單
// 4. 個人所思新增「健康生活 Wellness」、「人生與自我 Self & Life」兩個子分類
// 5. 漢堡選單關閉時同步 reset openMenu
// V_logo 改動：Header logo 從「YL 方塊」換成 inline SVG（親子＋書），不需另外上傳圖片

"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, XIcon, Search, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import SearchOverlay from "./search-overlay"

// 有母分類的項目設 parentSlug（母分類總覽頁 slug）
// 沒有子選單的單一連結只設 slug（原有子分類 tag 全名）
const UKLIFE_NAV = [
  {
    name: "親子育兒 Raising kids",
    parentSlug: "raising-kids",
    subCategories: [
      { name: "倫敦育兒 Raising kids in London", slug: "倫敦育兒 Raising kids in London" },
      { name: "英國私校 UK private education", slug: "英國私校 UK private education" },
      { name: "海外家庭 Oversea family", slug: "海外家庭 Oversea family" },
      { name: "母職 Being a Mother", slug: "母職 Being a Mother" },
    ],
  },
  {
    name: "親子旅遊 Travel with kids",
    parentSlug: "travel-with-kids",
    subCategories: [
      { name: "英倫親子遊 Travel with kids in UK", slug: "英倫親子遊 Travel with kids in UK" },
      { name: "海外親子遊 Travel with kids abroad", slug: "海外親子遊 Travel with kids abroad" },
      { name: "台灣親子遊 Travel with kids in Taiwan", slug: "台灣親子遊 Travel with kids in Taiwan" },
      { name: "YL小旅行 YL's Getaways", slug: "YL小旅行 YL's Getaways" },
    ],
  },
  {
    name: "英倫下午茶特輯 London afternoon tea",
    slug: "英倫下午茶特輯 London afternoon tea",
    // 無子選單，單一連結
  },
  {
    name: "倫敦 London",
    parentSlug: "london",
    subCategories: [
      { name: "倫敦美食 London restaurants", slug: "倫敦美食 London restaurants" },
      { name: "倫敦總有新鮮事 London never gets boring", slug: "倫敦總有新鮮事 London never gets boring" },
    ],
  },
  {
    name: "個人所思 Personal thoughts",
    parentSlug: "personal-thoughts",
    subCategories: [
      { name: "在家創業 Homepreneur", slug: "在家創業 Homepreneur" },
      { name: "感情生活 Love hacks", slug: "感情生活 Love hacks" },
      { name: "居家生活 Home style", slug: "居家生活 Home style" },
      { name: "健康生活 Wellness", slug: "健康生活 Wellness" },
      { name: "人生與自我 Self & Life", slug: "人生與自我 Self & Life" },
    ],
  },
]

const BOOKREVIEWS_NAV = [
  { name: "女書 HerRead", slug: "女書 HerRead" },
  { name: "台灣與轉型正義 Taiwan and Transitional Justice", slug: "台灣與轉型正義 Taiwan and Transitional Justice" },
  { name: "親子教養 Parenting", slug: "親子教養 Parenting" },
  { name: "商業與創業 Business and start up", slug: "商業與創業 Business and start up" },
  { name: "人生與理財 Life and finance", slug: "人生與理財 Life and finance" },
  { name: "閱讀書單 Reading list", slug: "閱讀書單 Reading list" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // 追蹤哪個子選單是展開的（key = parentSlug）
  const pathname = usePathname()
  const isUKLifePage = pathname.startsWith("/uklife")
  const isBookReviewsPage = pathname.startsWith("/book-reviews")

  const navCategories = isUKLifePage
    ? UKLIFE_NAV
    : isBookReviewsPage
    ? BOOKREVIEWS_NAV
    : []

  const baseHref = isBookReviewsPage ? "/book-reviews/" : "/uklife/"

  const toggleMenu = (key) => {
    setOpenMenu(openMenu === key ? null : key)
  }

  // 關閉漢堡選單時同步 reset 子選單狀態
  const closeAll = () => {
    setIsMenuOpen(false)
    setOpenMenu(null)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-gray-200 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo（新版：inline SVG 親子＋書） */}
          <Link href="/" className="flex items-center space-x-2 text-gray-900 hover:text-amber-700 transition-colors">
            <svg viewBox="0 0 100 100" className="w-8 h-8" role="img" aria-label="yilungc 標誌">
              <rect x="4" y="4" width="92" height="92" rx="22" fill="#FBEFE6" />
              <g fill="#E07856">
                <circle cx="42" cy="32" r="10" />
                <path d="M30 64 Q30 44 42 44 Q54 44 54 64 Z" />
                <circle cx="62" cy="40" r="7.5" />
                <path d="M52 64 Q52 49 62 49 Q72 49 72 64 Z" />
              </g>
              <g fill="#2E8B83">
                <path d="M50 56 Q33 49 17 54 L17 84 Q33 79 50 86 Z" />
                <path d="M50 56 Q67 49 83 54 L83 84 Q67 79 50 86 Z" />
              </g>
            </svg>
            <span className="font-bold text-lg hidden sm:inline">yilungc</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-5">
            <Link href="/uklife" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">
              英國生活
            </Link>
            <Link href="/book-reviews" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">
              閱讀筆記
            </Link>

            {navCategories.map((category) => {

              // 有母分類 + 子選單：Link 導頁 + 箭頭展開
              if (category.subCategories && category.parentSlug) {
                return (
                  <div key={category.parentSlug} className="relative group">
                    <div className="flex items-center">
                      {/* 文字點擊直接導到母分類總覽頁 */}
                      <Link
                        href={`/uklife/categories/${category.parentSlug}`}
                        className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
                      >
                        {category.name.split(" ")[0]}
                      </Link>
                      {/* 桌機箭頭純視覺提示（pointer-events-none），手機靠 state toggle */}
                      <button
                        type="button"
                        onClick={() => toggleMenu(category.parentSlug)}
                        aria-label={`展開 ${category.name.split(" ")[0]} 子選單`}
                        aria-expanded={openMenu === category.parentSlug}
                        className="p-1 text-gray-500 hover:text-amber-700 transition-colors md:pointer-events-none"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 子選單：桌機 group-hover 自動展開，手機靠 openMenu state */}
                    <div className={`
                      absolute left-0 top-full pt-1 z-50 min-w-max
                      ${openMenu === category.parentSlug ? "block" : "hidden"}
                      md:group-hover:block
                    `}>
                      <ul className="bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                        {category.subCategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`${baseHref}categories/${encodeURIComponent(sub.slug)}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-colors whitespace-nowrap"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              }

              // 單一連結（英倫下午茶特輯，或書評子分類）
              return (
                <Link
                  key={category.slug}
                  href={`${baseHref}categories/${encodeURIComponent(category.slug)}`}
                  className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
                >
                  {category.name.split(" ")[0]}
                </Link>
              )
            })}

            <Link href="/about" className="text-gray-700 hover:text-amber-700 transition-colors font-medium">
              About
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-amber-700 transition-colors"
              aria-label="搜尋"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 text-gray-900">
            <button onClick={() => setIsSearchOpen(true)} className="p-2" aria-label="搜尋">
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
          <div className="md:hidden border-t border-gray-200 bg-white text-gray-900">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/uklife"
                className="block py-2 text-gray-700 hover:text-amber-700 font-medium"
                onClick={closeAll}
              >
                英國生活
              </Link>
              <Link
                href="/book-reviews"
                className="block py-2 text-gray-700 hover:text-amber-700 font-medium"
                onClick={closeAll}
              >
                閱讀筆記
              </Link>

              {navCategories.map((category) => (
                <div key={category.parentSlug || category.slug}>

                  {/* 有母分類 + 子選單 */}
                  {category.subCategories && category.parentSlug ? (
                    <>
                      <div className="flex items-center justify-between py-2">
                        {/* 文字點擊導到母分類總覽頁 */}
                        <Link
                          href={`/uklife/categories/${category.parentSlug}`}
                          className="text-gray-700 hover:text-amber-700 font-medium"
                          onClick={closeAll}
                        >
                          {category.name.split(" ")[0]}
                        </Link>
                        {/* 箭頭展開子選單 */}
                        <button
                          type="button"
                          onClick={() => toggleMenu(category.parentSlug)}
                          aria-label={`展開 ${category.name.split(" ")[0]} 子選單`}
                          className="p-1 text-gray-500 hover:text-amber-700"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openMenu === category.parentSlug ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      {openMenu === category.parentSlug && (
                        <div className="pl-4 space-y-1">
                          {category.subCategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`${baseHref}categories/${encodeURIComponent(sub.slug)}`}
                              className="block py-1 text-sm text-gray-600 hover:text-amber-700"
                              onClick={closeAll}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // 單一連結
                    <Link
                      href={`${baseHref}categories/${encodeURIComponent(category.slug)}`}
                      className="block py-2 text-gray-700 hover:text-amber-700 font-medium"
                      onClick={closeAll}
                    >
                      {category.name.split(" ")[0]}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-amber-700 font-medium"
                onClick={closeAll}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
