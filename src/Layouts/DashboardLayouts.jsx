import { Outlet, useNavigation, Link } from "react-router";
import Loading from "../Components/Loading";
import ScrollToTop from "../Components/ScrollToTop";
import { useContext, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AuthContext from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const DashboardLayouts = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const { user, logOut } = useContext(AuthContext);

  // Handle logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        setIsOpen(false);
      })
      .catch(console.error);
  };

  // Sidebar links data
  const sidebarLinks = [
    { to: "/dashboard/my-books", icon: <FaBook />, label: "My Books" },
    { to: "/dashboard/add-book", icon: <FaPlusCircle />, label: "Add Book" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
  ];

  return (
    <>
      {navigation.state === "loading" && <Loading />}
      <ScrollToTop />

      <div className="h-screen flex">
        {/* Sidebar */}
        <div
          className={`bg-[#242253] text-white w-64 h-full flex flex-col fixed xl:static z-40 
            transform transition-transform duration-300 pt-16 xl:pt-0
            ${isOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
        >
          {/* Sidebar Top */}
          <div className="p-4 flex flex-col gap-2 border-b border-[#bfbdff]">
            <Link to="/">
              <div className="hidden md:hidden xl:flex justify-center items-center gap-2 -ml-12">
                <img src="/logo.png" className="w-8" alt="logo" />
                <h1 className="text-white font-bold text-base md:text-2xl">
                  Books<span className="text-[#faf34a]">House</span>
                </h1>
              </div>
            </Link>

            {user ? (
              <div className="mt-0 md:mt-4">
                <p className="font-semibold text-base">
                  {user.displayName || "No Name"}
                </p>
                <p className="text-base text-[#bfbdff]">
                  {user.email || "No Email"}
                </p>
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
              {sidebarLinks.map(({ to, icon, label }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 hover:bg-[#a9a8e6]"
                >
                  {icon} {label}
                </Link>
              ))}
            </div>
          )}

          {/* Logout Button */}
          {user && (
            <div className="p-4 mt-auto">
              <button
                onClick={handleLogout}
                className="bg-[#bfbdff] text-[#242253] p-2 rounded font-semibold flex items-center gap-2 w-full cursor-pointer hover:bg-[#a9a8e6]"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Top Navbar */}
        <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#242253] text-white flex justify-between items-center p-4 z-50">
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/">
            <div className="flex justify-center items-center gap-2 -ml-12">
              <img src="/logo.png" className="w-8" alt="logo" />
              <h1 className="text-white font-bold text-base md:text-2xl">
                Books<span className="text-[#faf34a]">House</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#dddddd] mx-auto overflow-auto">
          <main className="flex-1 mt-20 xl:mt-0 p-4 xl:p-10">
            {/* Boxed outlet area */}
            <div className="bg-[#f8f8f8e8] rounded shadow-md p-4 xl:p-14">
              <Outlet />
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-[#bfbdff] text-center text-sm text-[#242253] font-semibold py-5 border-t border-[#bfbdff]">
            © {new Date().getFullYear()} BooksHouse. All rights reserved.
          </footer>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default DashboardLayouts;
