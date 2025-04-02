import Link from "next/link"
import Image from "next/image"
import { categories } from "./mockData"
import { motion } from "framer-motion"

export default function Categories() {
  return (
    <div className="w-full py-6">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              className="bg-white shadow-sm p-4 h-full border"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-lg font-medium mb-3 ">{category.title}</h2>
              {category.items.length === 1 ? (
                <div className="mb-3">
                  <Link href={`/category?id=${category.items[0].link}&name=${category.items[0].label}`} className="block">
                    <motion.div 
                      className="relative aspect-[4/3] overflow-hidden mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Image
                        src={category.items[0].image || "/images/white-image.png" }
                        alt={category.items[0].label}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </Link>
                  <div className="mt-4">
                    <Link href={`/category?id=${category.items[0].link}&name=${category.items[0].label}`} className="text-sm text-blue-600 hover:underline">
                      Mua ngay
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {category.items.slice(0, 2).map((item) => (
                      <Link key={item.id} href={`/category?id=${item.link}&name=${item.label}`} className="block">
                        <motion.div 
                          className="relative aspect-square overflow-hidden mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={item.image}
                            alt={item.label}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <span className="text-xs line-clamp-1">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {category.items.slice(2, 4).map((item) => (
                      <Link key={item.id} href={`/category?id=${item.link}&name=${item.label}`} className="block">
                        <motion.div 
                          className="relative aspect-square overflow-hidden mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={item.image || "/images/white-image.png"}
                            alt={item.label}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <span className="text-xs  line-clamp-1">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {category.items.length > 1 && (
                <div className="mt-3">
                  <Link href={`/categories`} className="text-sm text-blue-600 hover:underline">
                    Xem tất cả
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

