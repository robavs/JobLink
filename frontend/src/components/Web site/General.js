import React, { useState, useEffect } from "react";
import Header from './Header';
import Home from './Home';
import About from './About';
import Clients from './Clients';
import Stats from './Stats';
import Services from './Services';
import Testimonials from './Testimonials';
import Team from './Team';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';
import InitialLoading from "../Custom/InitialLoading";
import AOS from "aos";
import "aos/dist/aos.css";
import '../../assets/css/website.css'

const General = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    }, [])

    if (isLoading) {
        return <InitialLoading />
    }

    return (
        <>
            <Header />
            <Home />
            <About />
            <Clients />
            <Stats />
            <Services />
            <Testimonials />
            <Team />
            <Pricing />
            <FAQ />
            <Contact />
            <Footer />
        </>
    )
}

export default General
