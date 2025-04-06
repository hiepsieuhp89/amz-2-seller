import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkImageUrl = (imageUrls: string[] | undefined | null): string => {
  const placeholder = "/images/white-image.png";
  if (!imageUrls) {
    return placeholder;
  }
  const imageUrl = imageUrls[0]

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }
  
  return placeholder;
}