import type { ChartData, ShopInfoData, PackageInfoData, ProductData, OrderData } from "./types"

// Mock data for the revenue chart
export const mockChartData: ChartData[] = [
  { date: "13 March", value: 0 },
  { date: "14 March", value: 0 },
  { date: "15 March", value: 0 },
  { date: "16 March", value: 0 },
  { date: "17 March", value: 0 },
  { date: "18 March", value: 2 },
  { date: "19 March", value: 13 },
]

// Mock data for shop info
export const mockShopInfo: ShopInfoData = {
  totalProducts: 39,
  totalProfit: "$2.54",
  totalOrders: 1,
  totalSales: "$12.70",
  totalViews: 314,
}

// Mock data for package info
export const mockPackageInfo: PackageInfoData = {
  packageName: "Silver Shop",
  packageImage:
    "https://shop.shop-worldwide-amz.top/public/uploads/all/LAqQwhcT7SII4cm2jolwm3DyqONCvQHhMmCt2ziu.png?v=2",
  currentProducts: 39,
  maxProducts: 200,
  discount: 20,
  daysRemaining: 364,
}

// Mock data for best selling products
export const mockBestSellingProducts: ProductData[] = [
  {
    id: "1",
    name: "Gildan Mens Heavy Cotton 100% Cotton T-Shirt, Azalea",
    price: 6.87,
    sales: 1,
  },
  {
    id: "2",
    name: "Hanes Men's Essential-t Short Sleeve t-Shirt (5280)",
    price: 5.83,
    sales: 1,
  },
  {
    id: "3",
    name: "PJ PAUL JONES Mens Sweaters Crewneck Textured Knitted Raglan Sleeve Casual Pullover - Clothes",
    price: 20.99,
    sales: 0,
  },
  {
    id: "4",
    name: "Luminara Moving Flame LED Flameless Tealight (1.4 x 2) Remote Ready Battery Operated Plastic LED Flameless Tea Light - Smooth Matte - Pearl Ivory (2-Pack Burgundy)",
    price: 2.0,
    sales: 0,
  },
  {
    id: "5",
    name: "ASMAD Solar Garden Lights, 6 Pack 48 LEDs Solar Outdoor Lights, Christmas Decorations Lights, Solar Christmas Lights, Firefly Lights for Patio Pathway Outdoor Decor, Big Bulb Solar Swaying Light",
    price: 7.4,
    sales: 0,
  },
  {
    id: "6",
    name: "Christmas Decorations - Christmas Window Clings Christmas Decorations Indoor Christmas Decorations Clearance Snowflakes Christmas Window Decorations Stickers for Home Office Classroom",
    price: 5.99,
    sales: 0,
  },
  {
    id: "7",
    name: "Sanniu Led String Lights, Mini Battery Powered Copper Wire Starry Fairy Lights, Battery Operated Lights for Bedroom, Christmas, Parties, Wedding, Centerpiece, Decoration (5m/16ft Warm White),1 Pack",
    price: 6.99,
    sales: 0,
  },
  {
    id: "8",
    name: "Gr Window Clings Reusable 88 PCS Christmas Window Clings Gr Christmas Decorations Christmas Window Sticker Gr Window Decals Home School Office Gr Party, 8 sheets",
    price: 5.99,
    sales: 0,
  },
  {
    id: "9",
    name: "Large Print Christmas Coloring Book for Adults: Over 50 Simple, Easy, and Fun Christmas Holiday Coloring Pages for Adults and Seniors with Large Designs for Stress Relief and Relaxation",
    price: 6.99,
    sales: 0,
  },
  {
    id: "10",
    name: "Christmas Window Clings for Glass Christmas Window Decals Snowflakes 138 PCS Xmas Decals Decorations Clings Stickers for Christmas Decorations Snowflake Window Clings Winter Window Clings",
    price: 2.84,
    sales: 0,
  },
  {
    id: "11",
    name: "Rudolph the Red-Nosed Reindeer (Rudolph the Red-Nosed Reindeer) (Little Golden Book)",
    price: 3.99,
    sales: 0,
  },
  {
    id: "12",
    name: "150 Pack Ornament Hooks for Christmas – Essential Christmas Ornament Hangers – Perfect Xmas Ornament Hangers for Christmas Tree Decoration (Green)",
    price: 5.99,
    sales: 0,
  },
]

// Mock data for pending orders
export const mockPendingOrders: OrderData[] = [
  {
    id: "1",
    orderCode: "20250318-06264665",
    customer: "Ryan Nash",
    amount: 12.7,
    profit: 2.54,
    detailLink:
      "https://shop.shop-worldwide-amz.top/seller/orders/eyJpdiI6ImFhUUliUVZTYlZaZmRESXFHTitETGc9PSIsInZhbHVlIjoiNDk0bHdrVytBK1JFS21odzhWYkhKdz09IiwibWFjIjoiZDhlYmYxMWFhY2YzMGMzOTMzYmY1YzFmMzNhMWZkZmVmMDRiOWIwMTE3YTYwODcyODJjMzg2M2Y5NzdmNDE4MyIsInRhZyI6IiJ9",
  },
]

import type React from "react"

export const BoxSeamIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z" />
  </svg>
)

export const StarsIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
  </svg>
)

export const ReceiptIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z" />
  </svg>
)

export const PersonHeartsIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z" />
    <path d="M19 2h-2v2h-2v2h2v2h2V6h2V4h-2z" />
  </svg>
)

export const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
)

export const ListTaskIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
  </svg>
)

export const PercentIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zm9 9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.41 20L4 18.59 18.59 4 20 5.41 5.41 20z" />
  </svg>
)

export const CalendarWeekIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
  </svg>
)



