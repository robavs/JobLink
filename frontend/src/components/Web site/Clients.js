import client1 from '../../assets/img/clients/client-1.png';
import client2 from '../../assets/img/clients/client-2.png';
import client3 from '../../assets/img/clients/client-3.png';
import client4 from '../../assets/img/clients/client-4.png';
import client5 from '../../assets/img/clients/client-5.png';
import client6 from '../../assets/img/clients/client-6.png';
import client7 from '../../assets/img/clients/client-7.png';
import client8 from '../../assets/img/clients/client-8.png';

import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

const clients = [client1, client2, client3, client4, client5, client6, client7, client8];

const Clients = () => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);
    return (
        <Swiper
            id="clients"
            className="clients"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            speed={400}
            loop={true}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false
            }}
            slidesPerView='auto'
            pagination={{
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 60
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 80
                },
                992: {
                    slidesPerView: 6,
                    spaceBetween: 120
                }
            }}
        >
            <div className="container" data-aos="zoom-out">
                <div className="clients-slider swiper">
                    <div className="swiper-wrapper align-items-center">
                        {clients.map((client, index) => {
                            return (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <img src={client} className="img-fluid" alt="" />
                                </SwiperSlide>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Swiper >
    );
};

export default Clients;
