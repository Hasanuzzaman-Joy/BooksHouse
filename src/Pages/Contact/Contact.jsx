import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { FiSend } from "react-icons/fi";

const Contact = () => {
  // Page Title
  useEffect(() => {
    document.title = "BooksHouse | Contact Us";
  }, []);

  const [loading, setLoading] = useState(false);

  // Handle Contact Form Submission
  const handleContactForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      // Send data to server
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/contact`,
        {
          name,
          email,
          message,
        }
      );

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text:
          response.data.message || "Your message has been sent successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      form.reset();
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAF9] w-full">
      <div className="w-full md:max-w-screen-xl mx-auto px-4 py-10 flex flex-col md:flex-row min-h-[600px] rounded-md overflow-hidden">
        {/* Left Column: Contact Form */}
        <div className="flex flex-1 justify-center items-center bg-white p-8 shadow">
          <div className="w-full md:max-w-md">
            <h2 className="mb-3 text-2xl md:text-4xl font-bold text-[#242253]">
              Get in Touch
            </h2>
            <p className="mb-6 text-gray-500 text-base leading-7">
              Have questions or want to share your thoughts? Fill out the form
              below and we'll get back to you soon.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleContactForm} className="space-y-8">
              <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#242253]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253] transition-all duration-200"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#242253]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253] transition-all duration-200"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#242253]"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253] resize-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent hover:border-gray-300 text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FiSend />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex-1 hidden md:flex flex-col justify-center items-center px-10 bg-[#bfbdff]">
          <img
            src="https://i.ibb.co/NvngkMC/Filing-system-bro.png"
            alt="Contact Illustration"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
