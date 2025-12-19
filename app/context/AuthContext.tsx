'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('simulated_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user from storage', e);
                localStorage.removeItem('simulated_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        const newUser = { email, name: email.split('@')[0] };
        setUser(newUser);
        localStorage.setItem('simulated_user', JSON.stringify(newUser));
        router.push('/dashboard');
        router.refresh(); // Refresh to update server components if needed
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('simulated_user');
        router.push('/');
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
