import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, Autoplay } from 'swiper/modules';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';
import { useState } from 'react';

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            img: "https://i.ibb.co/HDQctCbQ/hero-2.jpg",
            title: "Your Personal Digital Bookshelf",
            subtitle: "Easily organize, track, and manage all your favorite books in one place — from classics to current reads."
        },
        {
            img: "https://i.ibb.co/4Rp8Prrd/hero-1.jpg",
            title: "Read More, Worry Less",
            subtitle: "Log your reading history, set goals, and never forget where you left off — perfect for every book lover."
        },
        {
            img: "https://i.ibb.co/rGVBDypZ/CTA.jpg",
            title: "Discover. Track. Reflect.",
            subtitle: "Keep notes, rate your books, and revisit your reading journey anytime with a beautifully designed interface."
        }
    ];


    return (
        <div className="w-full mx-auto h-screen relative">
            <button className="swiper-button-prev-custom cursor-pointer absolute top-1/2 left-5 z-10 text-white text-3xl md:text-5xl">
                <HiArrowLongLeft />
            </button>
            <button className="swiper-button-next-custom cursor-pointer absolute top-1/2 right-5 z-10 text-white text-3xl md:text-5xl">
                <HiArrowLongRight />
            </button>

            <Swiper
                modules={[Navigation, Parallax, Autoplay]}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                parallax
                autoplay={{ delay: 3000 }}
                loop={true}
                speed={1200}
                className="h-full"
                style={{ '--swiper-navigation-color': 'white' }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full overflow-hidden">
                            <img
                                src={slide.img}
                                alt=""
                                className={`w-full h-full object-cover transition-transform duration-1000 ease-in-out ${activeIndex === index ? 'scale-100' : 'scale-200'
                                    }`}
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/45"
                                data-swiper-parallax="-200"
                            >
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className="text-3xl md:text-4xl font-bold text-center text-white px-5 md:px-0">{slide.title}</h1>
                                    <p className="text-lg medium w-[70%] text-center pt-5 text-white">{slide.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
