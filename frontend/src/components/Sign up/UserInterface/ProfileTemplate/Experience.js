import { METHODS } from "../../data/METHODS"
import { useAuth } from "../../context/AuthContext"
import GenericTextAreaTemplate from './GenericTextAreaTemplate'

export default function Experience() {
    const { user } = useAuth()
    const URL = METHODS[user.type].UpdateExperience + `/${user.userName}`

    return (
        <GenericTextAreaTemplate
            props={{
                property: "experience",
                URL,
                className: "editExperienceButtons"
            }}
        />
    )
}
