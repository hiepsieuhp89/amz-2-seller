export const mockData = {
    categories: [
        {
            id: "all",
            name: "Tất cả danh mục",
            url: "/search",
            isActive: false,
        },
        {
            id: "men-clothing",
            name: "Thời trang nam",
            url: "/category/men-clothing-men-shoes",
            isActive: true,
            children: [
                {
                    id: "men-sunglasses",
                    name: "Kính mát nam",
                    url: "/category/Men-Sunglasses-dtGSX",
                    isActive: false,
                },
                {
                    id: "men-eyeglasses",
                    name: "Kính mắt nam",
                    url: "/category/Men-Eyeglasses-IaCCW",
                    isActive: false,
                },
                {
                    id: "men-bags",
                    name: "Túi xách nam",
                    url: "/category/men-bags-eisg",
                    isActive: false,
                },
            ],
        },
    ],

    priceRange: {
        min: 0,
        max: 1000,
        current: [100, 500] as [number, number],
    },

    breadcrumbs: [
        {
            name: "Trang Chủ",
            url: "/",
            isActive: false,
        },
        {
            name: "Tất cả danh mục",
            url: "/search",
            isActive: false,
        },
        {
            name: "Thời trang nam",
            url: "/category/men-clothing-men-shoes",
            isActive: true,
        },
    ],

    title: "Thời trang nam",

    brands: [
        { id: "acer", name: "ACER" },
        { id: "adidas", name: "Adidas" },
        { id: "aigner", name: "Aigner" },
        { id: "alosa", name: "Alosa" },
        { id: "apato", name: "Apato" },
        { id: "apple", name: "Apple" },
        { id: "asus", name: "ASUS" },
        { id: "yamaha", name: "Yamaha" },
        { id: "millet", name: "millet" },
        { id: "wood-worm", name: "Wood worm" },
    ],

    sortOptions: [
        { value: "newest", label: "Mới nhất" },
        { value: "oldest", label: "Cũ nhất" },
        { value: "price-asc", label: "Giá thấp đến cao" },
        { value: "price-desc", label: "Giá từ cao đến thấp" },
    ],

    products: [
        {
            id: "688247",
            title:
                "KAKA Bange Series Laptop Backpack Bag with Waterproof Anti-theft lock with USB Charging Travel Business Office Bagpack",
            price: 39.9,
            rating: 4,
            imageUrl: "https://img7.yeshen.cc/vn-alibaba/b0/d6/b06e4a4d-1b4e-4f4f-be80-8d9c6f5612d6.jpeg",
            url: "/product/1731558375-ZiXKa",
            clubPoints: 0,
        },
        {
            id: "688246",
            title: "Osprey Arcane Large Day Backpack - Everyday - Commute",
            price: 159.0,
            rating: 4,
            imageUrl: "https://img3.yeshen.cc/vn-alibaba/f4/9b/f4090925-86e6-4290-84c0-cce0dbb27d9b.jpeg",
            url: "/product/453528229-RBese",
            clubPoints: 0,
        },
        {
            id: "688245",
            title:
                "Mark Ryden 17 inch Laptop Backpack Raincoat Male Bag USB Recharging Multi-layer Space Travel Male Bag Anti-thief Mochila",
            price: 44.0,
            rating: 5,
            imageUrl: "https://img8.yeshen.cc/vn-alibaba/52/4e/524064f5-0e9a-4f86-baa9-6711b1798d4e.jpeg",
            url: "/product/513702734-aquaI",
            clubPoints: 0,
        },
        {
            id: "688244",
            title:
                "LouisWill Men's Crossbody Bags Shoulder Bag Oxford Cloth Waist Beg Men Bag Sports Bag Travel Bag with Water Resistant Multifunctional Chest Bag Anti-theft Sling Bag Shoulder Packs Pouch for Travel",
            price: 17.9,
            rating: 4,
            imageUrl: "https://img2.yeshen.cc/vn-alibaba/4e/80/4eb0c2a0-d8a2-40d1-bbec-5d8c6a8c1c80.jpeg",
            url: "/product/2447188427-HYiFd",
            clubPoints: 0,
        },
        {
            id: "688239",
            title:
                "BULLCAPTAIN Men Genuine Leather Brand RFID Wallet Male Organizer Coin Purse Pockets Slim Fashion Zipper Clamp Wallet Card Holder",
            price: 20.13,
            rating: 5,
            imageUrl: "https://img0.yeshen.cc/vn-alibaba/4d/ca/4dc0b060-b014-490f-9da6-ff1dbb741fca.jpeg",
            url: "/product/306726017-wqyeV",
            clubPoints: 0,
        },
        {
            id: "688238",
            title: "Goldlion Men Leather Wallet (13 Cards Slot, Window Compartment, Center Flap) - Black with Inner Gray",
            price: 79.0,
            rating: 5,
            imageUrl: "https://img9.yeshen.cc/vn-alibaba/ec/4d/ece52402-1ea8-4328-935d-f11b4300c64d.jpeg",
            url: "/product/1953918102-0zyyD",
            clubPoints: 0,
        },
        {
            id: "688181",
            title: "INCERUN Men Long Sleeve Turtle Neck Undershirts Tights Jumper Muscle Stretch T-Shirt Top",
            price: 11.86,
            rating: 5,
            imageUrl: "https://img3.yeshen.cc/vn-alibaba/91/ed/91c74f9c-c3f3-4ef6-98bf-458da3a232ed.jpeg",
            url: "/product/296570117-fE7XT",
            clubPoints: 0,
        },
        {
            id: "688175",
            title:
                "Zeosaoum Three Chinese Taiwan Slippers Arch Support Couple's Men's and Women's Non-Slip Platform Flat Foot Correction",
            price: 17.9,
            rating: 4,
            imageUrl: "https://img7.yeshen.cc/vn-alibaba/e4/14/e4256bb8-156b-4f84-9bc7-db0493b9c314.jpeg",
            url: "/product/2107628104-FdTij",
            clubPoints: 0,
        },
    ],

    pagination: {
        currentPage: 1,
        totalPages: 345,
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 344, 345],
    },
}

