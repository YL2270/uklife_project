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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
