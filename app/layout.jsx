import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Yilungc",
  description: "Dive into insightful book reviews or explore captivating UK life experiences.",
  icons: {
    icon: [
      { url: 'images/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: 'images/favicon.png' // Optional: for Apple devices
  },
  // 🚨 網站驗證碼：新增 alternates 區塊
 alternates: {
    // 使用 links 屬性來定義 rel="me" link 標籤
    links: [
        { 
            rel: 'me', 
            href: 'https://mastodon.social/@YL_8964'
        }
    ]
  }
}

{/*
  export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yilungc",
  description: "Dive into insightful book reviews or explore captivating UK life experiences.",
  icons: {
    icon: [
      { url: 'images/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: 'images/favicon.png'
  },
}; */}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7K4GH0T9MV"></script>
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
