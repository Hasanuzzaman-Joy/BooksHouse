import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const menuLinks = [
    { name: "Home", to: "/" },
    { name: "Bookshelf", to: "/bookshelf" },
    { name: "Contact", to: "/contact" },
    { name: "Dashboard", to: "/dashboard/my-books" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", to: "#" },
    { name: "Privacy policy", to: "#" },
    { name: "Cookie policy", to: "#" },
  ];

  const socialLinks = [
    { icon: <FaTwitter size={18} />, url: "https://x.com/" },
    { icon: <FaYoutube size={18} />, url: "https://www.youtube.com/" },
    { icon: <FaFacebook size={18} />, url: "https://www.facebook.com/" },
  ];

  return (
    <>
      {/* Main Footer */}
      <div className="footer w-full md:max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-base-content px-4 py-10 md:py-14">
        {/* Logo Section */}
        <aside className="flex flex-row justify-center items-center">
          <img src="/logo.png" alt="" className="w-14" />
          <h1 className="text-[#242253] font-bold text-base md:text-xl -ml-[2px]">
            Books<span className="text-[#faf34a]">House</span>
          </h1>
        </aside>

        {/* Menu Links Section */}
        <nav className="md:ml-2 lg:ml-5">
          <h6 className="footer-title font-bold text-lg">Menu</h6>
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="link link-hover text-base text-gray-800 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Legal Links Section */}
        <nav className="md:ml-2 lg:ml-2">
          <h6 className="footer-title font-bold text-lg">Legal</h6>
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="link link-hover text-base text-gray-800 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact & Social Links Section */}
        <nav className="md:ml-2 lg:ml-8">
          <h6 className="footer-title font-bold text-lg">Contact Us</h6>
          <div className="flex flex-col text-gray-800 gap-3 mb-3">
            <div className="flex justify-center items-center gap-2">
              <IoIosMail size={25} />
              <h1 className="font-medium text-base">Email: abc@gmail.com</h1>
            </div>
            <div className="flex justify-center items-center gap-2">
              <FaPhoneAlt size={18} />
              <h1 className="font-medium text-base">Phone: +880187723218</h1>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                className="p-3 bg-[#242253] text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="footer sm:footer-horizontal footer-center bg-[#242253] text-base-content w-full mx-auto p-4">
        <aside>
          <p className="text-white">
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <strong>BooksHouse</strong>
          </p>
        </aside>
      </div>
    </>
  );
};

export default Footer;
