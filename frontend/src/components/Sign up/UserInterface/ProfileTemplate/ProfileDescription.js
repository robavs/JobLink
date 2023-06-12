import { useState, useEffect } from 'react'
import EditButtons from './EditButtons'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import EditTextArea from './EditTextArea'
import { METHODS } from '../../data/METHODS'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../..//context/UserContext'

const ProfileDescription = () => {
    const { user } = useAuth()
    const { updateRequest, setIsUpdating } = useUser()
    const [editProfileMode, setEditProfileMode] = useState(false)
    const [biography, setBiography] = useState("")
    const [imgSrc, setImgSrc] = useState("")
    const [hourlyRate, setHourlyRate] = useState(0)
    const [isNewImageSelected, setIsNewImageSelected] = useState(false)

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setBiography(user.biography)
            setImgSrc(user.imgSrc)
            setHourlyRate(user.hourlyRate)
            setIsUpdating(false)
        }
    }, [user])

    const imageChange = e => {
        const fileReader = new FileReader()

        if (e.target.files.length > 0) {
            const file = e.target.files[0]

            fileReader.readAsDataURL(file)
            fileReader.addEventListener("loadend", () => {
                // sluzi samo za trenutni prikaz slike
                setImgSrc(fileReader.result)
                setIsNewImageSelected(true)
            })
        }
    }

    // namerno nisam pravio genericke funkcije za updejt jer bih morao da saljem mnogo parametara
    // i ne bi bilo pregledno
    const update = async () => {
        const biographyURL = METHODS[user.type].UpdateBiography + `/${user.userName}`
        const hourlyRateURL = METHODS.Freelancer.UpdateHourlyRate + `/${user.userName}/${hourlyRate}`
        const profilePictureURL = METHODS[user.type].UpdateProfilePicture + `/${user.userName}`

        const requests = []

        if (biography !== user.biography) {
            updateRequest(biographyURL, biography, setBiography, "biography")
            setIsUpdating(true)
        }

        if (hourlyRate !== user.hourlyRate) {
            updateRequest(hourlyRateURL, hourlyRate, setHourlyRate, "hourlyRate")
            setIsUpdating(true)
        }

        if (isNewImageSelected) {
            updateRequest(profilePictureURL, imgSrc, setImgSrc, "imgSrc")
            setIsUpdating(true)
        }
    }

    const abort = () => {
        setEditProfileMode(false)
        setBiography(user.biography)
        setHourlyRate(user.hourlyRate)
        setImgSrc(user.imgSrc)
        setIsNewImageSelected(false)
    }

    const edit = () => {
        setEditProfileMode(true)
        setIsNewImageSelected(false)
    }

    return (
        <div className="profile-description">
            {/*--------------Profilna slika----------------*/}
            <div className="image" >
                <img src={imgSrc} />
                {editProfileMode &&
                    <>
                        <label htmlFor="file-upload" className="custom-file-upload" style={{ marginTop: "5px" }}>
                            <BsFillCloudUploadFill />
                        </label>
                        <input id="file-upload" type="file" accept="image/png, image/jpeg"
                            onChange={imageChange} />
                    </>
                }
            </div>

            {/*--------------Biografija----------------*/}
            <EditTextArea
                editMode={editProfileMode}
                value={biography}
                setValue={setBiography}
                property="biography"
            />

            {/*--------------Opšte informacije----------------*/}
            <div className="info">
                <div className="firstName">
                    {user.firstName} {user.lastName}
                </div>

                <div className="userName">
                    @{user.userName} {user.country}
                </div>

                <div className="email">
                    {user.email}
                </div>

                {/*Satnicu imamo samo kod freelancera */}
                {
                    user.type === "Freelancer" &&
                    <>
                        {
                            editProfileMode ?
                                <input
                                    value={hourlyRate}
                                    onChange={e => setHourlyRate(e.target.value > 200 ? 200 : Math.abs(e.target.value))}
                                    className="form-control hourlyRate"
                                    type="number"
                                    required autoComplete='off'
                                />
                                :
                                <div className="hourlyRate">
                                    {user.hourlyRate}$
                                </div>
                        }
                    </>
                }
            </div>

            {/*--------------Dugmici za editovanje----------------*/}
            <div className="dugmici" style={{ justifyContent: editProfileMode ? "" : "flex-end" }}>
                <EditButtons
                    editMode={editProfileMode}
                    update={update}
                    abort={abort}
                    edit={edit}
                />
            </div>

        </div>
    )
}

export default ProfileDescription
