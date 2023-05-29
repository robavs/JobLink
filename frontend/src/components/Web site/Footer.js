import React, { useState, useEffect } from 'react'
import { Twitter, Facebook, Instagram, Linkedin, ArrowUpShort } from 'react-bootstrap-icons'

const Footer = () => {
    const [showScrollArrowBtn, setShowScrollArrowBtn] = useState(false)

    useEffect(() => {
        const scrolling = () => {
            setShowScrollArrowBtn(() => window.scrollY > 100)
        }
        window.addEventListener('scroll', scrolling)

        return () => window.removeEventListener('scroll', scrolling)
    }, [showScrollArrowBtn])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setShowScrollArrowBtn(false)
    }

    return (
        <footer id="footer" className="footer">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-info">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <span>JobLink</span>
                        </a>
                        <p>Naša korisnička podrška je aktivna svakog dana. Možete nas kontaktirati putem maila, pozivom na broj
                            telefona ili preko društvenih mreža</p>
                        <div className="social-links d-flex mt-4">
                            <a href="#" className="twitter"><i className="bi"><Twitter /></i></a>
                            <a href="#" className="facebook"><i className="bi"><Facebook /></i></a>
                            <a href="#" className="instagram"><i className="bi"><Instagram /></i></a>
                            <a href="#" className="linkedin"><i className="bi"><Linkedin /></i></a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Korisni Linkovi</h4>
                        <ul>
                            <li><a href="#">Početna</a></li>
                            <li><a href="#">O nama</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Terms of service</a></li>
                            <li><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Naše usluge</h4>
                        <ul>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Web Development</a></li>
                            <li><a href="#">Product Management</a></li>
                            <li><a href="#">Marketing</a></li>
                            <li><a href="#">Graphic Design</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Kontaktirajte Nas</h4>
                        <p>
                            Cara Dušana 81 <br />
                            Niš<br />
                            Srbija <br /><br />
                            <strong>Telefon:</strong> +381 60 4777 981<br />
                            <strong>Email:</strong> info@joblink.com<br />
                        </p>
                    </div>

                    <div className="container mt-4">
                        <div className="copyright">
                            &copy; Copyright <strong><span>Impact</span></strong>. All Rights Reserved
                        </div>
                        <div className="credits">
                            Designed by <a href="https://bootstrapmade.com/">JobLink</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`scroll-top d-flex align-items-center justify-content-center ${showScrollArrowBtn ? "active" : ""}`} onClick={scrollToTop}><i
                className="bi"><ArrowUpShort /></i></div>
        </footer>
    )
}

export default Footer
