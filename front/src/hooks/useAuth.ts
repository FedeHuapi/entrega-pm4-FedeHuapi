import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(!!token)
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        router.push('/login')
    }

    return {
        isAuthenticated,
        logout,
    }
}