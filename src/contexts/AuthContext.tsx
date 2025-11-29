import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Address } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    addresses: Address[];
    addAddress: (address: Omit<Address, 'id' | 'userId'>) => void;
    updateAddress: (id: string, address: Partial<Address>) => void;
    deleteAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedAddresses = localStorage.getItem('addresses');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedAddresses) {
            setAddresses(JSON.parse(savedAddresses));
        }
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Save addresses to localStorage
    useEffect(() => {
        localStorage.setItem('addresses', JSON.stringify(addresses));
    }, [addresses]);

    const login = async (email: string, password: string) => {
        // Mock login - in real app, this would call an API
        const mockUser: User = {
            id: 'user-' + Date.now(),
            email,
            name: email.split('@')[0],
            createdAt: new Date(),
        };
        setUser(mockUser);
    };

    const register = async (name: string, email: string, password: string) => {
        // Mock registration - in real app, this would call an API
        const mockUser: User = {
            id: 'user-' + Date.now(),
            email,
            name,
            createdAt: new Date(),
        };
        setUser(mockUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateProfile = (data: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...data });
        }
    };

    const addAddress = (address: Omit<Address, 'id' | 'userId'>) => {
        if (!user) return;

        const newAddress: Address = {
            ...address,
            id: 'addr-' + Date.now(),
            userId: user.id,
        };

        setAddresses([...addresses, newAddress]);
    };

    const updateAddress = (id: string, addressData: Partial<Address>) => {
        setAddresses(addresses.map(addr =>
            addr.id === id ? { ...addr, ...addressData } : addr
        ));
    };

    const deleteAddress = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const setDefaultAddress = (id: string) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
        })));
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
