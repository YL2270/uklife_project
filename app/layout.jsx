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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 在這裡貼上你的 GA4 追蹤程式碼 */}
        <!-- Google tag (gtag.js) -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-7K4GH0T9MV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7K4GH0T9MV');
</script>
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
