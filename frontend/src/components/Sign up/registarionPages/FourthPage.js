import { useEffect } from "react"
import { useRegistration } from "../context/RegistrationContext"
import InputTemplate from "./InputTemplate"

const inputs = [
    {
        title: "Broj telefona", property: "phoneNumber", uniqueCheck: true, textTransform: "none"
    },
    {
        title: "Broj lične karte", property: "idNumber", uniqueCheck: true, textTransform: "none"
    }
]

export const FourthPage = () => {
    const { inputValues, inputStatus, setInputValues, setInputStatus, canGoToNextPage } = useRegistration()
    const { phoneNumber, idNumber, category } = inputStatus

    useEffect(() => {
        canGoToNextPage(phoneNumber, idNumber, category)
    }, [inputValues])

    return (
        <div className="form-group mb-3">
            {inputs.map((input, index) => {
                const { title, property, uniqueCheck, textTransform } = input
                return (
                    <InputTemplate key={index} props={{ title, property, uniqueCheck, textTransform }} />
                )
            })}

            <div>
                <label htmlFor="category" className="form-label">Kategorija</label>
                <select value={inputValues["category"]}
                    onChange={e => {
                        setInputStatus(values => ({ ...values, [e.target.id]: "valid" }))
                        setInputValues(values => ({ ...values, [e.target.id]: e.target.value }))
                    }}
                    className="form-select" id="category" name="category" required>
                    <option value="1">Marketing</option>
                    <option value="2">Programiranje</option>
                    <option value="3">Inženjerstvo</option>
                    <option value="4">Prirodne nauke</option>
                    <option value="5">Video editovanje</option>
                    <option value="6">Web dizajn</option>
                </select>
            </div>
        </div>
    )
}