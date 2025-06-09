import { useState, useEffect } from 'react';
import Loading from '../Components/Loading';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Lottie from 'react-lottie';
import notFoundAnimation from '../assets/notFoundAnimation.json';
import { Link, useNavigation } from 'react-router';
import { motion } from "motion/react"

const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

const Error = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Cleanup on unmount
        return () => clearTimeout(loadingTimeout);
    }, []);

    const isNavigating = navigation.state === 'loading';

    return (
        <>
            <Navbar />
            {
                isLoading || isNavigating ? <Loading /> : <>
                    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-center w-11/12 mx-auto">
                        <section className="w-full max-w-md mt-10">
                            <h1 className="text-3xl font-bold text-gray-800 mt-4">404 - Page Not Found</h1>
                            <p className="text-gray-600 mt-2 mb-6">
                                Oops! The page you’re looking for doesn’t exist.
                            </p>
                            <Lottie options={lottieOptions} height={250} width={380} />
                            <motion.div className='mt-14'
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.10, 1] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: 'easeInOut',
                                }}>
                                <Link to="/" className="btn bg-[#242253] hover:bg-[#bfbdff] transition-all hover:text-[#242253] text-base font-medium text-white ">Return to Home</Link>
                            </motion.div>
                        </section>
                    </main>
                </>
            }
            <Footer />
        </>
    );
};

export default Error;
