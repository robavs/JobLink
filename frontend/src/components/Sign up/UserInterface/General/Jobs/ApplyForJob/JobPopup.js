import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../../../context/AuthContext'
import { METHODS } from '../../../../data/METHODS'
import { Alert } from '@mui/material'
import Loading from '../../../../../Custom/Loading'

export default function JobPopup({ props }) {
    const { user } = useAuth()
    const { setOpenJobPopup, job, setJob, signedUpJobs, setSignedUpJobs } = props
    const [application, setApplication] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isApplying, setIsApplying] = useState(false)
    const [previousApplication, setPreviousApplication] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const isSignedUpForJob = () => {
            let myApplication
            for (let myJob of signedUpJobs) {
                if (myJob.advertisement.id === job.id) {
                    myApplication = myJob.application
                    break
                }
            }
            if (myApplication) {
                setPreviousApplication(myApplication)
            }
        }
        isSignedUpForJob()
        setIsLoading(false)
    }, [])

    const submitApply = async () => {
        if (application.length < 99) {
            return setErrorMessage("Polje za apliciranje mora imati minimalno 100 karaktera")
        }

        try {
            setIsApplying(true)
            const res = await fetch(`${METHODS.Freelancer.JobApplication}/${user.userName}/${job.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(application)
            })

            if (res.ok) {
                setSuccessMessage("Uspešno ste se prijavili za posao")
                setApplication("")
                setPreviousApplication(application)
                setSignedUpJobs(prevJobs => [...prevJobs, { "advertisement": job, "application": application }])
            }
            else {
                setErrorMessage("Došlo je do greške")
            }
        }
        catch (err) {
            setErrorMessage("Došlo je do greške")
            console.log(err)
        }
        setIsApplying(false)
    }

    const cancelApply = () => {
        setOpenJobPopup(false)
        setJob({})
    }


    return (
        <div className="job-popup job-popup-active" id="job-popup-1">
            {isLoading ? <Loading /> :
                <>
                    {isApplying && <Loading />}
                    <h3>{job.title}</h3>
                    <p>Nudimo: {job.salary}$ </p>
                    <p className="company">Postavljeno od: {job.employerUserName}</p>
                    <p>{job.description}1</p><form>
                        <label htmlFor="apply-textarea">
                            {previousApplication.length === 0 ? "Apliciraj" : "Vaša prijava"}
                        </label>
                        {
                            previousApplication.length !== 0 ?
                                <div >
                                    {previousApplication}
                                </div>
                                :
                                <div style={{ position: "relative" }}>
                                    <textarea
                                        value={application}
                                        onChange={e => {
                                            setApplication(e.target.value)
                                            setErrorMessage("")
                                            setSuccessMessage("")
                                        }}
                                        id="apply-textarea" name="apply-textarea" maxLength="500">
                                    </textarea>
                                    <div className="char-counter">
                                        Preostalo {500 - application.length} karaktera
                                    </div>
                                </div>

                        }


                        {errorMessage.length !== 0 &&
                            <Alert severity="error" style={{ marginTop: "10px" }}>
                                {errorMessage}
                            </Alert>
                        }

                        {successMessage.length !== 0 &&
                            <Alert severity="success" style={{ marginTop: "10px" }}>
                                {successMessage}
                            </Alert>
                        }
                        {previousApplication.length === 0 &&
                            <>
                                <Button onClick={submitApply} variant="info" className="apply-btn" style={{ width: "90px", height: "40px" }}>Apliciraj</Button>
                                <Button onClick={cancelApply} variant="danger" className="cancel-btn" style={{ width: "90px", height: "40px" }}>Odustani</Button>
                            </>
                        }

                        <button className="btn-close close-button" onClick={cancelApply}></button>

                    </form >
                </>
            }
        </div >
    )
}
