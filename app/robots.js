// app/robots.js
// 告訴 Google 哪些可以爬、sitemap 在哪

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/notion-dashboard", "/notion-data"],
      },
    ],
    sitemap: "https://yilungc.com/sitemap.xml",
  }
}
