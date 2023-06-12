
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ChangePassword from './ChangePassword';

export default function Sidebar() {
    const { setUser } = useAuth()
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("user")
        setUser({})
        navigate("/signup/login")
    }

    return (
        <>
            {openChangePasswordDialog &&
                <ChangePassword
                    props={{
                        openChangePasswordDialog,
                        setOpenChangePasswordDialog
                    }} />
            }
            <div className="sidebar">
                <div className="item" onClick={() => setOpenChangePasswordDialog(true)}>
                    Promeni lozinku
                </div>
                <div className="item" onClick={logout}>
                    Odjavi se
                </div>
            </div>

        </>
    )
}

