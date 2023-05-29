import React from 'react'
import { Box, Airplane, Send, Check, X } from 'react-bootstrap-icons'


const Pricing = () => {
    return (
        <section id="pricing" className="pricing sections-bg">
            <div className="container" data-aos="fade-up">

                <div className="section-header">
                    <h2>Planovi</h2>
                    <p>Ukoliko se odlučite za premium pogodnosti, možete izabrati neki od ponuđenih planova</p>
                </div>

                <div className="row g-4 py-lg-5" data-aos="zoom-out" data-aos-delay="100">

                    <div className="col-lg-4">
                        <div className="pricing-item">
                            <h3>Besplatan Plan</h3>
                            <div className="icon">
                                <i> <Box /> </i>
                            </div>
                            <h4><sup>$</sup>0<span> / mesečno</span></h4>
                            <ul>
                                <li><i className="bi bi-check"><Check /></i> Korišćenje sajta</li>
                                <li><i className="bi bi-check"><Check /></i> 20 prijava za posao mesečno</li>
                                <li><i className="bi bi-check"><Check /></i> 2 velika ugovora</li>
                                <li className="na"><i className="bi bi-x"><X /></i> <span>Neograničene prijave</span></li>
                                <li className="na"><i className="bi bi-x"><X /></i> <span>Reklamiranje profila</span></li>
                            </ul>
                            <div className="text-center"><a href="#" className="buy-btn">Kupi sada</a></div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="pricing-item featured">
                            <h3>Biznis Plan</h3>
                            <div className="icon">
                                <i> <Airplane /> </i>
                            </div>

                            <h4><sup>$</sup>29<span> / mesečno</span></h4>
                            <ul>
                                <li><i className="bi bi-check"><Check /></i> Korišćenje sajta</li>
                                <li><i className="bi bi-check"><Check /></i> 50 prijava za posao mesečno</li>
                                <li><i className="bi bi-check"><Check /></i> 7 velikih ugovora</li>
                                <li><i className="bi bi-check"><Check /></i> Biznis bedž</li>
                                <li><i className="bi bi-check"><Check /></i> Reklamiranje profila</li>
                            </ul>
                            <div className="text-center"><a href="#" className="buy-btn">Kupi sada</a></div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="pricing-item">
                            <h3>Developer Plan</h3>
                            <div className="icon">
                                <i> <Send /> </i>
                            </div>
                            <h4><sup>$</sup>49<span> / mesečno</span></h4>
                            <ul>
                                <li><i className="bi bi-check"><Check /></i> Korišćenje sajta</li>
                                <li><i className="bi bi-check"><Check /></i> Neograničen broj prijava</li>
                                <li><i className="bi bi-check"><Check /></i> Neograničen broj ugovora</li>
                                <li><i className="bi bi-check"><Check /></i> Developer bedž</li>
                                <li><i className="bi bi-check"><Check /></i> Reklamiranje profila</li>
                            </ul>
                            <div className="text-center"><a href="#" className="buy-btn">Kupi sada</a></div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Pricing
