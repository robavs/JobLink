import { METHODS } from "../../data/METHODS"
import { useAuth } from "../../context/AuthContext"
import GenericTextAreaTemplate from './GenericTextAreaTemplate'


export default function Education() {
    const { user } = useAuth()
    const URL = METHODS[user.type].UpdateEducation + `/${user.userName}`

    return (
        <GenericTextAreaTemplate
            props={{
                property: "education",
                URL,
                className: "editEducationButtons"
            }}
        />
    )
}
