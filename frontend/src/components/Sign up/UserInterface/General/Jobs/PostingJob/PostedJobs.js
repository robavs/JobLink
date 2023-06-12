import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { METHODS } from "../../../../data/METHODS"
import userEvent from "@testing-library/user-event"
import { useAuth } from "../../../../context/AuthContext"
import Loading from "../../../../../Custom/Loading"
import { Button } from "react-bootstrap"

export default function PostedJobs({ props }) {
    const { postedJobs, setPostedJobs } = props
    const [openApplication, setOpenApplication] = useState(false)
    const [singleJobDetails, setSingleJobDetails] = useState({})

    if (!postedJobs.length) {
        return <h2>Nemate nijedan aktivan oglas</h2>
    }

    return (
        <>
            {openApplication && <ShowApplications props={{ singleJobDetails, setOpenApplication }} />}

            <div className="active-jobs">
                <h2 style={{ marginBottom: "25px" }}>Ovo su Vaši trenutni aktivni oglasi:</h2>
                {postedJobs.map((postedJob, index) => {
                    const { advertisement: job, freelancers } = postedJob
                    return (
                        <div className="job-card" key={index} onClick={() => {
                            setOpenApplication(true)
                            setSingleJobDetails({ job, freelancers })
                        }}>
                            <h3 className="job-title"> {job.title} </h3>
                            <p>{job.userName}</p>
                            <p className="job-description">{job.description}</p>
                            <p>Nudimo: {job.salary}$</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export function ShowApplications({ props }) {
    const { user } = useAuth()
    let { job, freelancers } = props.singleJobDetails
    const [isDeleting, setIsDeleting] = useState(false)
    const [list, setList] = useState(freelancers)
    const navigate = useNavigate()

    useEffect(() => {
    }, [list])

    const deleteApplication = async userName => {
        try {
            setIsDeleting(true)
            await fetch(`${METHODS.Administrator.DeleteApplication}/${job.id}/${userName}`, {
                method: "DELETE",
            })
            const listCopy = [...list].filter((f) => f.userName !== userName)
            setList(listCopy)
            setIsDeleting(false)
            props.setApplicationDeleted(v => !v)
        } catch (err) {
            console.log(err)
        }
    }

    const goToProfile = (userName) => {
        navigate(`/user/freelancers/${userName}`)
    }

    return (
        <div id="overlay2" style={{ display: "block" }}>

            {isDeleting && <Loading />}

            <div id="popup2" style={{ display: "block", height: !list.length ? "auto" : "100%" }}>
                <h2>Oglas:</h2>
                <div className="job-details">
                    <p>{job.employerUserName}</p>
                    <p>{job.title}</p>
                    <p>{job.description}</p>
                    <p>Ponuda: {job.salary}$</p>
                </div>
                <h3>
                    {!list.length ?
                        <>
                            Trenutno se niko nije prijavio na dati oglas
                        </>
                        :
                        <>
                            Prijavljeni freelanceri:
                        </>
                    }
                </h3>
                {list.length !== 0 &&
                    <>
                        {list.map((freelancer, index) => {
                            return (
                                <div className="freelancer-item" key={index}>
                                    <Link to={`/user/freelancers/${freelancer.userName}`}>
                                        <img src={freelancer.imgSrc} alt="profilna-slika"
                                            style={{ width: "50px", height: "50px", borderRadius: "50%", marginLeft: "10px" }} />
                                    </Link>

                                    <Link to={`/user/freelancers/${freelancer.userName}`} style={{ color: "black" }}>
                                        <span className="freelancer-name">
                                            {freelancer.firstName} {freelancer.lastName} @{freelancer.userName}
                                        </span>
                                    </Link>

                                    <ul className="freelancer-details">
                                        <li>Satnica: {freelancer.hourlyRate}$</li>
                                        <li>Veštine: {freelancer.skills}</li>
                                        <li>Prijava: {freelancer.application}</li>
                                    </ul>
                                    <Button
                                        variant={`${user.type === "Employer" ? "success" : "danger"}`}
                                        className="send-message-button"
                                        onClick={() => {
                                            if (user.type === "Employer") {
                                                goToProfile(freelancer.userName)
                                            }
                                            else if (user.type === "Administrator") {
                                                deleteApplication(freelancer.userName)
                                            }
                                        }}>
                                        {user.type === "Employer" ? "Pogledaj profil" : "Obriši apliciranje"}
                                    </Button>
                                </div >
                            )
                        })}
                    </>
                }

                <button className="btn-close close-button" onClick={() => props.setOpenApplication(false)}>

                </button>
            </div>
        </div >
    )
}