import React, { useState, useEffect } from 'react'
import logo from '../../assets/img/bluelogo.png'
import { useNavigate } from 'react-router-dom'

const messages = ["Razvijaj inovativne ideje uz pomoć ambicioznih stručnjaka",
    "Radi na najkretivnijim projektima u industriji",
    "Otkrij nove poslovne izazove i napreduj u karijeri uz Job Link"]

const typingAnimation = "typing 1.5s steps(30, end) forwards"
const blinkingAnimation = "blinking 1s infinite"

const Home = () => {
    const [wordIndex, setWordIndex] = useState(0)
    const [messageIndex, setMessageIndex] = useState(0)
    const [typeSpeed, setTypeSpeed] = useState(50)
    const [isFullMessage, setIsFullMessage] = useState(false)
    const [animation, setAnimation] = useState(typingAnimation)
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setInterval(() => {
            if (!isFullMessage) {
                if (wordIndex == messages[messageIndex].length) {
                    setIsFullMessage(isFullMessage => !isFullMessage)
                }
                else {
                    setWordIndex(wordIndex => wordIndex + 1)
                }
                setTypeSpeed(_ => wordIndex == messages[messageIndex].length ? 2000 : 50)
                setAnimation(_ => wordIndex == messages[messageIndex].length ? blinkingAnimation : typingAnimation)
            }
            else {
                if (wordIndex == 0) {
                    setMessageIndex(messageIndex => (messageIndex + 1) % messages.length)
                    setIsFullMessage(isFullMessage => !isFullMessage)
                }
                setAnimation(_ => wordIndex == 0 ? blinkingAnimation : typingAnimation)
                setWordIndex(wordIndex => wordIndex == 0 ? 0 : wordIndex - 1)
                setTypeSpeed(_ => wordIndex == 0 ? 1000 : 25)
            }
        }, typeSpeed)
        return () => clearInterval(timeoutId)
    }, [wordIndex, isFullMessage])

    return (
        <section id="home" className="hero">

            <div className="container position-relative">

                <span className="pipe" style={{ animation: animation }}>
                    {messages[messageIndex].slice(0, wordIndex)}
                </span>

                <div className="row gy-5" data-aos="fade-in">
                    <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                        <h2>Dobrodošli na <span>JobLink</span></h2>
                        <p>Ovo je freelancerski sajt koji će pomoći mnogima sa balkanskog područja. Naš cilj je da vas spojimo sa
                            vašim budućim saradnicima i omogućimo brz i lak posao od kuće! </p>
                        <div className="d-flex justify-content-center justify-content-lg-start">
                            <a href="#about" className="btn-get-started">Započnimo</a>
                            <a href=""
                                className="glightbox btn-watch-video d-flex align-items-center"><i
                                    className="bi bi-play-circle"></i><span>Pogledajte video</span></a>
                        </div>

                    </div>
                    <div className="col-lg-6 order-1 order-lg-2">
                        <img src={logo} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
                    </div>
                </div>
            </div>

            <div className="icon-boxes position-relative">
                <div className="container position-relative">
                    <div className="row gy-4 mt-5">

                        <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100" style={{ cursor: "pointer" }}>
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-easel"></i></div>
                                <h4 className="title"><a onClick={() => navigate("/signup/login")} className="stretched-link">Pridružite nam se</a></h4>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-gem"></i></div>
                                <h4 className="title"><a href="" className="stretched-link">Rad od kuće</a></h4>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-geo-alt"></i></div>
                                <h4 className="title"><a href="" className="stretched-link">Celi Balkan</a></h4>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-command"></i></div>
                                <h4 className="title"><a href="" className="stretched-link">Odlična zarada</a></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default Home
