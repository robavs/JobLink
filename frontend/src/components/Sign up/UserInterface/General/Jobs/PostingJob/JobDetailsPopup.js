import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../../../context/AuthContext'
import Loading from '../../../../../Custom/Loading'
import { METHODS } from '../../../../data/METHODS'
import { Alert, AlertTitle } from '@mui/material'

export default function JobDetailsPopup({ props }) {
    const { user } = useAuth()
    const { setIsJobAdded, jobDetails, setJobDetails, initalJobDetails, setShowJobDetailsPopup } = props
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        setIsPageLoaded(true)
    }, [])

    const handleChange = e => {
        let value = e.target.value
        if (e.target.id === "salary") {
            value = Math.abs(value)
            if (value > 10000) value = 10000
        }
        setJobDetails(values => ({ ...values, [e.target.id]: value }))
        setError("")
        setSuccess("")
    }

    const postJob = async () => {
        if (!jobDetails.title.length || !jobDetails.description.length ||
            !jobDetails.skills.length || !jobDetails.salary) {
            setError("Molimo popunite sva polja")
            return
        }
        try {
            jobDetails["employerUserName"] = user.userName
            jobDetails["employerEmail"] = user.email
            setIsLoading(true)
            await fetch(`${METHODS.Advertisement.Add}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jobDetails)
            })
            setIsLoading(false)
            setIsJobAdded(value => !value)
            setJobDetails(initalJobDetails)
            setSuccess("Uspešno ste se prijavili za posao")
            setError("")
        }
        catch (err) {
            console.log(err)
            setError("Došlo je do greške")
        }
    }

    const cancelPostingJob = () => {
        setJobDetails(initalJobDetails)
        setShowJobDetailsPopup(false)
        setError("")
        setSuccess("")
    }

    if (!isPageLoaded) {
        return <Loading />
    }

    return (
        <div id="overlay" style={{ display: "block" }}>
            <div id="popup" style={{ display: "block" }}>
                {isLoading && <Loading />}

                <form>
                    <label>Naslov posla:</label>
                    <input value={jobDetails["title"]} onChange={handleChange}
                        type="text" id="title" required
                    />
                    <label>Opis posla:</label>
                    <textarea value={jobDetails["description"]} onChange={handleChange}
                        id="description" required="" style={{ width: "360px", height: "82px" }}></textarea>

                    <label>Veštine:</label>
                    <select
                        onChange={e => {
                            setJobDetails(values => ({ ...values, ["skills"]: [...e.target.options].filter(o => o.selected).map(o => o.value).join(",") }))
                            setError("")
                            setSuccess("")
                        }}
                        className="select" multiple>
                        <option value="Javascript">Javascript</option>
                        <option value="React">React</option>
                        <option value="C#">C#</option>
                        <option value="C++">C++</option>
                        <option value="Mobilne aplikacije">Mobilne aplikacije</option>
                        <option value="Phyton">Phyton</option>
                        <option value="AI">AI</option>
                        <option value="Video editovanje">Video editovanje</option>
                        <option value="web dizajn">web dizajn</option>
                        <option value="Logo dizajn">Logo dizajn</option>
                        <option value="Photoshop">Photoshop</option>
                    </select>

                    <label htmlFor="category" className="form-label">Kategorija</label>
                    <select value={jobDetails["category"]}
                        onChange={handleChange}
                        className="form-select" id="category" name="category" required>
                        <option value="Marketing">Marketing</option>
                        <option value="Programiranje">Programiranje</option>
                        <option value="Inženjerstvo">Inženjerstvo</option>
                        <option value="Prirodne nauke">Prirodne nauke</option>
                        <option value="Video editovanje">Video editovanje</option>
                        <option value="Web dizajn">Web dizajn</option>
                    </select>
                    <label>Nudimo:</label>

                    <input value={jobDetails["salary"]} onChange={handleChange}
                        type="number" id="salary" required />

                    {error.length !== 0 &&
                        <Alert severity="error" style={{ margin: "10px" }}>
                            <AlertTitle>Greška</AlertTitle>
                            {error}
                        </Alert>
                    }

                    {success.length !== 0 &&
                        <Alert severity="success" style={{ margin: "10px" }}>
                            <AlertTitle>Uspešno</AlertTitle>
                            {success}
                        </Alert>
                    }

                    <Button onClick={postJob} id="submit-button" variant="success" style={{ height: "40px", width: "90px", padding: "0px" }}>
                        Postavi
                    </Button>
                    <Button onClick={cancelPostingJob} id="cancel-button" variant="danger" style={{ height: "40px", width: "90px", padding: "0px" }}>
                        Otkaži
                    </Button>

                </form>
            </div>
        </div >
    )
}
