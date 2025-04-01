export interface MenuItem {
    label: string;
    href: string;
    icon?: string;
    subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
    {
        label: 'Tất cả các loại',
        href: '/category/all-categories',
        subItems: [
            {
                label: 'Đồ dùng cho thú cưng',
                href: '/category/pet-supplies',
                icon: '/icons/pet-supplies.png',
            },
            {
                label: 'Thời trang nữ và phụ kiện',
                href: '/category/women-clothing-fashion',
                icon: '/icons/women-fashion.png',
                subItems: [
                    {
                        label: 'Quần áo nữ',
                        href: '/category/women-clothing',
                    },
                    {
                        label: 'Giày dép nữ',
                        href: '/category/women-shoes',
                    },
                    {
                        label: 'Túi xách nữ',
                        href: '/category/women-bags',
                    },
                    {
                        label: 'Phụ kiện nữ',
                        href: '/category/women-accessories',
                    },
                ],
            },
            {
                label: 'Thời trang nam',
                href: '/category/men-clothing',
                icon: '/icons/men-fashion.png',
                subItems: [
                    {
                        label: 'Quần áo nam',
                        href: '/category/men-clothing',
                    },
                    {
                        label: 'Giày dép nam',
                        href: '/category/men-shoes',
                    },
                    {
                        label: 'Túi xách nam',
                        href: '/category/men-bags',
                    },
                    {
                        label: 'Phụ kiện nam',
                        href: '/category/men-accessories',
                    },
                ],
            },
            {
                label: 'Đồ dùng du lịch',
                href: '/category/travel',
                icon: '/icons/travel.png',
            },
            {
                label: 'Quà lưu niệm',
                href: '/category/souvenir',
                icon: '/icons/souvenir.png',
            },
            {
                label: 'Thiết bị điện tử',
                href: '/category/electronic-devices',
                icon: '/icons/electronics.png',
                subItems: [
                    {
                        label: 'Điện thoại di động',
                        href: '/category/mobiles',
                    },
                    {
                        label: 'Laptop',
                        href: '/category/laptops',
                    },
                    {
                        label: 'Máy tính bảng',
                        href: '/category/tablets',
                    },
                    {
                        label: 'Máy ảnh kỹ thuật số',
                        href: '/category/digital-cameras',
                    },
                ],
            },
            {
                label: 'Trẻ em & Đồ chơi',
                href: '/category/toys',
                icon: '/icons/toys.png',
                subItems: [
                    {
                        label: 'Đồ chơi & Trò chơi',
                        href: '/category/toys-games',
                    },
                    {
                        label: 'Đồ chơi thể thao & Ngoài trời',
                        href: '/category/sports-toys',
                    },
                    {
                        label: 'Đồ chơi điện tử & Điều khiển từ xa',
                        href: '/category/electronic-toys',
                    },
                ],
            },
            {
                label: 'Sức khỏe & Làm đẹp',
                href: '/category/health-beauty',
                icon: '/icons/health-beauty.png',
                subItems: [
                    {
                        label: 'Chăm sóc da',
                        href: '/category/skin-care',
                    },
                    {
                        label: 'Chăm sóc tóc',
                        href: '/category/hair-care',
                    },
                    {
                        label: 'Trang điểm',
                        href: '/category/makeup',
                    },
                    {
                        label: 'Nước hoa',
                        href: '/category/fragrances',
                    },
                ],
            },
            {
                label: 'Trang trí nhà cửa & Thiết bị gia dụng',
                href: '/category/home-decor',
                icon: '/icons/home-decor.png',
                subItems: [
                    {
                        label: 'Thiết bị nhà bếp',
                        href: '/category/kitchen-appliances',
                    },
                    {
                        label: 'Thiết bị làm mát & Xử lý không khí',
                        href: '/category/cooling-appliances',
                    },
                    {
                        label: 'Thiết bị điện gia dụng lớn',
                        href: '/category/large-appliances',
                    },
                ],
            },
        ],
    },
    {
        label: 'Trang chủ',
        href: '/',
    },
    {
        label: 'Giảm giá thần tốc',
        href: '/flash-deals',
    },
    {
        label: 'Blog',
        href: '/blog',
    },
    {
        label: 'Tất cả các thương hiệu',
        href: '/brands',
    },
    {
        label: 'Tất cả danh mục',
        href: '/categories',
    },
    {
        label: 'Người bán',
        href: '/all-seller',
    },
];