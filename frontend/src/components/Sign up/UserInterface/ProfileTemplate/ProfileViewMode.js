import React from 'react'
import '../../../../assets/css/profile.css'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import Loading from '../../../Custom/Loading'
import Error from '../../Error'

export default function ProfileViewMode() {
    const [isLoading, setIsLoading] = React.useState(true)
    const { username } = useParams()
    const { freelancers, user } = useAuth()
    const [freelancer, setFreelancer] = React.useState({})

    React.useEffect(() => {
        if (freelancers.length !== 0) {
            setFreelancer(freelancers.find(f => f.userName === username))
            setIsLoading(false)
        }
    }, [freelancers])

    if (!freelancer || user.type === "Freelancer") {
        return <Error redirect="/user" />
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="profile">
            <div className="profile-description">
                {/*--------------Profilna slika----------------*/}
                <div className="image" >
                    <img src={freelancer["imgSrc"]} />
                </div>

                <div className="biography">
                    <h3 className="title">
                        Biografija
                    </h3>

                    <div className="text">
                        {freelancer["biography"]}
                    </div>

                </div>

                {/*--------------Opšte informacije----------------*/}
                <div className="info">
                    <div className="firstName">
                        {freelancer.firstName} {freelancer.lastName}
                    </div>

                    <div className="userName">
                        @{freelancer.userName} {freelancer.country}
                    </div>

                    <div className="email">
                        {user.email}
                    </div>

                    {/*Satnicu imamo samo kod freelancera */}
                    {
                        freelancer.type === "Freelancer" &&
                        <>
                            <div className="hourlyRate">
                                {freelancer.hourlyRate}$
                            </div>
                        </>
                    }
                </div>
            </div>

            <div className="reviews">
                <h3 className="title">
                    reviews
                </h3>

                <div className="text">

                </div>

            </div>

            <div className="education">
                <h3 className="title">
                    education
                </h3>

                <div className="text">
                    {freelancer["education"]}
                </div>
            </div>

            <div className="experience">
                <h3 className="title">
                    experience
                </h3>

                <div className="text">
                    {freelancer["experience"]}
                </div>
            </div>

        </div>

    )
}
