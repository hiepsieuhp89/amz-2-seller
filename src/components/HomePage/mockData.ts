export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  isNew?: boolean
  isFeatured?: boolean
  isOnSale?: boolean
}

export interface Category {
  id: string
  name: string
  image: string
  itemCount: number
}

export const products: Product[] = [
  {
    id: "prod1",
    name: "[KAHI] Wrinkle Bounce Multi Balm 9g",
    price: 599.99,
    image: "https://img8.yeshen.cc/vn-alibaba/41/45/41b1c10a-5363-45b6-828a-f4123a536645.png",
    category: "Sức khỏe & Làm đẹp",
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: "prod2",
    name: "BlueWow Lapel Headset Microphone Windscreen",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://img2.yeshen.cc/vn-alibaba/44/66/4457cd95-7ef8-4b81-bc5e-881add046166.jpeg",
    category: "Thiết bị điện tử",
    rating: 4.2,
    isOnSale: true,
  },
  {
    id: "prod3",
    name: "ASICS Men GEL-JOG MC Sportstyle Shoes",
    price: 89.99,
    image: "https://img3.yeshen.cc/vn-alibaba/8e/89/8e7dd0d1-ad69-4578-8574-3d9082ccb389.jpeg",
    category: "Thời trang nam",
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: "prod4",
    name: "Merries Tape Diapers S82s x 4 packs",
    price: 19.99,
    image: "https://img2.yeshen.cc/vn-alibaba/fe/cf/fe320701-a928-45cd-9171-7b72a150b5cf.jpeg",
    category: "Trẻ em & Đồ chơi",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "prod5",
    name: "Luoke Sport Swimwear Shorts Black Swimsuit",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://img8.yeshen.cc/vn-alibaba/aa/73/aa0cb86a-b12f-413d-93fa-6e56c5f68573.jpeg",
    category: "Thời trang nữ và phụ kiện",
    rating: 4.4,
    isOnSale: true,
  },
  {
    id: "prod6",
    name: "Fairtex TP4 Compact Thigh Pads",
    price: 49.99,
    image: "https://img8.yeshen.cc/vn-alibaba/27/e1/27e061cf-82b2-4ebc-a1d7-3e102ed33ae1.jpeg",
    category: "Đồ dùng cho thú cưng",
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: "prod7",
    name: "HP ProDesk 400 G3 Mini Desktop Core i7",
    price: 315.0,
    image: "https://img0.yeshen.cc/vn-alibaba/d5/c5/d5b0b017-7cef-485a-8b99-9c12edd480c5.jpeg",
    category: "Thiết bị điện tử",
    rating: 4.9,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prod8",
    name: "Dior Addict Eau Fraiche for Women 50ml",
    price: 55.0,
    originalPrice: 99.99,
    image: "https://img7.yeshen.cc/vn-alibaba/e2/60/e2726171-ea61-42a6-ad7d-96fc2e6a7960.jpeg",
    category: "Sức khỏe & Làm đẹp",
    rating: 4.3,
    isOnSale: true,
  },
]

export const banners = [
  {
    id: "banner1",
    title: "Khuyến mãi mùa hè",
    subtitle: "Giảm giá lên đến 50%",
    image: "https://img5.yeshen.cc/vn-alibaba/dc/59/dcdd2db638bed31a8c0c19d6753b63ca7a319459.jpg",
    buttonLink: "/sale",
  },
  {
    id: "banner2",
    title: "Bộ sưu tập mới",
    subtitle: "Khám phá các sản phẩm mới nhất",
    image: "https://img9.yeshen.cc/vn-alibaba/9c/2e/9cd5ae8d634077c46e52d8128b63ac23b60dc22e.jpg",
    buttonLink: "/new-arrivals",
  },
  {
    id: "banner3",
    title: "Miễn phí vận chuyển",
    subtitle: "Cho đơn hàng trên $25",
    image: "https://img0.yeshen.cc/vn-alibaba/9d/37/9dfe7a5905535ae120a03806e6f1f6a04c40df37.jpg",
    buttonLink: "/shipping",
  },
]

