import { useState, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext()

export const UserProvider = ({ isUpdating, setIsUpdating, children }) => {
    const { user, setUser } = useAuth()

    const updateRequest = async (URL, updatedValue, setProperty, propertyName) => {
        try {
            user[propertyName] = updatedValue
            setUser(user)
            const res = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedValue)
            }
            )
            // kad je lozinka ne zelim da updejtujem state varijablu
            if (propertyName !== "password") {
                setProperty(updatedValue)
            }

            setIsUpdating(false)
            localStorage.setItem("user", JSON.stringify(user))
            return res.status
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <UserContext.Provider
            value={{
                isUpdating,
                setIsUpdating,
                updateRequest
            }}
        >
            {children}
        </UserContext.Provider>)
}

export const useUser = () => {
    return useContext(UserContext)
}