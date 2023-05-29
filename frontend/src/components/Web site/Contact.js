import React from 'react'
import { GeoAlt, Envelope, Phone, Clock } from 'react-bootstrap-icons'
//ovde treba takodje da se dodaju funkcionalnosti za slanje poruke na odredjeni mejl

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">

                <div className="section-header">
                    <h2>Kontakt</h2>
                    <p>Za bilo kakva pitanja, možete nas kontaktirati popunjavanjem forme koja se nalazi ispod</p>
                </div>

                <div className="row gx-lg-0 gy-4">

                    <div className="col-lg-4">

                        <div className="info-container d-flex flex-column align-items-center justify-content-center">
                            <div className="info-item d-flex">
                                <i className="flex-shrink-0"><GeoAlt /></i>
                                <div>
                                    <h4>Lokacija:</h4>
                                    <p>Dušanova 88, Niš</p>
                                </div>
                            </div>

                            <div className="info-item d-flex">
                                <i className="flex-shrink-0"><Envelope /></i>
                                <div>
                                    <h4>Email:</h4>
                                    <p>info@joblink.com</p>
                                </div>
                            </div>

                            <div className="info-item d-flex">
                                <i className="flex-shrink-0"><Phone /></i>
                                <div>
                                    <h4>Pozovite:</h4>
                                    <p>+381 60 4777 981</p>
                                </div>
                            </div>

                            <div className="info-item d-flex">
                                <i className="flex-shrink-0"><Clock /></i>
                                <div>
                                    <h4>Radno vreme:</h4>
                                    <p>Pon-Pet: 11AM - 23PM</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-8">
                        <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Vaše Ime" required />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Vaše Prezime" required />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Naslov" required />
                            </div>
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" rows="7" placeholder="Poruka" required></textarea>
                            </div>
                            <div className="my-3">
                                <div className="loading">Učitavanje</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Vaša poruka je poslata. Hvala Vam!</div>
                            </div>
                            <div className="text-center"><button type="submit">Pošalji poruku</button></div>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Contact
