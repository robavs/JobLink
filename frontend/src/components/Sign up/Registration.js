import { useState, useEffect } from 'react'
import { FirstPage } from './registarionPages/FirstPage'
import { SecondPage } from './registarionPages/SecondPage'
import { ThirdPage } from './registarionPages/ThirdPage'
import { FourthPage } from './registarionPages/FourthPage'
import { FifthPage } from './registarionPages/FifthPage'
import { FreelancerExtraPage } from './registarionPages/FreelancerExtraPage'
import { METHODS } from './data/METHODS'
import { useRegistration } from './context/RegistrationContext'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../assets/css/registrationForm.css'

const employerForm = [FirstPage, SecondPage, ThirdPage, FourthPage, FifthPage]
const freelancerForm = [...employerForm, FreelancerExtraPage]

export default function Registration() {
    const { initialInputValues, initalInputStatus, inputValues, setInputStatus, setInputValues, areInputsValid } = useRegistration()
    const { user, setUser } = useAuth()
    const [isFreelancer, setIsFreelancer] = useState(false)
    const [isEmployer, setIsEmployer] = useState(false)
    const [page, setPage] = useState(0)
    const [progressBarPercentage, setProgressBarPercentage] = useState(0)
    const [form, setForm] = useState(employerForm) // stranice za prikaz
    const [isLastPage, setIsLastPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // treba da dodam loading state dok se ne upise u bazu i postavi na profilnu stranicu,
    // a isto to treba da uradim i kod login komponente

    useEffect(() => {
        if (Object.keys(user).length != 0) {
            navigate("/dashboard")
            setIsLoading(false)
        }
    }, [user])

    useEffect(() => {
        if (page === 0) {
            setInputValues(initialInputValues)
            setInputStatus(initalInputStatus)
            setIsFreelancer(false)
            setIsEmployer(false)
            setProgressBarPercentage(0)
        }
        else {
            setProgressBarPercentage(page / (isFreelancer ? 6 : 5) * 100)
        }
        setIsLastPage(isFreelancer && page === 6 || isEmployer && page === 5)
    }, [page])


    // post request za upis korisnika u bazu i preusmeravanje na odredjenu stranicu profila
    const userRegistration = async () => {
        try {
            const user = {
                ...inputValues,
                ["skills"]: [...inputValues["skills"]].join(",")
            }
            delete user["profileImage"]
            delete user["passwordCheck"]

            if (isEmployer) {
                delete user["hourlyRate"]
                delete user["skills"]
                delete user["experience"]
            }
            const addUserMethodURL = isFreelancer ? METHODS.Freelancer.Add : METHODS.Employer.Add

            await fetch(addUserMethodURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            // moramo da i dodamo tip jer se on automatski postavlja u kontrolerima
            // jer prilikom registrovanja nece znati kog je tipa, jer koristimo taj objekat
            user["type"] = isFreelancer ? "Freelancer" : "Employer"

            setUser(user)
            setIsLoading(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className={`container border border-primary reg-container-${page == 0 ? "0" : "1"}`}>
                {(page == 0) &&
                    <>
                        <div className="chose-option">
                            <h2>Prijavi se kao:</h2>
                        </div>

                        <div className="btn-freelancer">
                            <button className="btn btn-primary" type="button"
                                onClick={() => {
                                    setPage(1)
                                    setIsFreelancer(true)
                                    setForm(freelancerForm)
                                }}>
                                Radnik
                            </button>
                        </div>
                        <div className="btn-employer">
                            <button className="btn btn-primary" type="button"
                                onClick={() => {
                                    setPage(1)
                                    setIsEmployer(true)
                                    setForm(employerForm)
                                }}>
                                Poslodavac
                            </button>
                        </div>
                    </>
                }
                {page != 0 &&
                    <>
                        <ProgressBar className="progress-bar-container" animated now={progressBarPercentage} />

                        <div className="btn-prev">
                            <button type="button" className="btn btn-danger btn-prev"
                                onClick={() => setPage(page => page - 1)} >
                                Nazad
                            </button>
                        </div>

                        <div className="btn-next">
                            <button type="button" className={`btn ${isLastPage ? "btn-primary" : "btn-success"} btn-next ${areInputsValid ? "" : "disabled"}`}
                                onClick={() => {
                                    if (isLastPage) {
                                        userRegistration()
                                    }
                                    else {
                                        setPage(page => page + 1)
                                    }
                                }}>
                                {isLastPage ? <>Potvrdi</> : <>Napred</>}
                            </button>
                        </div>
                        <div className="Input">
                            {form.map((Page, index) => {
                                if (page === index + 1) return <Page key={index} />
                            })}
                        </div>
                    </>
                }
            </div >
        </ >
    );
}
