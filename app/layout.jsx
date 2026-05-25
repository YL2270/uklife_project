// app/layout.jsx
// 改動：
// 1. <html lang="zh-Hant"> - 告訴 Google 這是繁體中文，不是英文
// 2. metadataBase + 完整 OG/Twitter meta - 提升 SEO
// 3. 拿掉沒用的 alternates.links 設定

import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL("https://yilungc.com"),
  title: {
    default: "YL 英國生活＆閱讀筆記",
    template: "%s | yilungc",
  },
  description:
    "YL 在倫敦的英倫育兒、英國教育、親子旅遊與閱讀分享。台灣媽媽的英國生活紀錄。",
  keywords: [
    "英國生活",
    "倫敦",
    "英國育兒",
    "英國私校",
    "親子旅遊",
    "讀書心得",
    "台灣媽媽",
    "倫敦下午茶",
  ],
  authors: [{ name: "Yilung C" }],
  creator: "Yilung C",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://yilungc.com",
    siteName: "YL 英國生活＆閱讀筆記",
    title: "YL 英國生活＆閱讀筆記",
    description:
      "YL 在倫敦的英倫育兒、英國教育、親子旅遊與閱讀分享。台灣媽媽的英國生活紀錄。",
  },
  twitter: {
    card: "summary_large_image",
    title: "YL 英國生活＆閱讀筆記",
    description:
      "YL 在倫敦的英倫育兒、英國教育、親子旅遊與閱讀分享。",
  },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png", sizes: "512x512" }],
    apple: "/images/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7K4GH0T9MV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7K4GH0T9MV');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
