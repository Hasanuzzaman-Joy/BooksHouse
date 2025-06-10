import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';
import ScrollToTop from '../Components/ScrollToTop';

const MainLayout = () => {

    const navigation = useNavigation();

    return (
        <>
            {
                navigation.state === "loading" && <Loading />
            }
            <ScrollToTop />
            <Navbar />
            <div className=' mt-[60px] md:mt-[70px]'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
