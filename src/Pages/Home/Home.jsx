import { Suspense, useEffect, useState } from "react";
import Faq from "../../Components/Faq";
import Slider from "../../Components/Slider";
import Testimonial from "../../Components/Testimonial";
import Loading from '../../Components/Loading'
import CallToAction from '../../Components/CallToAction'
import PopularBooks from "../../Components/PopularBooks";

const testimonialData = fetch('/testimonial.json').then(res => res.json());
const faqData = fetch('/faq.json').then(res => res.json());

const Home = () => {

    const [popularBooks, setPopularBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/popular-books`)
            .then(res => res.json())
            .then(data => {
                setPopularBooks(data);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className=" w-full md:w-11/12 mx-auto">
            <Slider />
            <div className='w-full mx-auto mt-20 py-8 md:px-0 px-4'>
                <h1 className='text-4xl text-[#242253] font-bold text-center leading-14 px-4 md:px-0 mb-8'>Most Popular Books Among Readers</h1>
                {isLoading ? (
                    <Loading />
                ) : (
                    <PopularBooks popularBooks={popularBooks} />
                )}
            </div>
            <Suspense fallback={<Loading />}>
                <Faq faqData={faqData}></Faq>
            </Suspense>
            <CallToAction />
            <div className='bg-[#f4f3f3] pb-14 w-full mx-auto'>
                <h1 className='text-4xl text-[#242253] font-bold text-center pt-20 leading-14 px-4 md:px-0'>What Book Lovers Say About BooksHouse</h1>
                <Suspense fallback={<Loading />}>
                    <Testimonial testimonialData={testimonialData}></Testimonial>
                </Suspense>
            </div>
        </div>
    );
};

export default Home;