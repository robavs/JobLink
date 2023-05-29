import React, { useState } from 'react'
import { Activity, PcDisplayHorizontal, Easel, BoundingBoxCircles, Calendar4Week, ChatSquareText } from 'react-bootstrap-icons';

const jobs = [
    {
        icon: <Activity />,
        title: "Obrada zvuka",
        description: "Sve više poslova se bazira na video klipovima. Većina njih ima zvuk veoma lošeg kvaliteta koji je potrebno popraviti.Poslova na ovom polju ima previše i jako su dobro plaćeni."
    },
    {
        icon: <PcDisplayHorizontal />,
        title: "Programiranje",
        description: "Ovo su jedni od najplaćenijih poslova na našoj platformi. Previše je zahteva za kvalitetnim kodovima i aplikacijama u kojima se možete pronaći i dobro zaraditi."
    },
    {
        icon: <Easel />,
        title: "Logo dizajn",
        description: "Mnoge balkanske kompanije su u potrazi za prepoznatljivim logom koji bi ih probio na tržište. Takođe je ovo jedan od najtraženijih i najjednostavnijih veština za naučiti.Mogućnosti su prevelike."
    },
    {
        icon: <BoundingBoxCircles />,
        title: "Video Editovanje",
        description: "Sve više poslova se bazira na video klipovima. Većina njih ima zvuk veoma lošeg kvaliteta koji je potrebno popraviti.Poslova na ovom polju ima previše i jako su dobro plaćeni."
    },
    {
        icon: <Calendar4Week />,
        title: "Vođenje socijalnih mreža",
        description: "Socijane mreže su najpopularnija stvar današnjice i gotovo svaka kompanija nastoji da ima istu. Konstanta je potreba za freelancerima koji će pomoći u organizaciji i vođenju socijalnih mreža, tako da ako imate bilo kakva iskustva sa njima prijavite se."
    },
    {
        icon: <ChatSquareText />,
        title: "Pisanje blogova",
        description: "Mnoge web stranice su u potrazi za dobrim piscima i content creatorima koji bi im pomogli sa interesantnim člancima.Ovo je trenutno jedan od najtrazenijih poslova i ako imate bilo kakvog iskustva u pisanju, ne ustručavajte se da se prijavite."
    }
]

const Services = () => {
    const [showMoreBtns, setShowMoreBtns] = useState(Array(jobs.length).fill(false))

    const showMore = (lastIndex) => {
        const newShowMoreBtns = showMoreBtns.slice().map(() => false)
        newShowMoreBtns[lastIndex] = !showMoreBtns[lastIndex]
        setShowMoreBtns(() => newShowMoreBtns)
    }

    return (
        <section id="services" className="services sections-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                    <h2>Poslovi</h2>
                    <p>Trenutno se na našem sajtu nalaze preko 1000 poslova koji čekaju samo na vas! Ovo su neki od
                        najpopularnijih: </p>
                </div>
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="100">
                    {jobs.map((job, index) => {
                        const { icon, title, description } = job
                        return (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="service-item position-relative" >
                                    <div className="icon">
                                        <i> {icon} </i>
                                    </div>
                                    <h3> {title} </h3>
                                    <p> {showMoreBtns[index] ? description : description.slice(0, 100) + "..."}
                                        <span style={{ cursor: "pointer", color: "green" }} onClick={() => showMore(index)}>
                                            {showMoreBtns[index] ? " Prikaži manje" : " Prikaži više"}
                                        </span>
                                    </p>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Services
