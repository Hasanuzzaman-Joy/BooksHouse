import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Lottie from "react-lottie";
import notFoundAnimation from "../assets/notFoundAnimation.json";
import { Link, useNavigation } from "react-router";
import { motion } from "motion/react";
import ZoomInSection from "../Components/ZoomInSection";

// Lottie animation options
const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: notFoundAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Error = () => {
  // Page title
  useEffect(() => {
    document.title = "BooksHouse | Error-Page";
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Simulate loading
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const isNavigating = navigation.state === "loading";

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {isLoading || isNavigating ? (
        <Loading />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Main content */}
          <main className="flex-grow flex flex-col items-center justify-center p-4 text-center  w-full md:max-w-screen-xl bg-white mx-auto">
            <ZoomInSection>
              <section className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mt-14">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 mt-2 mb-6">
                  Oops! The page you’re looking for doesn’t exist.
                </p>

                {/* Lottie animation */}
                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    transition: { duration: 3, repeat: Infinity },
                  }}
                >
                  <Lottie options={lottieOptions} height={250} width={380} />
                </motion.div>

                {/* Return home button */}
                <motion.div
                  className="mt-14"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Link
                    to="/"
                    className="btn bg-[#242253] hover:bg-[#bfbdff] transition-all hover:text-[#242253] text-base font-medium text-white "
                  >
                    Return to Home
                  </Link>
                </motion.div>
              </section>
            </ZoomInSection>
          </main>
        </div>
      )}

      {/* Footer */}
      <div className="bg-[#bfbdff] w-full">
        <Footer />
      </div>
    </>
  );
};

export default Error;
