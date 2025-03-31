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

export const categories2: Category[] = [
  {
    id: "cat1",
    title: "Đồ dùng cho thú cưng",
    items: [
      {
        id: "item1",
        label: "Mua ngay",
        image: "https://axm-vn.shop/public/assets/img/amazon/pet_products.jpg",
        link: "https://axm-vn.shop/category/luxury-43d7m",
      },
    ],
  },
  {
    id: "cat2",
    title: "Sản phẩm điện tử",
    items: [
      {
        id: "item2",
        label: "Xem thêm",
        image: "https://axm-vn.shop/public/assets/img/amazon/electronics.jpg",
        link: "https://axm-vn.shop/category/electronic-devices-p7hnl",
      },
    ],
  },
  {
    id: "cat3",
    title: "Tập thể dục tại nhà",
    items: [
      {
        id: "item3",
        label: "Xem thêm",
        image: "https://axm-vn.shop/public/assets/img/amazon/home_fitness.jpg",
        link: "https://axm-vn.shop/category/Exercise--Fitness-Equipment-Iugik",
      },
    ],
  },
  {
    id: "cat4",
    title: "Khu trò chơi",
    items: [
      {
        id: "item4",
        label: "Xem thêm",
        image: "https://axm-vn.shop/public/assets/img/amazon/game_zone.jpg",
        link: "https://axm-vn.shop/category/Console-Gaming-Accessories-q6k14",
      },
    ],
  },
]; 