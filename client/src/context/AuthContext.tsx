'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch } from '../utils/api'
import { useRouter } from 'next/navigation'

interface User {
  email: string
  userId: string
}

interface AuthContextType {
  user: User | null
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
  apiFetch<{ message: string; user: User }>('/me')
    .then((data) => setUser(data.user))
    .catch(() => setUser(null))
}, [])

  const signin = async (email: string, password: string) => {
    await apiFetch('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setUser({ email, userId: 'loaded-later' })
    router.push('/dashboard')
  }

  const signup = async (email: string, password: string) => {
    await apiFetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setUser({ email, userId: 'loaded-later' })
    router.push('/dashboard')
  }

  const logout = async () => {
    await apiFetch('/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}