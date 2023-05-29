import React from 'react'
import client1 from '../../assets/img/testimonials/testimonials-1.jpg'
import client2 from '../../assets/img/testimonials/testimonials-2.jpg'
import client3 from '../../assets/img/testimonials/testimonials-3.jpg'
import client4 from '../../assets/img/testimonials/testimonials-4.jpg'
import client5 from '../../assets/img/testimonials/testimonials-5.jpg'
import { StarFill } from 'react-bootstrap-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

const testimonials = [
    {
        img: client1,
        name: "Marko Perić",
        qualification: "Audio & Video editor",
        impression: " Želeo bih da podelim svoje iskustvo sa vama i da istaknem koliko sam zadovoljan/a vašim uslugama. Vaša platforma mi je pomogla da pronađem savršene stručnjake za svoje projekte i oduševljen sam njihovim radom.Sistem plaćanja je jednostavan i pouzdan, a podrška korisnicima je izuzetna. Zahvaljujući vama, moj posao je postao mnogo lakši i produktivniji.Drago mi je što sam deo vaše zajednice i jedva čekam da nastavim da koristim vaše usluge u budućnosti. "
    },
    {
        img: client2,
        name: "Sara Matić",
        qualification: "Logo dizajner",
        impression: " Želela bih da vam se zahvalim na neverovatnoj usluzi koju ste mi pružili. Zahvaljujući vašoj platformi, pronašla sam visoko kvalifikovane stručnjake koji su ispunili moje zahteve u potpunosti. Način plaćanja je bio jednostavan i siguran, a vaša korisnička podrška je bila izuzetna.Nastavite sa izvanrednim radom! "
    },
    {
        img: client3,
        name: "Jelena Nikolić",
        qualification: "Pisac",
        impression: " Želim da istaknem koliko sam zadovoljna sa vašom platformom i uslugama koje ste mi pružili. Pronalazak stručnjaka koji su odgovarali mom projektu je bio jednostavan, a njihov rad je bio iznad mojih očekivanja.Vaš sistem plaćanja je pouzdan i bezbedan, a vaša korisnička podrška je bila sjajna.Hvala vam što ste mi olakšali posao! "
    },
    {
        img: client4,
        name: "Matija Nastasić",
        qualification: "Freelancer",
        impression: " Želeo bih da vam se zahvalim na sjajnoj usluzi koju ste mi pružili. Vaša platforma mi je pomogla da pronađem stručnjake za svoje projekte u rekordnom roku, a njihov kvalitet rada je bio izvanredan. Proces plaćanja je bio glatki i brzi, a vaša podrška korisnicima je bila izuzetna. Hvala vam što ste bili moj pouzdani partner u poslu! "
    },
    {
        img: client5,
        name: "Nikola Stanisavljević",
        qualification: "Programer",
        impression: " Hteo bih da vam se zahvalim na vrhunskoj usluzi koju ste mi pružili. Vaša platforma mi je pomogla da pronađem najbolje stručnjake za moje projekte i njihov rad je bio izvanredan.Proces plaćanja je bio jednostavan i efikasan, a vaša korisnička podrška je bila izuzetno korisna.Drago mi je što sam pronašao vašu kompaniju i jedva čekam da nastavim da koristim vaše usluge u budućnosti! "
    }
]

const Testimonials = () => {
    return (
        <div id="testimonials" className="testimonials" style={{ paddingTop: "20px" }}>
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                    <h2>Komentari korisnika</h2>
                    <p>Evo šta o nama kažu zadovoljni korisnici:</p>
                </div>

                <Swiper data-aos="fade-up" data-aos-delay="100"
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    speed={600}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    slidesPerView='auto'
                    pagination={{
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 40
                        },

                        1200: {
                            slidesPerView: 3,
                        }
                    }}
                >
                    <div
                    >
                        {testimonials.map((testimonial, index) => {
                            const { img, name, qualification, impression } = testimonial
                            return (
                                <SwiperSlide key={index}>
                                    <div className="testimonial-wrap" key={index * 100}>
                                        <div className="testimonial-item">
                                            <div className="d-flex align-items-center">
                                                <img src={img} className="testimonial-img flex-shrink-0" alt="" />
                                                <div>
                                                    <h3> {name} </h3>
                                                    <h4> {qualification} </h4>
                                                    <div className="stars">
                                                        <i><StarFill /></i>
                                                        <i><StarFill /></i>
                                                        <i><StarFill /></i>
                                                        <i><StarFill /></i>
                                                        <i><StarFill /></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <p>
                                                <FontAwesomeIcon icon={faQuoteLeft} />
                                                {impression}
                                                <FontAwesomeIcon icon={faQuoteRight} />
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div >
        </div >
    )
}
export default Testimonials
