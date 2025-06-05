
// import { useNavigation } from 'react-router';
// import Loading from '../Component/Loading';
import notFoundAnimation from '../assets/notFoundAnimation.json';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Lottie from 'react-lottie';

const Error = () => {

    // const navigation = useNavigation();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFoundAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <>
            {/* {
                navigation.state === "loading" && <Loading />
            } */}
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-white text-center w-11/12 mx-auto">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mt-4 text-gray-800">404 - Page Not Found</h1>
                    <p className="text-gray-600 mt-2">Oops! The page you’re looking for doesn’t exist.</p>
                     <Lottie options={defaultOptions} height={300} width={300} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Error;