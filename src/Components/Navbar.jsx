import { NavLink, Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const logOutForm = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };

  const link = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 text-base font-semibold rounded-md ${
              isActive ? "bg-[#bfbdff] text-[#242253]" : "hover:bg-[#bfbdff] hover:text-[#242253]"
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
              isActive ? "bg-[#bfbdff] text-[#242253]" : "hover:bg-[#bfbdff] hover:text-[#242253]"
            }`
          }
        >
          Bookshelf
        </NavLink>
      </li><li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2 text-base font-semibold rounded-md ${
              isActive ? "bg-[#bfbdff] text-[#242253]" : "hover:bg-[#bfbdff] hover:text-[#242253]"
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
                isActive ? "bg-[#bfbdff] text-[#242253]" : "hover:bg-[#bfbdff] hover:text-[#242253]"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      {!user && (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 text-base font-semibold rounded-md md:hidden ${
                  isActive ? "bg-[#bfbdff] text-[#242253]" : "hover:bg-[#bfbdff] hover:text-[#242253]"
                }`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 text-base font-semibold rounded-md md:hidden ${
                  isActive ? "bg-[#bfbdff] text-[#242253]" : "hover:bg-[#bfbdff] hover:text-[#242253]"
                }`
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-white border-b-[0.5px] border-[#dbdbdb]">
        <div className="navbar w-full md:w-11/12 mx-auto">
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden -ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu bg-[#bfbdff] dark:text-black font-bold menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {link}
              </ul>
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center -ml-2 md:ml-0">
              <img src="/logo.png" className="w-8" alt="logo" />
              <h1 className="text-[#242253] font-bold text-base md:text-2xl -ml-[2px]">
                Books<span className="text-[#faf34a]">House</span>
              </h1>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{link}</ul>
          </div>

          {/* User Avatar / Auth Buttons */}
          {user ? (
            <div className="navbar-end flex gap-4">
              <div className="dropdown dropdown-left dropdown-bottom">
                <div tabIndex={0}>
                  <div className="avatar avatar-online cursor-pointer">
                    <div className="w-10 rounded-full dark:border-[1px] dark:border-white">
                      <img src={user.photoURL} alt="User" />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content rounded-box z-10 w-[220px] p-2 shadow-lg bg-[#d7e1db] dark:text-black"
                >
                  <li className="border-b-[1px] border-[#a7a7a7]">
                    <h1 className="bg-transparent active:bg-transparent focus:bg-transparent font-bold">
                      {user.displayName}
                    </h1>
                  </li>
                  <li>
                    <button
                      onClick={logOutForm}
                      className="bg-transparent active:bg-transparent focus:bg-transparent font-bold"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="navbar-end flex gap-1 md:gap-4">
              <Link
                to="/login"
                className="btn bg-[#bfbdff] hover:bg-[#242253] text-[12px] md:text-sm text-[#242253] hover:text-white md:px-8 hidden md:flex"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-[#242253] hover:bg-[#bfbdff] text-[12px] md:text-sm text-white hover:text-[#242253] md:px-8 hidden md:flex"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
