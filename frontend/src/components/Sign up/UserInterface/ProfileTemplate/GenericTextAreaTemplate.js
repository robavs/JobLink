import { useState, useEffect } from "react"
import EditButtons from "./EditButtons"
import EditTextArea from "./EditTextArea"
import { useUser } from "../../context/UserContext"
import { useAuth } from "../../context/AuthContext"

// const URL = METHODS[user.type].UpdateEducation + `/${user.userName}`
// Template za updejtovanje iskustva i edukacije
// mozda ce u budnocsnoti trebati za jos nesto

const GenericTextAreaTemplate = ({ props }) => {
    const { property, URL, className } = props
    const { user } = useAuth()
    const { updateRequest, setIsUpdating } = useUser()
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState("")

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setValue(user[property])
            setIsUpdating(false)
        }
    }, [user])

    const update = () => {
        if (value !== user[property]) {
            updateRequest(URL, value, setValue, property)
            setIsUpdating(true)
        }
        setEditMode(false)
    }

    const abort = () => {
        setEditMode(false)
        setValue(user[property])
    }

    const edit = () => {
        setEditMode(true)
    }

    return (
        <>
            <EditTextArea
                editMode={editMode}
                value={value}
                setValue={setValue}
                property={property}
            />

            <div className={className}>
                <EditButtons
                    editMode={editMode}
                    update={update}
                    abort={abort}
                    edit={edit}
                />
            </div>
        </>
    )
}

export default GenericTextAreaTemplate
