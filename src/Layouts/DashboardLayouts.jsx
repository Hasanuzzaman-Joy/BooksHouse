import { Outlet, useNavigation, Link } from 'react-router';
import Loading from '../Components/Loading';
import ScrollToTop from '../Components/ScrollToTop';
import { useContext, useState } from "react";
import { FaBars, FaTimes, FaBook, FaPlusCircle, FaUser, FaSignOutAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import AuthContext from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const DashboardLayouts = () => {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(true);
    const { user, logOut } = useContext(AuthContext);  

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully!");
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <ToastContainer />
            {navigation.state === "loading" && <Loading />}
            <ScrollToTop />

            <div className="h-screen flex">

                {/* Sidebar */}
                <div className={`bg-[#242253] text-white w-64 h-full flex flex-col fixed md:static z-40 
                    transform transition-transform duration-300 pt-16 md:pt-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

                    {/* Sidebar Top */}
                    <div className="p-4 flex flex-col gap-2 border-b border-[#bfbdff]">
                        <h1 className="text-2xl font-bold">BooksHouse</h1>

                        {user ? (
                            <div className="mt-2">
                                <p className="font-semibold">{user.displayName || "No Name"}</p>
                                <p className="text-sm text-[#bfbdff]">{user.email || "No Email"}</p>
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-[#bfbdff]">No user logged in</p>
                        )}
                    </div>

                    {/* Accordion Toggle */}
                    <div
                        onClick={() => setAccordionOpen(!accordionOpen)}
                        className="cursor-pointer p-4 border-b border-[#bfbdff] font-semibold text-lg flex items-center justify-between hover:bg-[#bfbdff] hover:text-[#242253] transition"
                    >
                        Dashboard Menu
                        {accordionOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {/* Sidebar Links */}
                    {accordionOpen && (
                        <div className="flex flex-col flex-1 p-4 space-y-4">
                            <Link 
                              to='/dashboard/my-books' 
                              className="bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 hover:bg-[#a9a8e6]"
                            >
                                <FaBook />
                                My Books
                            </Link>
                            <Link 
                              to='/dashboard/add-book' 
                              className="bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 hover:bg-[#a9a8e6]"
                            >
                                <FaPlusCircle />
                                Add Book
                            </Link>
                            <Link 
                              to='/dashboard/profile' 
                              className="bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 hover:bg-[#a9a8e6]"
                            >
                                <FaUser />
                                My Profile
                            </Link>

                            {/* Logout for mobile */}
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="md:hidden bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#a9a8e6]"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            )}
                        </div>
                    )}

                    {/* Logout for Desktop */}
                    {user && (
                        <div className="p-4 mt-auto">
                            <button
                                onClick={handleLogout}
                                className="bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 w-full cursor-pointer hover:bg-[#a9a8e6]"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Top Navbar */}
                <div className="md:hidden fixed top-0 left-0 right-0 bg-[#242253] text-white flex justify-between items-center p-4 z-50">
                    <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <h1 className="text-xl font-bold">BooksHouse</h1>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-[#FAFAF9] overflow-auto">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayouts;
