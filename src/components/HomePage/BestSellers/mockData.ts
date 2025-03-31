export interface Product {
    id: string
    image: string
    category: string
    rating: number
    isNew?: boolean
    isFeatured?: boolean
    isOnSale?: boolean
    name: string
}

export interface Category {
    id: string
    name: string
    image: string
    itemCount: number
}

export const bestSellers: Product[] = [
  {
    id: "2451358806-vG6Z6",
    image: "https://img2.yeshen.cc/vn-alibaba/27/e1/27e061cf-82b2-4ebc-a1d7-3e102ed33ae1.jpeg",
    category: "Thể thao",
    rating: 3,
    isFeatured: true,
    name: "Fairtex TP4 Compact Thigh Pads"
  },
  {
    id: "2139982864-NEJ91",
    image: "https://img8.yeshen.cc/vn-alibaba/8e/89/8e7dd0d1-ad69-4578-8574-3d9082ccb389.jpeg",
    category: "Giày thể thao",
    rating: 4.7,
    isNew: true,
    name: "ASICS Men GEL-JOG MC Sportstyle Shoes in Graphite Grey/Sour Yuzu"
  },
  {
    id: "2379012398-jy2yw",
    image: "https://img8.yeshen.cc/vn-alibaba/55/5a/55d06e14-686f-4481-b3e2-5a0b19cc955a.jpeg",
    category: "Giày chạy bộ",
    rating: 4,
    name: "ASICS Women TARTHEREDGE 3 Running Shoes in Orange Pop/Shocking Orange"
  },
  {
    id: "2139588902-9RMVo",
    image: "https://img4.yeshen.cc/vn-alibaba/67/ef/671961f4-8a93-48e6-a1f8-7704cb8e0eef.jpeg",
    category: "Giày chạy bộ",
    rating: 4,
    isFeatured: true,
    name: "ASICS Women GEL-KAYANO 28 (D) Running Shoes in Mako Blue/Barely Rose"
  },
  {
    id: "2196707966-Zxrkk",
    image: "https://img2.yeshen.cc/vn-alibaba/49/19/498b4cf6-4508-4076-96fe-ae950b799a19.jpeg",
    category: "Giày chạy bộ",
    rating: 3,
    name: "ASICS Women GEL-KAYANO 28 Running Shoes in Mako Blue/Barely Rose"
  },
  {
    id: "2427342238-ONy5G",
    image: "https://img3.yeshen.cc/vn-alibaba/a3/5f/a3bbe552-f731-43ad-a316-ff6204949a5f.jpeg",
    category: "Phụ kiện bơi lội",
    rating: 4.6,
    isOnSale: true,
    name: "adidas SWIM adidas x Disney Mickey Mouse AltaSwim Sandals Kids Unisex red GZ3314"
  },
  {
    id: "2082525653-Cx2iO",
    image: "https://img5.yeshen.cc/vn-alibaba/35/ce/35446f29-5799-4f5e-ac7d-d36fa48b35ce.jpeg",
    category: "Giày chạy bộ",
    rating: 4.7,
    name: "ASICS Women GEL-NIMBUS 23 (D) Running Shoes in Black/Black"
  },
  {
    id: "2313541252-GFgLk",
    image: "https://img5.yeshen.cc/vn-alibaba/e7/63/e727e97f-8b97-4559-b85b-f2509548ab63.jpeg",
    category: "Giày bóng rổ",
    rating: 2,
    name: "adidas BASKETBALL Hoops 2.0 Shoes Men blue FY8631"
  },
  {
    id: "12m-family-outdoor-glamping-cotton-yurt-teepee-tent-4-season-tourist-canvas-bell-tent-for-sale-EXt5J",
    image: "https://img0.yeshen.cc/vn-alibaba/d8/51/d80c6293de48fea9dcdf15b503a5efeb31e3c251.png",
    category: "Dụng cụ cắm trại",
    rating: 4.9,
    isFeatured: true,
    name: "12M family Outdoor Glamping Cotton Yurt Teepee Tent 4 Season Tourist Canvas Bell Tent For Sale"
  },
  {
    id: "140242417-fON5K",
    image: "https://img4.yeshen.cc/vn-alibaba/c6/f4/c61c7363-d901-4a1c-a8ad-041a916648f4.jpeg",
    category: "Phụ kiện thể thao",
    rating: 4.5,
    name: "Li Ning Badminton Hand Glue Non-Slip Sweat Absorbing Badminton Racket Cover Tennis Racket Strap Handle Winding Gp1000"
  }
];

