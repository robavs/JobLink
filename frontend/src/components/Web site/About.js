import React from 'react'
import about from '../../assets/img/about.jpg'
import aboutSide from '../../assets/img/about-2.jpg'
import { CheckCircleFill } from 'react-bootstrap-icons'

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">

                <div className="section-header">
                    <h2>O nama</h2>
                    <p>Ovaj sajt su napravila 3 studenta iz Srbije koja su shvatila da je veliki nedostatak freelancerskih sajtova
                        na Balkanu</p>
                </div>

                <div className="row gy-4">
                    <div className="col-lg-6">
                        <h3>Nađite svoj prvi posao od kuće sa odličnom zaradom</h3>
                        <img src={about} className="img-fluid rounded-4 mb-4" alt="" />
                        <p>Ovo je najbolja platforma na Balkanu ako ste spremni zaraditi svoj prvi novac od kuće. Možete se
                            registrovati, odabrati područja u kojima ste dobri i odmah krenuti sa zaradom i prvim klijentima.</p>
                        <p>Svi korisnici sajta su prezadovoljni. Izbor poslova je ogroman i sigurni smo da ćete se pronaći u nekom
                            od njih. Preuzmite prvi korak do uspeha i pronađite ljude koje dele iste ciljeve sa vama.</p>
                    </div>
                    <div className="col-lg-6">
                        <div className="content ps-0 ps-lg-5">
                            <p className="fst-italic">
                                Izbor mogućnosti je ogroman. Nađite svoje prve mušterije ili klijente i povežite se sa vama sličnim
                                ljima. Ogromna ponuda poslova i potreba za ljude širom Balkana.
                            </p>
                            <ul>
                                <li><i className="bi"><CheckCircleFill /></i> Dođite lako do prvog posla</li>
                                <li><i className="bi"><CheckCircleFill /></i> Sve možete raditi od kuće, bez ikakve dodatne opreme</li>
                                <li><i className="bi"><CheckCircleFill /></i> Sprijateljite se sa vama sličnim ljudima i budućim biznis
                                    partnerima</li>
                            </ul>
                            <p>
                                Znamo da je najteže doći do prvog posla, pogotovo ako prethodno nemate iskustva. Ovo je prava prilika
                                da to steknete. Ovde vam prethodna iskustva nisu potrebna i svi imate jednake šanse za uspehom.
                                Iskoristite to!
                            </p>

                            <div className="position-relative mt-4">
                                <img src={aboutSide} className="img-fluid rounded-4" alt="" />
                                <a href="" className="glightbox play-btn"></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default About
