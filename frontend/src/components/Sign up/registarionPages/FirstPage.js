import { useEffect } from "react"
import { useRegistration } from "../context/RegistrationContext"
import InputTemplate from "./InputTemplate"

const inputs = [
    {
        title: "Ime", property: "firstName", uniqueCheck: false, textTransform: "capitalize"
    },
    {
        title: "Prezime", property: "lastName", uniqueCheck: false, textTransform: "capitalize"
    },
    {
        title: "Korisničko ime", property: "userName", uniqueCheck: true, textTransform: "none"
    },
    {
        title: "Email", property: "email", uniqueCheck: true, textTransform: "none"
    }
]

export const FirstPage = ({ }) => {
    const { inputValues, inputStatus, canGoToNextPage } = useRegistration()
    const { firstName, lastName, userName, email } = inputStatus

    useEffect(() => {
        canGoToNextPage(firstName, lastName, userName, email)
    }, [inputValues])

    return (
        <div className="form-group mb-3">
            {inputs.map((input, index) => {
                const { title, property, uniqueCheck, textTransform } = input
                return (
                    <InputTemplate key={index} props={{ title, property, uniqueCheck, textTransform }} />
                )
            })}
        </div>
    )
}