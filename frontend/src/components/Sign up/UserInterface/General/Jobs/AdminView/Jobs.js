import React, { useState, useEffect } from 'react'
import { METHODS } from '../../../../data/METHODS'
import { useAuth } from '../../../../context/AuthContext'
import Error from '../../../../Error'
import PostedJobs from '../PostingJob/PostedJobs'
import Loading from '../../../../../Custom/Loading'
import PageNavigation from '../../Freelancers/PageNavigation'
import { ShowApplications } from '../PostingJob/PostedJobs'
import { Button } from 'react-bootstrap'

export default function Jobs() {
    const { user } = useAuth()
    const [postedJobs, setPostedJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [lastPage, setLastPage] = useState(0)
    const [openApplication, setOpenApplication] = useState(false)
    const [singleJobDetails, setSingleJobDetails] = useState({})
    const [applicationDeleted, setApplicationDeleted] = useState(false)

    useEffect(() => {
        const getJobs = async () => {
            try {
                const allJobs = await (await fetch(`${METHODS.Advertisement.GetAllWithApplications}`)).json()
                setPostedJobs(allJobs)
                setIsLoading(false)
                setLastPage(Math.ceil(allJobs.length / perPage))
            }
            catch (err) {
                console.log(err)
            }
        }
        getJobs()
    }, [applicationDeleted])

    const deleteAdvertisement = async id => {
        try {
            setIsLoading(true)
            await fetch(`${METHODS.Administrator.DeleteAdvertisement}/${id}`, {
                method: "DELETE"
            })
            setIsLoading(false)
            setApplicationDeleted(v => !v)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (user.type !== "Administrator") {
        return <Error redirect="/user" />
    }

    if (isLoading) {
        return <Loading />
    }

    if (openApplication) {
        return <ShowApplications props={{ singleJobDetails, setOpenApplication, setApplicationDeleted }} />
    }

    return (
        <>

            <PageNavigation props={{ page, setPage, lastPage }} />

            <main>
                <section className="jobs" >
                    <h2>Dostupni poslovi:</h2>
                    <div className="jobs-list">
                        {postedJobs.length === 0 && <h2>Nema odogvarajućih poslova</h2>}

                        {postedJobs.slice((page - 1) * perPage, page * perPage).map((postedJob, index) => {
                            const { advertisement: job, freelancers } = postedJob
                            return (
                                <React.Fragment key={index}>
                                    <li onClick={() => {
                                        setOpenApplication(true)
                                        setSingleJobDetails({ job, freelancers })
                                    }}
                                        className="job-item" key={index} >
                                        <h3>{job.title}</h3>
                                        <p>{job.description}</p>
                                        <p className="company">Postavljeno od {job.employerUserName}</p>
                                    </li>
                                    <Button variant="danger" onClick={() => deleteAdvertisement(job.id)}>
                                        Izbriši oglas
                                    </Button>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}


