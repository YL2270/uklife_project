"use client"

export default function CategoryMap({ url }) {
  if (!url) return null

  return (
    <div className="mb-10 rounded-xl overflow-hidden border border-border shadow-md">
      <iframe
        src={url}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="旅遊地圖"
      />
    </div>
  )
}
