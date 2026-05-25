
// lib/category-maps.js

const TRAVEL_MAP =
  "https://www.google.com/maps/d/u/0/embed?mid=10mtXLPGxgPH-cdOhMG1oFgpgc84-P5c&ehbc=2E312F"

export const CATEGORY_MAPS = {
  "英倫親子遊 Travel with kids in UK": TRAVEL_MAP,
  "海外親子遊 Travel with kids aboard": TRAVEL_MAP,
  "台灣親子遊 Travel with kids in Taiwan": TRAVEL_MAP,
}

export function getMapForCategory(slug) {
  return CATEGORY_MAPS[slug] || null
}
