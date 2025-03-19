export interface ShopData {
    id: number
    name: string
    logo?: string
    phone: string
    address: string
    metaTitle: string
    metaDescription: string
    topBanner?: string[]
    sliders?: string[]
    bannerFullWidth1?: string[]
    bannersHalfWidth?: string[]
    bannerFullWidth2?: string[]
}

export interface FileItem {
    uid: string
    name: string
    status: "done" | "uploading" | "error" | "removed"
    url?: string
    thumbUrl?: string
}

interface FileType {
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error';
    url?: string;
  }
  
