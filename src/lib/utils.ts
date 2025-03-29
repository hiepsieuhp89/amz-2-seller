import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return "https://picsum.photos/800/600"

  if (imageUrl.includes("example.com") || !imageUrl.startsWith("http")) {
    return "https://picsum.photos/800/600"
  }

  return imageUrl
}