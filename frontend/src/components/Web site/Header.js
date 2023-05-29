import { useState, useEffect, useRef } from 'react'
import { Envelope, Phone, Twitter, Facebook, Instagram, Linkedin, List, X } from 'react-bootstrap-icons';

const navLinks = [
    { href: "#home", title: "Početna" },
    { href: "#about", title: "O Nama" },
    { href: "#services", title: "Poslovi" },
    { href: "#team", title: "Tim" },
    { href: "#contact", title: "Kontakt" }

]
const Header = () => {
    const [isMobileNavActive, setIsMobileNavActive] = useState(false)
    const [stickyHeader, setStickyHeader] = useState(false)
    const headerRef = useRef()
    const mobileNavShowRef = useRef()
    const mobileNavHideRef = useRef()
    const navbarRef = useRef()

    useEffect(() => {
        if (headerRef) {
            const fixHeader = () => {
                setStickyHeader(window.pageYOffset > headerRef.current.offsetTop);
            }

            window.addEventListener('scroll', fixHeader)

            return () => {
                window.removeEventListener('scroll', fixHeader);
            };
        }
    }, [stickyHeader])


    const toggleMenu = () => {
        setIsMobileNavActive(isMobileNavActive => !isMobileNavActive)
        // zanima me koji je nacin da se nadje ref na body tag direktno iz reacta
        document.body.classList.toggle("mobile-nav-active")
    }

    return (
        <>
            <section id="topbar" className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="d-flex align-items-center">
                            <Envelope />
                            <a href="mail:contact@joblink.com">contact@joblink.com</a>
                        </i>
                        <i className='d-flex align-items-center ms-4'>
                            <Phone />
                            <span>+381 60 4777 981</span>
                        </i>
                    </div>
                    <div className="social-links d-none d-md-flex align-items-center">
                        <a href="#"><Twitter /></a>
                        <a href="#"><Facebook /></a>
                        <a href="#"><Instagram /></a>
                        <a href="#"><Linkedin /></a>
                    </div>
                </div>
            </section>

            <header id="header"
                ref={headerRef}
                className={`header d-flex align-items-center ` +
                    (stickyHeader ? "sticky" : "")}>

                <div
                    className={`container-fluid container-xl d-flex align-items-center justify-content-between`}>

                    <a href="index.html" className="logo d-flex align-items-center">
                        <h1>JobLink<span>.</span></h1>
                    </a>

                    <nav ref={navbarRef} id="navbar" className="navbar">
                        <ul>
                            {navLinks.map(link => {
                                const { href, title } = link
                                return (
                                    <li key={href} onClick={toggleMenu}>
                                        <a href={href}>{title}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {!isMobileNavActive &&
                        <i ref={mobileNavShowRef}
                            className={"mobile-nav-toggle mobile-nav-show" + (isMobileNavActive ? "d-none" : "")}
                            onClick={toggleMenu}>
                            <List />
                        </i>}

                    {isMobileNavActive &&
                        <i ref={mobileNavHideRef}
                            className={"mobile-nav-toggle mobile-nav-hide" + (!isMobileNavActive ? "d-none" : "")}
                            onClick={toggleMenu}>
                            <X />
                        </i>}
                </div>
            </header>
        </>
    )
}

export default Header