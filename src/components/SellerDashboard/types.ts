export interface ChartData {
    date: string
    value: number
  }
  
  export interface ShopInfoData {
    totalProducts: number
    totalProfit: string
    totalOrders: number
    totalSales: string
    totalViews: number
  }
  
  export interface PackageInfoData {
    packageName: string
    packageImage: string
    currentProducts: number
    maxProducts: number
    discount: number
    daysRemaining: number
  }
  
  export interface ProductData {
    id: string
    name: string
    price: number
    sales: number
  }
  
  export interface OrderData {
    id: string
    orderCode: string
    customer: string
    amount: number
    profit: number
    detailLink: string
  }
  
  