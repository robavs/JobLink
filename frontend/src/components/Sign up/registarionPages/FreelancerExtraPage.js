import { useEffect } from 'react'
import { useRegistration } from '../context/RegistrationContext'

const options = ["Javascript", "React", "C#", "C++", "Mobilne aplikacije", "Phyton", "AI", "Video editovanje", "Web dizajn", "Logo dizajn", "Photoshop"]

export const FreelancerExtraPage = () => {
    const { inputValues, setInputValues, inputStatus, setInputStatus, canGoToNextPage } = useRegistration()
    const { hourlyRate, skills, experience } = inputStatus

    useEffect(() => {
        canGoToNextPage(hourlyRate, skills, experience)
    }, [inputValues])

    const hourlyRateChange = e => {
        let price = e.target.value
        if (price > 200) price = 200
        price = Math.abs(price)
        setInputStatus(values => ({ ...values, ["hourlyRate"]: price > 0 ? "valid" : "invalid" }))
        setInputValues(values => ({ ...values, ["hourlyRate"]: price }))
    }

    return (
        <div className="form-group mb-3">
            <div id="skills">
                {options.map((option, index) => {
                    const key = option.toLowerCase()
                    return (
                        <div className={`form-check form-check-inline ${index === 0 ? "mt-3" : ""}`} key={key}>
                            <input checked={inputValues["skills"].has(key)}
                                onChange={e => {
                                    const checkedValues = inputValues["skills"]
                                    if (e.target.checked) checkedValues.add(key)
                                    else checkedValues.delete(key)
                                    setInputValues(values => ({ ...values, ["skills"]: checkedValues }))
                                    setInputStatus(values => ({ ...values, ["skills"]: checkedValues.size > 0 ? "valid" : "invalid" }))
                                }}
                                className="form-check-input" type="checkbox" id={`option-${index}`} />
                            <label className="form-check-label" htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    )
                })}
            </div>
            <div>
                <label htmlFor="experience">Prethodno iskustvo:</label>
                <textarea value={inputValues["experience"]}
                    onChange={e => {
                        const textLength = e.target.value.length
                        const status = textLength === 0 ? "empty" : textLength >= 100 ? "valid" : "invalid"

                        setInputValues(values => ({ ...values, [e.target.id]: e.target.value }))
                        setInputStatus(values => ({ ...values, [e.target.id]: status }))
                    }}
                    className={`experience-textarea form-control resize-none ${experience === "empty" ? "" : (experience === "valid" ? "is-valid" : "is-invalid")}`}
                    id="experience" rows="3" maxLength={200}></textarea>

                <div className="valid-feedback">
                    Opis validan!
                </div>
                <div className="invalid-feedback">
                    {`Nedostaje ${100 - inputValues["experience"].length} karaktera`}
                </div>
            </div>

            <div>
                <label htmlFor="hourlyRate" className="form-label">Satnica &#36;</label>
                <input value={inputValues["hourlyRate"]}
                    className="form-control"
                    onChange={e => hourlyRateChange(e)} type="number"
                    id="hourlyRate" placeholder="Satnica" required autoComplete='off' min="5" max="200" />
            </div>
        </div>
    )
}