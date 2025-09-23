import { NavLink, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import useAuth from "../Hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Log Out
  const logOutForm = () => {
    logOut().then(() => {
      navigate("/login");
      setMenuOpen(false);
    });
  };

  // Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar Links
  const link = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 text-base font-semibold rounded-md ${
              isActive
                ? "bg-[#bfbdff] text-[#242253]"
                : "hover:bg-[#bfbdff] hover:text-[#242253]"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bookshelf"
          className={({ isActive }) =>
            `px-4 py-2 text-base font-semibold rounded-md ${
              isActive
                ? "bg-[#bfbdff] text-[#242253]"
                : "hover:bg-[#bfbdff] hover:text-[#242253]"
            }`
          }
        >
          Bookshelf
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2 text-base font-semibold rounded-md ${
              isActive
                ? "bg-[#bfbdff] text-[#242253]"
                : "hover:bg-[#bfbdff] hover:text-[#242253]"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/my-books"
            className={({ isActive }) =>
              `px-4 py-2 text-base font-semibold rounded-md ${
                isActive
                  ? "bg-[#bfbdff] text-[#242253]"
                  : "hover:bg-[#bfbdff] hover:text-[#242253]"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b-[0.5px] border-[#dbdbdb] transition-all duration-500 ${
        isScrolled ? "py-2" : "py-5"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-8" />
          <h1 className="text-[#242253] font-bold text-base md:text-2xl">
            Books<span className="text-[#faf34a]">House</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">{link}</ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  title={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-[#bfbdff]"
                />
              ) : (
                <FaUserCircle className="text-2xl text-textSecondary" />
              )}
              <button
                onClick={logOutForm}
                className="px-4 py-2 font-semibold rounded-md bg-[#bfbdff] hover:bg-[#242253] text-[#242253] hover:text-white transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 font-semibold rounded-md bg-[#bfbdff] hover:bg-[#242253] text-[#242253] hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-2xl text-main cursor-pointer" />
            ) : (
              <FiMenu className="text-2xl text-main cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-3/4 sm:w-2/4 h-full bg-white shadow-lg p-6 z-40"
          >
            {/* Links */}
            <ul className="flex flex-col gap-6">{link}</ul>

            {/* Auth Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        title={user.displayName || "User"}
                        className="w-10 h-10 rounded-full border-2 border-[#bfbdff]"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-textSecondary" />
                    )}
                    <span>{user.displayName}</span>
                  </div>
                  <button
                    onClick={logOutForm}
                    className="px-4 py-2 font-semibold rounded-md bg-[#bfbdff] hover:bg-[#242253] text-[#242253] hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 font-semibold rounded-md bg-[#bfbdff] hover:bg-[#242253] text-[#242253] hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
