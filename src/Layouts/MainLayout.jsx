import { Outlet, useLocation, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import ScrollToTop from "../Components/ScrollToTop";
import PageWrapper from "../Components/PageWrapper";
import { ToastContainer } from "react-toastify";
import BackToTop from "../Components/BackToTop";

const MainLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <>
      {navigation.state === "loading" && <Loading />}

      {/* Automatically scroll to top */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className=" mt-[60px] md:mt-[70px]">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </div>

      {/* Footer section */}
      <div className="bg-[#bfbdff] w-full">
        <Footer />
      </div>

      {/* Back-to-top button */}
      <BackToTop />

      {/* Toast notifications container */}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
