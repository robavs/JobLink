import ProfileDescription from '../ProfileTemplate/ProfileDescription'
import Experience from '../ProfileTemplate/Experience'
import Education from '../ProfileTemplate/Education'
import Sidebar from '../ProfileTemplate/Sidebar'
import '../../../../assets/css/profile.css'

export default function Profile() {
    return (
        <>
            <div className="profile">
                <ProfileDescription />

                <Sidebar />

                <Experience />

                <Education />
            </div>
        </>
    )
}
