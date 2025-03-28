import { useMutation } from '@tanstack/react-query'
import { uploadFile } from '@/api/upload'

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error('Upload failed:', error)
      throw error
    }
  })
} 