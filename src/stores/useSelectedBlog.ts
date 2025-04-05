import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBlog } from '@/interface/response/blogs'

interface SelectedBlogState {
  selectedBlog: IBlog | null
  setSelectedBlog: (blog: IBlog) => void
  clearSelectedBlog: () => void
}

export const useSelectedBlog = create(
  persist<SelectedBlogState>(
    (set) => ({
      selectedBlog: null,
      setSelectedBlog: (blog: IBlog) => set({ selectedBlog: blog }),
      clearSelectedBlog: () => set({ selectedBlog: null }),
    }),
    {
      name: 'selected-blog-storage',
    }
  )
) 