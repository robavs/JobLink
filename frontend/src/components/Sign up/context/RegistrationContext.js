import { useState, useRef, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { REG_EXP, initialInputValues, initalInputStatus } from "../data/constants";

const RegistrationContext = createContext(null)

export const RegistrationProvider = ({ children }) => {
    // objekat koji cuva vrednosti input polja, pri cemu se koriste refovi
    // za cuvanje podataka kako bi smo izbegli rerenderovanja jer je input forma velika
    const [areInputsValid, setAreInputsValid] = useState(false)
    const [inputValues, setInputValues] = useState(initialInputValues)
    const [inputStatus, setInputStatus] = useState(initalInputStatus)
    const { usersUniqueData } = useAuth()

    const changeValueAndStatus = (e, uniqueCheck = false) => {
        let status = ""
        let value = e.target.value
        const property = e.target.id

        if (property === "firstName" || property === "lastName") {
            value = value.charAt(0).toUpperCase() + value.slice(1)
        }

        if (value.length === 0) status = "empty"

        else if (REG_EXP[property].test(value)) {
            if (uniqueCheck) {
                const isUnique = usersUniqueData.some(user => user[property] === value)
                status = isUnique ? "exists" : "valid"
            }
            else status = "valid"
        }

        else status = "invalid"

        setInputValues(values => ({ ...values, [property]: value }))
        setInputStatus(values => ({ ...values, [property]: status }))
    }

    // funkcija koja prima porizvoljan broj input status vrednosti i ukoliko su sve validne
    // setuje da je da su inputi validni i da moze da se predje na sledecu stranicu a poziva se
    // u useEffectu na svaku promenu vrednosti inputa

    function canGoToNextPage(...statuses) {
        setAreInputsValid(statuses.every(status => status === "valid"))
    }

    return (
        <RegistrationContext.Provider
            value={{
                initialInputValues,
                initalInputStatus,
                setInputValues,
                setInputStatus,
                areInputsValid,
                setAreInputsValid,
                changeValueAndStatus,
                inputValues,
                inputStatus,
                canGoToNextPage
            }}
        >
            {children}
        </RegistrationContext.Provider>
    )
}

export const useRegistration = () => {
    return useContext(RegistrationContext)
}