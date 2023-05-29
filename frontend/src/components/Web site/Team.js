import React from 'react'
import profileImgLuka from '../../assets/img/Luka2.png'
import profileImgAleksa from '../../assets/img/Robavs1.png'
import profileImgMarko from '../../assets/img/Marko5.png'
import blueLogo from '../../assets/img/bluelogo.png'
import { Twitter, Facebook, Instagram, Linkedin } from 'react-bootstrap-icons';

const founders = [
    {
        name: "Luka Nenić",
        position: "CEO",
        profileImg: profileImgLuka
    },
    {
        name: "Aleksa Robavs",
        position: "Marketing",
        profileImg: profileImgAleksa
    },
    {
        name: "Marko Kostić",
        position: "Operativa",
        profileImg: profileImgMarko
    }
]

const Team = () => {
    return (
        <section id="team" className="team">
            <div className="container" data-aos="fade-up">

                <div className="section-header">
                    <h2>Osnivači</h2>
                    <p>Ljudi koji su zaslužni za JobLink i njegov uspeh</p>
                </div>

                <div className="row gy-4">
                    {founders.map((founder, index) => {
                        const { name, position, profileImg } = founder
                        return (
                            <div key={index} className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                                <div className="member">
                                    <img src={profileImg} className="img-fluid" alt="" />
                                    <h4> {name} </h4>
                                    <span> {position} </span>
                                    <div className="social">
                                        <a href=""><Twitter /></a>
                                        <a href=""><Facebook /></a>
                                        <a href=""><Instagram /></a>
                                        <a href=""><Linkedin /></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="400">
                        <img src={blueLogo} className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Team
