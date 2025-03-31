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
  

export const featuredCategories: Category[] = [
    {
      id: "cat1",
      name: "Đồ dùng cho thú cưng",
      image: "https://img6.yeshen.cc/vn-alibaba/1d/69/1d3480df9711e4268f2d245e6411b31c1aeeea69.jpg",
      itemCount: 120,
    },
    {
      id: "cat2",
      name: "Thời trang nữ và phụ kiện",
      image: "https://img6.yeshen.cc/vn-alibaba/77/b2/776539d430a3c4c9294e05784042c4f92ce355b2.jpg",
      itemCount: 350,
    },
    {
      id: "cat3",
      name: "Thời trang nam",
      image: "https://img7.yeshen.cc/vn-alibaba/56/85/56f0128c6c02ce97caa1ce2abc2db704dcc45c85.jpg",
      itemCount: 280,
    },
    {
      id: "cat4",
      name: "Thiết bị điện tử",
      image: "https://img3.yeshen.cc/vn-alibaba/8f/15/8fe3b3b8571bb0377bfd651d958c0554afcb1715.jpg",
      itemCount: 175,
    },
    {
      id: "cat5",
      name: "Trẻ em & Đồ chơi",
      image: "https://img9.yeshen.cc/vn-alibaba/bx/cq/bxlhVvN0AzEbPUw18ywPWlqB0ikeFoFRSjgWtacq.jpg",
      itemCount: 210,
    },
    {
      id: "cat6",
      name: "Đồ dùng du lịch",
      image: "https://img2.yeshen.cc/vn-alibaba/55/34/55e0efb355897865b4f7d8e4b67d662a4d061934.jpg",
      itemCount: 95,
    },
    {
      id: "cat7",
      name: "Xe hơi và xe máy",
      image: "https://img3.yeshen.cc/vn-alibaba/56/85/56f0128c6c02ce97caa1ce2abc2db704dcc45c85.jpg",
      itemCount: 0,
    },
    {
      id: "cat8",
      name: "Đồng hồ và vòng tay",
      image: "https://img5.yeshen.cc/vn-alibaba/57/e1/5754ab7ad44c7493f1c2a04e2f5bcbef3df5f4e1.jpg",
      itemCount: 0,
    },
    {
      id: "cat9",
      name: "Thiết bị điện gia dụng",
      image: "https://img9.yeshen.cc/vn-alibaba/d3/44/d3bfaa2a9fcc666facaf6e00a89b8c8ed5244044.jpg",
      itemCount: 0,
    },
    {
      id: "cat10",
      name: "Thiết bị giặt và vệ sinh",
      image: "https://img8.yeshen.cc/vn-alibaba/0c/a4/0cbfee220d4bdcf84c9204f341e55ccc4b58d3a4.jpg",
      itemCount: 0,
    },
  ]
  