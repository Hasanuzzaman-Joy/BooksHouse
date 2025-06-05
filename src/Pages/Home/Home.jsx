import { Suspense } from "react";
import Faq from "../../Components/Faq";
import Slider from "../../Components/Slider";
import Testimonial from "../../Components/Testimonial";
import Loading from '../../Components/Loading'
import CallToAction from '../../Components/CallToAction'

const Home = () => {

    const testimonialData = fetch('/testimonial.json').then(res => res.json());
    const faqData = fetch('/faq.json').then(res => res.json());

    return (
        <div className=" w-full md:w-11/12 mx-auto">
            <Slider />
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