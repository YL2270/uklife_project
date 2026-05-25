"use client"

import { useState, useEffect, useRef } from "react"
import { Search, XIcon } from "lucide-react"
import Link from "next/link"

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.results || [])
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋文章..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
          />
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {loading && (
          <div className="px-4 py-6 text-center text-muted-foreground text-sm">搜尋中...</div>
        )}

        {!loading && results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto divide-y divide-border">
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/${r.category}/${r.id}`}
                  onClick={onClose}
                  className="flex flex-col gap-1 px-4 py-3 hover:bg-accent transition-colors"
                >
                  <span className="font-medium text-foreground line-clamp-1">{r.title}</span>
                  {r.excerpt && (
                    <span className="text-sm text-muted-foreground line-clamp-2">{r.excerpt}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!loading && query.trim() && results.length === 0 && (
          <div className="px-4 py-6 text-center text-muted-foreground text-sm">
            找不到 &ldquo;{query}&rdquo; 相關文章
          </div>
        )}

        {!query.trim() && (
          <div className="px-4 py-6 text-center text-muted-foreground text-sm">
            輸入關鍵字開始搜尋
          </div>
        )}
      </div>
    </div>
  )
}
