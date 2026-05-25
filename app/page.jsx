// app/page.jsx
// 首頁——根據之前 yilungc.com 抓的內容重建

import Link from "next/link"
import Image from "next/image"
import Header from "../components/header"
import Footer from "../components/footer"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "YL 英國生活＆閱讀筆記",
  description:
    "Hi，我是 YL。在這裡分享我的英倫育兒、英國生活、親子旅遊與閱讀筆記。",
  openGraph: {
    title: "YL 英國生活＆閱讀筆記",
    description:
      "Hi，我是 YL。在這裡分享我的英倫育兒、英國生活、親子旅遊與閱讀筆記。",
    url: "https://yilungc.com",
    images: ["/images/uk_life_header_image.JPG"],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              YL 英國生活＆閱讀筆記
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Hi，我是 YL。我在這裡分享我的生活隨筆和閱讀筆記。
            </p>
          </div>
        </section>

        {/* Two sections */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UK Life */}
              <Link href="/uklife" className="group">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <Image
                    src="/images/uk_life_header_image.JPG"
                    alt="YL 英國生活"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-3xl font-serif font-bold mb-3">
                      YL 英國生活
                    </h2>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      旅英台灣人，定居倫敦、共同養育兩男寶。分享英倫育兒、英國教育、私校心得、親子旅遊與創業生活。
                    </p>
                    <span className="inline-flex items-center font-medium group-hover:translate-x-2 transition-transform">
                      Start Exploring <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Book Reviews */}
              <Link href="/book-reviews" className="group">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <Image
                    src="/images/book-post.jpg"
                    alt="YL 閱讀筆記"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-3xl font-serif font-bold mb-3">
                      YL 閱讀筆記
                    </h2>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      愛書人 YL 的書單分享：女性議題、台灣與轉型正義、親子教養、商業與創業、人生與理財等主題。
                    </p>
                    <span className="inline-flex items-center font-medium group-hover:translate-x-2 transition-transform">
                      Start Reading <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
