import { Outlet, useLocation, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import ScrollToTop from "../Components/ScrollToTop";
import PageWrapper from "../Components/PageWrapper";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <>
      {navigation.state === "loading" && <Loading />}
      <ScrollToTop />
      <Navbar />
      <div className=" mt-[60px] md:mt-[70px]">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </div>
      <div className="bg-[#bfbdff] w-full">
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
