import {createContext, ReactNode, useEffect, useState} from "react";

interface ProviderProps {
    accessToken: string,
    setAccessToken: (value: string) => void,
    apiPrefix: string,
    setApiPrefix: (value: string) => void,
    removeAccess: () => void,
}

export const ApiAuthContext = createContext<ProviderProps | null>(null)

export function ApiAuthProvider({children}: { children: ReactNode }) {

    const [apiPrefix, setApiPrefixState] = useState("")
    const [accessToken, setAccessTokenState] = useState("")

    const setApiPrefix = (value: string) => {
        localStorage.setItem("apiPrefix", value)
        setApiPrefixState(value)
    }

    const setAccessToken = (value: string) => {
        localStorage.setItem("accessToken", value)
        setAccessTokenState(value)
    }

    useEffect(() => {

        const accessTokenFromStorage = localStorage.getItem("accessToken")
        if (accessTokenFromStorage) setAccessToken(accessTokenFromStorage)

        const apiPrefixFromStorage = localStorage.getItem("apiPrefix")
        if (apiPrefixFromStorage) setApiPrefix(apiPrefixFromStorage)

    }, []);

    const removeAccess = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("apiPrefix")
        setAccessTokenState("")
        setApiPrefixState("")
    }

    return (
        <ApiAuthContext.Provider value={{accessToken, setAccessToken, apiPrefix, setApiPrefix, removeAccess}}>
            {children}
        </ApiAuthContext.Provider>
    )
}
