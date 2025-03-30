import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'

interface Product {
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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Card className="h-full overflow-hidden transition-all duration-200">
          <CardContent className="p-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-blue-500 hover:bg-blue-600">Mới</Badge>
                  )}
                  {product.isOnSale && product.originalPrice && (
                    <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex items-center">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price * 1000)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice * 1000)}
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
