export interface CategoryItem {
  id: string;
  label: string;
  image: string;
  link: string;
}

export interface Category {
  id: string;
  title: string;
  items: CategoryItem[];
}

export const categories: Category[] = [
  {
    id: "cat1",
    title: "Mua quà theo người nhận",
    items: [
      {
        id: "item1",
        label: "Dành cho nam giới",
        image: "https://axm-vn.shop/public/assets/img/amazon/formen.jpg",
        link: "https://axm-vn.shop/category/men-clothing-men-shoes",
      },
      {
        id: "item2",
        label: "Dành cho phụ nữ",
        image: "https://axm-vn.shop/public/assets/img/amazon/forwomen.jpg",
        link: "https://axm-vn.shop/category/women-clothing-fashion",
      },
      {
        id: "item3",
        label: "dành cho trẻ em",
        image: "https://axm-vn.shop/public/assets/img/amazon/forchildren.jpg",
        link: "https://axm-vn.shop/category/toy-urk6l",
      },
      {
        id: "item4",
        label: "Dành cho thanh thiếu niên",
        image: "https://axm-vn.shop/public/assets/img/amazon/forteenagers.jpg",
        link: "https://axm-vn.shop/category/stationery--craft-tzffh",
      },
    ],
  },
  {
    id: "cat2",
    title: "Bắt đầu tận hưởng trải nghiệm chơi game",
    items: [
      {
        id: "item5",
        label: "Trò chơi mua sắm",
        image: "https://axm-vn.shop/public/assets/img/amazon/gameshare.jpg",
        link: "https://axm-vn.shop/category/Console-Gaming-Npeqo",
      },
    ],
  },
  {
    id: "cat3",
    title: "Sản phẩm gia dụng mới dưới $50",
    items: [
      {
        id: "item6",
        label: "Công cụ cải thiện nhà cửa",
        image: "https://img6.yeshen.cc/vn-alibaba/2e/df/2e35b8c2e46fcd59726c8d10c25bed756a9a17df.jpg",
        link: "https://axm-vn.shop/category/home-improvement--tools-kexy2?sort_by=newest&min_price=0&max_price=50",
      },
      {
        id: "item7",
        label: "Nhà bếp và phòng ăn",
        image: "https://img2.yeshen.cc/vn-alibaba/c2/1b/c20f18d8dee5fd6282d714f086b541a3d60c5f1b.jpg",
        link: "https://axm-vn.shop/category/kitchen--dining-ecvfi?sort_by=newest&min_price=0&max_price=50",
      },
      {
        id: "item8",
        label: "Vật Dụng Tắm",
        image: "https://img9.yeshen.cc/vn-alibaba/pp/w9/ppAf0fahz5jAETyxmSFDmh7eJ6YP80OyS5AFy3w9.png",
        link: "https://axm-vn.shop/category/bath-cdh8b",
      },
      {
        id: "item9",
        label: "Trang trí nhà cửa",
        image: "https://img2.yeshen.cc/vn-alibaba/92/88/928566a688110314502e67eaa9dac7b23a2eba88.jpg",
        link: "https://axm-vn.shop/category/home-dcor-ql07j",
      },
    ],
  },
  {
    id: "cat4",
    title: "Có thứ gì đó được giảm giá cho mọi người",
    items: [
      {
        id: "item10",
        label: "Mua ngay",
        image: "https://axm-vn.shop/public/assets/img/amazon/everybody_love.jpg",
        link: "https://axm-vn.shop/search?sort_by=newest&min_price=0&max_price=10",
      },
    ],
  },
  {
    id: "cat5",
    title: "Mua sắm đồ dùng thiết yếu cho gia đình",
    items: [
      {
        id: "item11",
        label: "Thiết bị giặt và vệ sinh",
        image: "https://img8.yeshen.cc/vn-alibaba/0c/a4/0cbfee220d4bdcf84c9204f341e55ccc4b58d3a4.jpg",
        link: "https://axm-vn.shop/category/laundry--cleaning-equipment-sd3nz",
      },
      {
        id: "item12",
        label: "储存与组织",
        image: "https://img6.yeshen.cc/vn-alibaba/1d/69/1d3480df9711e4268f2d245e6411b31c1aeeea69.jpg",
        link: "https://axm-vn.shop/category/storage--organisation-btevb",
      },
      {
        id: "item13",
        label: "Chăn ga gối đệm",
        image: "https://img9.yeshen.cc/vn-alibaba/g6/2G/g6l1KNzyiVElUcTgJz23IVkVa2r3EvLFBNjyEd2G.png",
        link: "https://axm-vn.shop/category/bedding-8ohnk",
      },
      {
        id: "item14",
        label: "Nội thất",
        image: "https://img3.yeshen.cc/vn-alibaba/uw/Tw/uw1HgzSjWO9ge0hnM0kSuR6OFAm7COszk2aeYyTw.png",
        link: "https://axm-vn.shop/category/furniture-hawn0",
      },
    ],
  },
  {
    id: "cat6",
    title: "Những món quà nhỏ dưới $20",
    items: [
      {
        id: "item15",
        label: "Mua ngay",
        image: "https://axm-vn.shop/public/assets/img/amazon/small_gifts.jpg",
        link: "https://axm-vn.shop/search?sort_by=unit_price&min_price=0&max_price=20",
      },
    ],
  },
  {
    id: "cat7",
    title: "Đồ chơi dưới $25",
    items: [
      {
        id: "item16",
        label: "Mua ngay",
        image: "https://axm-vn.shop/public/assets/img/amazon/toys_under_25.jpg",
        link: "https://axm-vn.shop/category/Toys--Games-WzVvD?sort_by=newest&min_price=0&max_price=25",
      },
    ],
  },
  {
    id: "cat8",
    title: "Ưu đãi dành cho PC",
    items: [
      {
        id: "item17",
        label: "Mua ngay",
        image: "https://axm-vn.shop/public/assets/img/amazon/pc_deals.jpg",
        link: "https://axm-vn.shop/category/laptop-obxez",
      },
    ],
  },
]; 