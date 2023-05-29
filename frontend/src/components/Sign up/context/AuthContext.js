import { useState, createContext, useContext } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ usersData, children }) => {
    const [user, setUser] = useState({})

    return (
        <AuthContext.Provider value={{ user, setUser, usersData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}