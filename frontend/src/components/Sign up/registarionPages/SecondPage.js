import { useEffect } from "react"
import { useRegistration } from "../context/RegistrationContext"
import InputTemplate from "./InputTemplate"
import { REG_EXP } from "../data/constants"

const inputs = [
    {
        title: "Lozinka", property: "password", uniqueCheck: false, textTransform: "none"
    },
    {
        title: "Potvrdi lozinku", property: "confirmPassword", uniqueCheck: false, textTransform: "none"
    }
]
export const SecondPage = () => {
    const { inputValues, inputStatus, setInputValues, setInputStatus, setAreInputsValid, canGoToNextPage } = useRegistration()
    const { password, confirmPassword, gender, birthDate } = inputStatus

    useEffect(() => {
        canGoToNextPage(password, confirmPassword, gender, birthDate)
    }, [inputValues])

    const isValidBirthDate = e => {
        const birthday = new Date(e.target.value)
        const now = new Date()
        const YEARS_TO_MILISECONDS = 86400 * 1000 * 365.25

        const difference = (now - birthday) / YEARS_TO_MILISECONDS
        const validBirthday = difference > 18 && difference < 70
        const status = validBirthday ? "valid" : "invalid"

        setInputValues(values => ({ ...values, [e.target.id]: e.target.value }))
        setInputStatus(values => ({ ...values, [e.target.id]: status }))
    }

    const verifyPassword = e => {
        const password = e.target.value
        const property = e.target.id

        // ako je lozinka prazna odma se setuje na empty value
        if (password.length === 0) {
            setInputStatus(values => ({ ...values, [property]: "empty" }))
        }
        else {
            if (property === "password") {
                // Ukoliko je REG_EXP tacan onda stavljamo da je vrednost validna
                const status = REG_EXP[property].test(password) ? "valid" : "invalid"
                setInputStatus(values => ({ ...values, [property]: status }))

                // azuriramo i stanje confirm password prilikom menjanja lozinke
                if (inputValues["confirmPassword"].length !== 0) {
                    const arePasswordsSame = password === inputValues["confirmPassword"] ? "valid" : "invalid"
                    setInputStatus(values => ({ ...values, ["confirmPassword"]: arePasswordsSame }))
                }
            }
            // da bi confirmPassword imala validnu vrenodst mora i da se poklapa sa password i da se poklapa sa REGEXP
            else {
                const status = REG_EXP["confirmPassword"].test(password) && password === inputValues["password"] ? "valid" : "invalid"
                setInputStatus(values => ({ ...values, ["confirmPassword"]: status }))
            }
        }
        setInputValues(values => ({ ...values, [property]: password }))
    }

    return (
        <div className="form-group mb-3">

            {inputs.map((input, index) => {
                const { title, property, uniqueCheck, textTransform } = input
                return (
                    <InputTemplate key={index} props={{ title, property, uniqueCheck, textTransform, verifyPassword }} />
                )
            })}

            <div>
                <label htmlFor="gender" className="form-label">Pol</label>
                <select value={inputValues["gender"]}
                    className="form-select" aria-label="Pol" id="gender"
                    onChange={e => {
                        setInputValues(values => ({ ...values, [e.target.id]: e.target.value }))
                    }}>
                    <option value="M">Muški</option>
                    <option value="F">Ženski</option>
                </select>
            </div>
            <div>
                <label htmlFor="birthDate" className="form-label">Datum rođenja</label>
                <input value={inputValues["birthDate"]}
                    onChange={e => isValidBirthDate(e)}
                    className={`form-control ${birthDate === 'empty' ? '' : (birthDate === 'valid' ? 'is-valid' : 'is-invalid')}`}
                    type="date" id="birthDate" placeholder="Datum Rođenja" required autoComplete='off' />
                <div className="valid-feedback">
                    Datum rođenja validan!
                </div>
                <div className="invalid-feedback">
                    Nevalidan datum!
                </div>
            </div>
        </div>
    )
}