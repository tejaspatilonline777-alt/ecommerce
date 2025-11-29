import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, Language } from '../types';

interface ThemeContextType {
    theme: 'light' | 'dark';
    language: Language;
    toggleTheme: () => void;
    setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>({
        theme: 'light',
        language: 'en',
        currency: 'INR',
    });

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme);
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }, [settings]);

    const toggleTheme = () => {
        setSettings((prev) => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light',
        }));
    };

    const setLanguage = (lang: Language) => {
        setSettings((prev) => ({
            ...prev,
            language: lang,
        }));
    };

    const value = {
        theme: settings.theme,
        language: settings.language,
        toggleTheme,
        setLanguage,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
