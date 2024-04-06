import {createContext, ReactNode, useEffect, useState} from "react";

enum ThemeMode {
    light = "light",
    dark = "dark",
}

interface ProviderProps {
    themeMode: ThemeMode,
    toggleTheme: () => void
}

export const ThemeModeContext = createContext<ProviderProps | null>(null);

export function ThemeModeProvider({children}: { children: ReactNode }) {

    const [themeMode, setThemeMode] = useState(ThemeMode.light)

    useEffect(() => {
        if (localStorage.getItem("theme") === "light") {
            setThemeMode(ThemeMode.light)
        }

        if (localStorage.getItem("theme") === "dark") {
            setThemeMode(ThemeMode.dark)
        }
    }, []);

    const toggleTheme = () => {

        setThemeMode(prevState => {
            const newTheme = prevState === ThemeMode.light ? ThemeMode.dark : ThemeMode.light
            localStorage.setItem("theme", newTheme)
            return newTheme
        })
    }

    return (
        <ThemeModeContext.Provider value={{themeMode, toggleTheme}}>
            {children}
        </ThemeModeContext.Provider>
    )
}

