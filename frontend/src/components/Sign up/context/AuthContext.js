import { useState, createContext, useContext } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ props, children }) => {
    const { freelancers, usersUniqueData, usersData } = props
    // ucitavam ga iz localstorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {})

    return (
        <AuthContext.Provider value={{ user, setUser, usersData, usersUniqueData, freelancers }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}