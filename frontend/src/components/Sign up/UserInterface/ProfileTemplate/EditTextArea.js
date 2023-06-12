import React from 'react'
import { useAuth } from '../../context/AuthContext'

const EditTextArea = ({ editMode, value, setValue, property }) => {
    const { user } = useAuth() // usera treba da importujem iz nekog konktestka /vrv user Context

    return (
        <div className={property}>
            <h3 className="title">
                {property}
            </h3>

            {editMode ?
                <textarea
                    className="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                >
                </textarea>
                :
                <div className="text">
                    {user[property]}
                </div>
            }
        </div>
    )
}

export default EditTextArea
