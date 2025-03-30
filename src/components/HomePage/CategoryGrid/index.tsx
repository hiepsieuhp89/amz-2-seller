import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  id: string
  name: string
  image: string
  itemCount: number
}

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-8 bg-[#F5F5F5]">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`} className="block">
          <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="relative aspect-square w-full">
                <Image src={category.image } alt={category.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{category.itemCount} sản phẩm</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

