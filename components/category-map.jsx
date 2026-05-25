// components/category-map.jsx

export default function CategoryMap({ embedUrl, categoryName }) {
  if (!embedUrl) return null

  return (
    <div className="mb-12">
      <div className="aspect-[16/9] md:aspect-[5/2] rounded-lg overflow-hidden border border-border shadow-sm">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${categoryName} 地圖`}
          className="block w-full h-full"
          style={{ border: 0 }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        📍 點地圖上的標記可連到對應文章
      </p>
    </div>
  )
}
