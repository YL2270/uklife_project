// components/SafeImage.jsx
'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function SafeImage({ src, alt = '', ...props }) {
  const [imgSrc, setImgSrc] = useState(src)

  const fallback = '/images/placeholder.jpg' // Local fallback image in public/images

  // Helper to detect if src is likely valid
  const isValid = imgSrc && imgSrc.startsWith('http')

  return (
    <Image
      src={isValid ? imgSrc : fallback}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  )
}
