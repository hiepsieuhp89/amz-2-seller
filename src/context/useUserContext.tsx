"use client"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

import { clearToken, setTokenToLocalStorage } from "@/helper/tokenStorage"
import { getProfile } from "@/api/authentication"
import { IProfileResponse } from "@/interface/response/authentication"
import { QueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const queryClient = new QueryClient()

type UserContextType = {
  user: null | Record<string, any>
  profile: IProfileResponse | null
  loginUser: (userInfo: any, token: string) => void
  logoutUser: () => void
  fetchUserProfile: () => Promise<void>
  isLoadingProfile: boolean
  logoUrl: string | undefined
  hasTransactionPassword: boolean
  setTransactionPassword: (password: string) => Promise<boolean>
  verifyTransactionPassword: (password: string) => Promise<boolean>
}

const UserContext = createContext<UserContextType | null>(null)

const setCookie = (name: string, value: string, days = 30) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<null | Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })
  const [profile, setProfile] = useState<IProfileResponse | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false)
  const [hasTransactionPassword, setHasTransactionPassword] = useState<boolean>(false)

  const loginUser = (userInfo: any, token: string) => {
    setUser(userInfo)
    setTokenToLocalStorage(token)
    setCookie("accessToken", token)
    // Fetch profile after login
    fetchUserProfile()
  }

  const fetchUserProfile = async () => {
    try {
      setIsLoadingProfile(true)
      const profileData = await getProfile()
      if (typeof window !== "undefined" && profileData) {
        localStorage.setItem("userProfile", JSON.stringify(profileData))
        setProfile(profileData)
        
        // Check if the user has a transaction password set
        checkTransactionPasswordStatus(profileData)
        
        // Check if shop is suspended
        if (profileData.data?.shopStatus === "SUSPENDED") {
          console.log("Account suspended. Logging out...")
          logoutUser()
        }
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const checkTransactionPasswordStatus = (profile: IProfileResponse) => {
    // This logic may need to be adjusted based on your API response structure
    // Since hasTransactionPassword doesn't exist in the profile data structure,
    // we need to use a different indicator or check from localStorage
    
    // Example: Check if the user has set a transaction password using localStorage
    const transactionPasswordStatus = localStorage.getItem('hasTransactionPassword')
    
    // Set based on localStorage or default to false for new users
    setHasTransactionPassword(transactionPasswordStatus === 'true')
  }

  const setTransactionPassword = async (password: string): Promise<boolean> => {
    try {
      // API call to set transaction password goes here
      // Below is a placeholder, replace with actual API call
      const response = await fetch('/api/user/transaction-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Store transaction password status in localStorage
        localStorage.setItem('hasTransactionPassword', 'true')
        setHasTransactionPassword(true)
        // Refresh profile to get updated data
        await fetchUserProfile()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to set transaction password:', error)
      return false
    }
  }

  const verifyTransactionPassword = async (password: string): Promise<boolean> => {
    try {
      // API call to verify transaction password goes here
      // Below is a placeholder, replace with actual API call
      const response = await fetch('/api/user/verify-transaction-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      
      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('Failed to verify transaction password:', error)
      return false
    }
  }

  // Load profile from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile)
        setProfile(parsedProfile)
        checkTransactionPasswordStatus(parsedProfile)
      }
    }
  }, [])

  // Check shop suspension status without triggering rerenders
  useEffect(() => {
    if (!user) return

    const checkShopStatus = async () => {
      try {
        const profileData = await getProfile()
        if (profileData?.data?.shopStatus === "SUSPENDED") {
          console.log("Account suspended. Logging out...")
          logoutUser()
        }
      } catch (error) {
        console.error("Failed to check shop status:", error)
      }
    }

    const intervalId = setInterval(() => {
      checkShopStatus()
    }, 10000) // 10 seconds interval

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [user])

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user])

  const logoutUser = () => {
    clearToken()
    setUser(null)
    setProfile(null)
    setHasTransactionPassword(false)
    // Clear profile from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("userProfile")
      localStorage.removeItem("hasTransactionPassword")
    }
    // Also clear the cookie
    deleteCookie("accessToken")
    router.push("/sign-in")
    queryClient.clear()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loginUser,
        logoutUser,
        fetchUserProfile,
        logoUrl: profile?.data?.logoUrl || "",
        isLoadingProfile,
        hasTransactionPassword,
        setTransactionPassword,
        verifyTransactionPassword
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

