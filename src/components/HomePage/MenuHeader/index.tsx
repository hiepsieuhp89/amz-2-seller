import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@mdi/react';
import { mdiMenu, mdiPaw, mdiDresser, mdiSunglasses, mdiShoeHeel, mdiGlasses, mdiBagPersonal, mdiGift, mdiLaptop, mdiToyBrick, mdiWashingMachine, mdiHeart, mdiLipstick, mdiArrowRight, mdiChevronRight } from '@mdi/js';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { menuItems } from './mockData';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function MenuHeader() {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const popoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    const handleMouseEnter = () => {
        if (popoverTimeoutRef.current) {
            clearTimeout(popoverTimeoutRef.current);
        }
        setIsPopoverOpen(true);
    };

    const handleMouseLeave = () => {
        popoverTimeoutRef.current = setTimeout(() => {
            setIsPopoverOpen(false);
        }, 200);
    };

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -20 },
    };

    const CategoryPopover = () => (
        <div className="aiz-category-menu rounded-none border-none">
            <ul className="list-unstyled categories no-scrollbar py-2 mb-0 text-left">
                {/* Pet Supplies */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/luxury-43d7m"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiPaw} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Đồ dùng cho thú cưng</span>
                    </Link>
                </li>
                {/* Women's Fashion */}
                <li className="flex items-center">
                    <Popover>
                        <PopoverTrigger
                            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Icon path={mdiDresser} size={0.8} className="cat-image mr-2 opacity-60" />
                            <span className="cat-name">Thời trang nữ và phụ kiện</span>
                            <Icon path={mdiChevronRight} size={0.8} className="ml-auto opacity-60" />
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-full rounded-none border shadow-sm !p-1"
                            align='center'
                            side='right'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="grid grid-cols-3 gap-4">
                                <div className="shadow-none border-0">
                                    <ul className="list-unstyled mb-3">
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Women-Underwear-VV7W5" className="text-reset">
                                                Women Underwear
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Women-Sunglasses-qoNVN" className="text-reset">
                                                Kính mát nữ
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/women-shoes-rk61s" className="text-reset">
                                                Giày dép nữ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card shadow-none border-0">
                                    <ul className="list-unstyled mb-3">
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/women-eye-glasses-tjpk4" className="text-reset">
                                                Kính mắt nữ
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Women-Clothing-O9nEj" className="text-reset">
                                                Quần áo nữ
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Women-Clothing-Lingerie-Sleep--Lounge-JXhOi" className="text-reset">
                                                Quần áo nữ nội y, ngủ & thư giãn
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card shadow-none border-0">
                                    <ul className="list-unstyled mb-3">
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/women-bags-cjsn5" className="text-reset">
                                                Túi xách phụ nữ
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Women-Accessories-25Cim" className="text-reset">
                                                Phụ kiện nữ
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Swimwear-and-Beachwear-bu57h" className="text-reset">
                                                Đồ bơi và đồ dạo biển
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </li>
                {/* Men's Fashion */}
                <li className="flex items-center">
                    <Popover>
                        <PopoverTrigger
                            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Icon path={mdiBagPersonal} size={0.8} className="cat-image mr-2 opacity-60" />
                            <span className="cat-name">Thời trang nam</span>
                            <Icon path={mdiChevronRight} size={0.8} className="ml-auto opacity-60" />
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-full rounded-none border shadow-sm !p-1"
                            align='center'
                            side='right'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="grid grid-cols-3 gap-4">
                                <div className="shadow-none border-0">
                                    <ul className="list-unstyled mb-3">
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/underwear-usij6" className="text-reset">
                                                Đồ lót nam
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Topi-Pria-nNhrV" className="text-reset">
                                                Mũ nam
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Sandal-Pria-8qJTS" className="text-reset">
                                                Dép nam
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card shadow-none border-0">
                                    <ul className="list-unstyled mb-3">
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Men-Sunglasses-dtGSX" className="text-reset">
                                                Kính mát nam
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Men-Shoes-NGV6r" className="text-reset">
                                                Giày dép nam
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Men-Eyeglasses-IaCCW" className="text-reset">
                                                Kính mắt nam
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card shadow-none border-0">
                                    <ul className="list-unstyled mb-3">
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Men-Clothing-HjbPr" className="text-reset">
                                                Quần áo nam
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/men-bags-eisg" className="text-reset">
                                                Túi xách nam
                                            </Link>
                                        </li>
                                        <li className="py-2 px-3 hover:bg-gray-100 w-full">
                                            <Link href="https://axm-vn.shop/category/Men-Accessories-4MidG" className="text-reset">
                                                Phụ kiện nam
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </li>
                {/* Travel Accessories */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/travel-accessories"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiBagPersonal} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Đồ dùng du lịch</span>
                    </Link>
                </li>
                {/* Souvenirs */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/souvenirs"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiGift} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Quà lưu niệm</span>
                    </Link>
                </li>
                {/* Electronics */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/electronics"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiLaptop} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Thiết bị điện tử</span>
                    </Link>
                </li>
                {/* Kids & Toys */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/kids-toys"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiToyBrick} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Trẻ em & đồ chơi</span>
                    </Link>
                </li>
                {/* Cleaning & Laundry */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/cleaning-laundry"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiWashingMachine} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Thiết bị giặt và vệ sinh</span>
                    </Link>
                </li>
                {/* Adult Products */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/adult-products"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiHeart} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Sản phẩm người lớn</span>
                    </Link>
                </li>
                {/* Health & Beauty */}
                <li className="group relative">
                    <Link
                        href="https://axm-vn.shop/category/health-beauty"
                        className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
                    >
                        <Icon path={mdiLipstick} size={0.8} className="cat-image mr-2 opacity-60" />
                        <span className="cat-name">Sức khoẻ và làm đẹp</span>
                    </Link>
                </li>
            </ul>
        </div>
    );

    return (
        <motion.nav
            className="flex items-center px-4 h-10 bg-main-gunmetal-blue"
            initial="closed"
            animate="open"
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center space-x-4 mr-2">
                <Icon path={mdiMenu} size={1} className="text-gray-400" />
            </div>

            <div className="flex space-x-6">
                {menuItems.map((item, index) => (
                    <motion.div key={index}>
                        {item.href === '/category/all-categories' ? (
                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <div
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div
                                            className={`flex items-center space-x-2 ${
                                                pathname.includes(item.href) && item.href !== "/category/all-categories"
                                                    ? 'text-main-golden-orange border-transparent'
                                                    : 'text-gray-400 border-transparent'
                                            } border-b-2 hover:text-main-golden-orange hover:border-main-golden-orange transition-colors duration-200 cursor-default pointer-events-none`}
                                        >
                                            <span>{item.label}</span>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-72 p-0 rounded-none border-none shadow-sm"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    side="top"
                                    align="end"
                                >
                                    <CategoryPopover />
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center space-x-2 ${
                                    pathname.includes(item.href) && item.href !== "/"
                                        ? 'text-main-golden-orange border-transparent'
                                        : 'text-gray-400 border-transparent'
                                } border-b-2 hover:text-main-golden-orange hover:border-main-golden-orange transition-colors duration-200`}
                            >
                                <span>{item.label}</span>
                            </Link>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.nav>
    );
}
