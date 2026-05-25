// app/about/page.jsx
// 關於我頁面——基本版，你可以修改內容
// 之前你的 about 內容我沒有原版可參考，這份是給你的起點

import Header from "../../components/header"
import Footer from "../../components/footer"
import Image from "next/image"

export const metadata = {
  title: "關於我 About",
  description: "YL：旅英台灣人，倫敦定居中，與另一半共同養育兩個男孩。",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
            About Me
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-xl leading-relaxed">
              Hi，我是 YL，旅英台灣人。
            </p>

            <p className="leading-relaxed">
              和另一半定居倫敦，共同養育兩個男孩。我在這裡分享我的英倫育兒生活、英國教育和私校心得、親子旅遊、以及創業和居家生活。
            </p>

            <p className="leading-relaxed">
              同時我也是個愛書人，分享閱讀筆記，主題涵蓋女性議題、台灣與轉型正義、親子教養、商業創業、人生理財、科學與科技、小說與自傳。
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-4">
              聯絡我
            </h2>
            <p className="leading-relaxed">
              如果你想與我聯絡，可以透過以下方式：
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:hello@yilungc.com"
                  className="text-secondary underline hover:text-primary"
                >
                  hello@yilungc.com
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/dr_yi_lung/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline hover:text-primary"
                >
                  @dr_yi_lung
                </a>
              </li>
              <li>
                Facebook:{" "}
                <a
                  href="https://www.facebook.com/MyLittleLovelyRosaIG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline hover:text-primary"
                >
                  MyLittleLovelyRosaIG
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
