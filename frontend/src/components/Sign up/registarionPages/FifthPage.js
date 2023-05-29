import { useState, useEffect } from 'react'
import { useRegistration } from '../context/RegistrationContext'

export const FifthPage = () => {
    const { inputValues, setInputValues, inputStatus, setInputStatus, canGoToNextPage } = useRegistration()
    const { biography } = inputStatus

    useEffect(() => {
        canGoToNextPage(biography)
    }, [inputValues])

    const imageChange = e => {
        const fileReader = new FileReader()

        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            fileReader.readAsDataURL(file)

            fileReader.addEventListener('loadend', () => {
                setInputValues(values => ({ ...values, ["imgSrc"]: fileReader.result }))
            })
        }
    }

    return (
        <div className="form-group mb-3">
            <div>
                <label htmlFor="profileImage" className="form-label">Profilna slika:</label>
                <input onChange={imageChange} type="file" className="form-control" id="profileImage" placeholder="Broj lične karte" accept="image/png, image/jpeg" />
                <img src={inputValues["imgSrc"]} width="100" height="100" id="imgSrc" />
            </div>
            <div>
                <label htmlFor="biography">Opis profila:</label>
                <textarea
                    value={inputValues["biography"]}
                    onChange={e => {
                        const textLength = e.target.value.length
                        const status = textLength === 0 ? "empty" : textLength >= 100 ? "valid" : "invalid"

                        setInputValues(values => ({ ...values, [e.target.id]: e.target.value }))
                        setInputStatus(values => ({ ...values, [e.target.id]: status }))
                    }}

                    className={`biography-textarea form-control resize-none ${biography === "empty" ? "" : (biography === "valid" ? "is-valid" : "is-invalid")}`}
                    id="biography" rows="3" maxLength={200}></textarea>

                <div className="valid-feedback">
                    Opis validan!
                </div>
                <div className="invalid-feedback">
                    {`Nedostaje ${100 - inputValues["biography"].length} karaktera`}
                </div>
            </div>
        </div>
    )
}