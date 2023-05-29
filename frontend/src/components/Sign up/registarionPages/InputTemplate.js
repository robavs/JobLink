import { useRegistration } from "../context/RegistrationContext"

const InputTemplate = ({ props }) => {
    const { changeValueAndStatus, inputStatus, inputValues } = useRegistration()
    const { title, property, uniqueCheck, textTransform, verifyPassword } = props

    return (
        <div>
            <label htmlFor={property} className="form-label">{title}</label>

            <input
                value={inputValues[property]}
                onChange={e => {
                    if (property === "password" || property === "confirmPassword") {
                        verifyPassword(e)
                    }
                    else {
                        changeValueAndStatus(e, uniqueCheck)
                    }
                }}
                className={`form-control ${inputStatus[property] === 'empty' ? '' : (inputStatus[property] === 'valid' ? 'is-valid' : 'is-invalid')}`}
                type={`${property === "password" || property === "confirmPassword" ? "password" : "text"}`}
                id={property} placeholder={title} required autoComplete='off'
                style={{ textTransform: textTransform }}
            />

            <div className="valid-feedback">
                {property === "confirmPassword" ? "Lozinke se podudaraju" : `${title} validno`}
            </div>

            <div className="invalid-feedback">
                {property === "confirmPassword" ? <>Lozinke se ne podudaraju</> :
                    uniqueCheck && inputStatus[property] === "exists" ?
                        <>{title} je zauzeto</> :
                        <>{title} nije validno</>
                }
            </div>
        </div>
    )
}

export default InputTemplate
