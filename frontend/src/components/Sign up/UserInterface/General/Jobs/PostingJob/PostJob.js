import { useState, useEffect } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import Error from '../../../../Error'
import Button from 'react-bootstrap/Button'
import JobDetailsPopup from './JobDetailsPopup'
import PostedJobs from './PostedJobs'
import { METHODS } from '../../../../data/METHODS'
import './postJob.css'
import Loading from '../../../../../Custom/Loading'

const initalJobDetails = {
    title: "",
    description: "",
    category: "Marketing",
    skills: [],
    salary: ""
}

export default function PostJob() {
    const { user } = useAuth()
    const [jobDetails, setJobDetails] = useState(initalJobDetails)
    const [showJobDetalisPopup, setShowJobDetailsPopup] = useState(false)
    const [postedJobs, setPostedJobs] = useState([])
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [isJobAdded, setIsJobAdded] = useState(false)

    useEffect(() => {
        const getPostedJobs = async () => {
            try {
                const jobs = await (await fetch(`${METHODS.Employer.PostedJobs}/${user.userName}`)).json()
                setPostedJobs(jobs)
                setIsPageLoaded(true)
                console.log(jobs)
            }
            catch (err) {
                console.log(err)
            }
        }
        getPostedJobs()
    }, [isJobAdded])

    if (user.type !== "Employer") {
        return <Error redirect="/user" />
    }

    if (!isPageLoaded) {
        return <Loading />
    }
    return (
        <>
            <div className="window"><label id="primer2">
                Raspišite konkurs za novi posao koji nudite.
            </label>
                <Button onClick={() => setShowJobDetailsPopup(true)} id="post-job-button">
                    Postavi posao
                </Button>
            </div>

            {showJobDetalisPopup && <JobDetailsPopup props={{ setIsJobAdded, jobDetails, setJobDetails, initalJobDetails, setShowJobDetailsPopup }} />}

            <PostedJobs props={{ postedJobs, setPostedJobs }} />
        </>
    )
}
