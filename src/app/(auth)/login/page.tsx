"use client"
import { useAuthStore } from '@/store/Auth'
import React, { useState } from 'react'

const LoginPage = () => {
    const { login } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const email = data.get("email") as string
        const password = data.get("password") as string
        if (!email || !password) {
            setError("All fields are required")
            setIsLoading(false)
            return
        }
        setIsLoading(true)
        const { success, error } = await login(email, password)
        if (error) {
            setError(error!.message || "Failed to login")
        }
        setIsLoading(false)
    }

  return (

    <div>page</div>

  )
}

export default LoginPage