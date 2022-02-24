import React from "react"
import { User } from "../state/user/@types"

type AuthContextValues = {
    user: User
}

const AuthContext = React.createContext<AuthContextValues | undefined>(undefined)

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({children}: AuthProviderProps) {

    return (
        <AuthContext.Provider value={undefined}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuthContext() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error("auth context must be used within an AuthProvider")
    }
    return context
}

export {AuthProvider, useAuthContext}