export const bestSellingToys: Product[] = [
  {
    id: "2037950529-DUllS",
    image: "https://img4.yeshen.cc/vn-alibaba/47/de/47fc0a83-86c0-4906-aa71-662ce739e0de.jpeg",
    category: "Đồ chơi giáo dục",
    rating: 4.8,
    name: "Đồ chơi thông minh cho trẻ 1-2 tuổi"
  },
  {
    id: "272501668-CNNyt",
    image: "https://img9.yeshen.cc/vn-alibaba/48/b7/48efb52d-8512-4090-a8ca-2ba0cc7f16b7.png",
    category: "Khăn ướt trẻ em",
    rating: 4.7,
    isNew: true,
    name: "Khăn ướt SoonSu Story Sky"
  },
  {
    id: "949198948-o9V9y",
    image: "https://img9.yeshen.cc/vn-alibaba/63/fd/63f8f349-991f-4b8f-963c-5578ac0990fd.jpeg",
    category: "Sữa công thức",
    rating: 4.6,
    name: "Frisolac Gold Stage 2"
  },
  {
    id: "1684115245-5EXOk",
    image: "https://img6.yeshen.cc/vn-alibaba/47/95/47300803-a511-4254-a468-cdad69122895.jpeg",
    category: "Tã giấy",
    rating: 4.5,
    name: "Merries Pants Carton Volume Up XL44 x 4 packs"
  },
  {
    id: "516828966-3Ml3m",
    image: "https://img4.yeshen.cc/vn-alibaba/e4/37/e49bf0fe-c9d9-4615-8640-5b57b2403a37.jpeg",
    category: "Quần áo trẻ em",
    rating: 4.4,
    name: "Newborn Infant Baby Boys Gentleman Clothes Short Sleeve T-shirt Shirt Tops Bib Pants Shorts Outfits Set"
  },
  {
    id: "180203153-4iPAC",
    image: "https://img7.yeshen.cc/vn-alibaba/fe/cf/fe320701-a928-45cd-9171-7b72a150b5cf.jpeg",
    category: "Tã giấy",
    rating: 4.3,
    name: "Merries Tape Diapers S82s x 4 packs"
  },
  {
    id: "520086343-dnOQ0",
    image: "https://img5.yeshen.cc/vn-alibaba/6e/67/6eac26f9-2af7-4ea2-b4eb-d193cac9cb67.jpeg",
    category: "Chất tẩy rửa",
    rating: 4.2,
    name: "Kodomo| Baby Laundry Detergent| 3 Litres| Giant BOTTLE |Suitable for Newborn, Baby, Children (1pcs Pink)"
  },
  {
    id: "914744202-XyvoR",
    image: "https://img0.yeshen.cc/vn-alibaba/d0/d6/d02ecb88-2737-4801-8061-54fbd89556d6.jpeg",
    category: "Tã giấy",
    rating: 4.1,
    name: "Drypers Drypantz Xxl (15 - 25Kg) 28s X 4 Packs 112pcs"
  },
  {
    id: "146286115-vEwgc",
    image: "https://img5.yeshen.cc/vn-alibaba/cb/ac/cbfe8eda-eee3-480b-a13d-8f127d26c6ac.jpeg",
    category: "Quần áo trẻ em",
    rating: 4.0,
    name: "17pcs/set Newborn Girl Clothes 0-12 Months Long Sleeve Cotton New Born Baby Boy Clothing Gift Sets Suit Summer Infant Clothing - intl"
  },
  {
    id: "348378542-F9MvN",
    image: "https://img7.yeshen.cc/vn-alibaba/90/55/909e6371-7ce0-4991-9923-7016570b6e55.jpeg",
    category: "Quần áo trẻ em",
    rating: 4.3,
    name: "DIIMUU Toddler Baby Boy Clothing Gentlemen Suits Kids Children Boys Clothes Wedding Party Red Bow Tie British Style Set Fit 1-5Y"
  }
];

export const featuredProducts: Product[] = [
  {
    id: "2244083982-BsbyN",
    image: "https://img0.yeshen.cc/vn-alibaba/41/45/41b1c10a-5363-45b6-828a-f4123a536645.png",
    category: "Mỹ phẩm",
    rating: 4.8,
    isFeatured: true,
    name: "[KAHI] Wrinkle Bounce Multi Balm 9g"
  },
  {
    id: "lancome-la-vie-est-belle-rjvxL",
    image: "https://img7.yeshen.cc/vn-alibaba/37/b5/37a2e7bd09f1c8384a0442f853e65f79d3018cb5.jpg",
    category: "Nước hoa",
    rating: 4.9,
    isFeatured: true,
    name: "Lancôme La Vie Est Belle Eau de Parfum"
  },
  {
    id: "2060949053-IVAWN",
    image: "https://img7.yeshen.cc/vn-alibaba/d3/50/d375493e-8d02-44f6-a372-e1511fbbb550.jpeg",
    category: "Đồ chơi",
    rating: 4.7,
    isFeatured: true,
    name: "Induction Helicopter - Remote Control Toy"
  },
  {
    id: "2670228059-NhmRM",
    image: "https://img5.yeshen.cc/vn-alibaba/44/66/4457cd95-7ef8-4b81-bc5e-881add046166.jpeg",
    category: "Phụ kiện",
    rating: 4.5,
    isFeatured: true,
    name: "BlueWow Lapel Headset Microphone Windscreen"
  },
  {
    id: "690570331-DTQXB",
    image: "https://img3.yeshen.cc/vn-alibaba/bc/c5/bca4ef15-377c-4c20-9bbd-5b76ad507ac5.jpeg",
    category: "Thiết bị",
    rating: 4.6,
    isFeatured: true,
    name: "Dual-Way Talk Through Window Intercom"
  },
  {
    id: "2343658997-PUweJ",
    image: "https://img4.yeshen.cc/vn-alibaba/ad/0f/adac1297-9b18-468a-a33f-51dd8386680f.jpeg",
    category: "Mỹ phẩm",
    rating: 4.7,
    isFeatured: true,
    name: "[READY TO SHIP] MEDICUBE COLLAGEN VITA MULTI BALM 11g"
  },
  {
    id: "norton-360-Tjp5O",
    image: "https://img5.yeshen.cc/vn-alibaba/15/b1/152282ed-ec15-435a-b88a-b390f17157b1.jpeg",
    category: "Phần mềm",
    rating: 4.8,
    isFeatured: true,
    name: "Norton 360 Deluxe 2023 Antivirus Software"
  }
];
  