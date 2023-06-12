import { useState, useEffect } from 'react'
import { useAuth } from "../../../../context/AuthContext"
import Error from "../../../../Error"
import "./jobs.css"
import JobPopup from './JobPopup'
import Loading from '../../../../../Custom/Loading'
import { METHODS } from '../../../../data/METHODS'
import SearchSettings from '../../Freelancers/SearchSettings'

export default function Jobs() {
    const { user } = useAuth()
    const [openJobPopup, setOpenJobPopup] = useState(false)
    const [job, setJob] = useState({})
    const [jobList, setJobList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [sortedJobList, setSortedJobList] = useState([])
    const [signedUpJobs, setSignedUpJobs] = useState([]) // lista oglasa na koje se prijavio

    useEffect(() => {
        const getJobs = async () => {
            try {
                const jobs = await ((await fetch(`${METHODS.Advertisement.GetAll}`)).json())
                const alreadySignedUpJobs = await (
                    (await fetch(`${METHODS.Freelancer.SingedUpJobs}/${user.userName}`)).json()
                )
                setSignedUpJobs(alreadySignedUpJobs)
                setJobList(jobs)
                setIsLoading(false)
            }
            catch (err) {
                console.log(err)
            }
        }
        getJobs()
    }, [])

    if (user.type !== "Freelancer") {
        return <Error redirect="/user" />
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <SearchSettings props={{
                "listItems": jobList,
                "original": jobList,
                page,
                setPage,
                perPage,
                setPerPage,
                setIsLoading,
                "sortedListItems": sortedJobList,
                "setSortedListItems": setSortedJobList,
                "type": "jobs"
            }} />

            {openJobPopup && <JobPopup
                props={{ setOpenJobPopup, job, setJob, signedUpJobs, setSignedUpJobs }} />}

            <main>
                <section className="jobs" >
                    <h2>Dostupni poslovi:</h2>
                    <div className="jobs-list">
                        {sortedJobList.length === 0 && <h2>Nema odogvarajućih poslova</h2>}

                        {sortedJobList.slice((page - 1) * perPage, page * perPage).map((job, index) => {
                            return (
                                <li onClick={() => {
                                    setOpenJobPopup(true)
                                    setJob(job)
                                }}
                                    className="job-item" key={index} >
                                    <h3>{job.title}</h3>
                                    <p>{job.description}</p>
                                    <p className="company">Postavljeno od {job.employerUserName}</p>
                                </li>
                            )
                        })}
                    </div>
                </section>
            </main>
        </>

    )
}
