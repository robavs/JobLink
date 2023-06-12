import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { REG_EXP } from '../../data/constants';
import { METHODS } from '../../data/METHODS';
import Loading from '../../../Custom/Loading'

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
}

const initalPasswords = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
}

const inputForm = [
    { name: "Trenutna lozinka", property: "currentPassword" },
    { name: "Nova lozinka", property: "newPassword" },
    { name: "Potvrdi lozinku", property: "confirmPassword" }
]

export default function ChangePassword({ props }) {
    const { openChangePasswordDialog, setOpenChangePasswordDialog } = props
    const { user } = useAuth()
    const { updateRequest } = useUser()

    const [passwords, setPasswords] = useState(initalPasswords)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [updatingPassword, setUpdatingPassword] = useState(false)

    const updatePassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwords

        if (!currentPassword.length) {
            return setError("Unesite trenutnu lozinku")
        }

        if (newPassword !== confirmPassword) {
            return setError("Lozinke moraju da se podudaraju")
        }

        if (!REG_EXP.password.test(newPassword)) {
            return setError("Lozinka mora da sadrži minimum 8 karaktera, jedno veliko i malo slovo, specijani karakter i broj")
        }

        if (newPassword === currentPassword) {
            return setError("Nova lozinka mora da bude drugacija od stare")
        }

        setUpdatingPassword(true)
        const URL = METHODS[user.type].UpdatePassword + `/${user.userName}/${currentPassword}/${newPassword}`
        const res = await updateRequest(URL, newPassword, setPasswords, "password") // setPasswords se ne updejtuje

        if (res === 200) {
            setSuccess("Uspešno ste promenili lozinku!")
            setPasswords(initalPasswords)
        }
        else {
            setError("Niste uneli ispravnu lozinku. Molimo unesite ispravnu!")
        }
        setUpdatingPassword(false)
    }


    return (
        <div>
            <Modal
                open={openChangePasswordDialog}
                onClose={() => setOpenChangePasswordDialog(false)}
            >
                <Box sx={style}>

                    {inputForm.map((input) => {
                        const { name, property } = input
                        return (
                            <React.Fragment key={name}>
                                <label style={{ margin: "5px" }}>{name}</label>
                                <input
                                    value={passwords[property]}
                                    onChange={e => {
                                        setPasswords(passwords => ({ ...passwords, [property]: e.target.value }))
                                        setError("")
                                        setSuccess("")
                                    }}
                                    className="form-control"
                                    type="password" required autoComplete='off' placeholder={name}
                                />
                            </React.Fragment>
                        )
                    })}

                    {updatingPassword && <Loading />}

                    {error.length !== 0 &&
                        <Alert severity="error" style={{ margin: "10px" }}>
                            {error}
                        </Alert>
                    }

                    {success.length !== 0 &&
                        <Alert severity="success" style={{ margin: "10px" }}>
                            {success}
                        </Alert>
                    }

                    <Button
                        onClick={updatePassword}
                        variant='success'
                        style={{ marginTop: "10px" }}>
                        Potvrdi
                    </Button>

                    <button className="btn-close close-button"
                        onClick={() => {
                            setOpenChangePasswordDialog(false)
                        }}></button>
                </Box>
            </Modal>
        </div >
    );
}
