import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FiSend } from "react-icons/fi";

const Contact = () => {
  useEffect(() => {
    document.title = "BooksHouse | Contact Us";
  }, []);

  const handleContactForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    // TODO: Add actual message sending logic here

    form.reset();

    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className="bg-[#FAFAF9] w-full mx-auto py-10 px-4 md:px-0">
      

      <div className="w-full md:w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row min-h-[600px] rounded-md overflow-hidden shadow-xl">
        {/* Left Column: Contact Form */}
        <div
          className="flex flex-1 justify-center items-center bg-white p-8"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <div className="w-full md:max-w-md">
            <h2 className="mb-3 text-3xl font-bold text-[#242253]">Get in Touch</h2>
            <p className="mb-6 text-gray-700">
              Have questions or want to share your thoughts? Fill out the form below and we'll get back to you soon.
            </p>

            <form onSubmit={handleContactForm} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-[#242253]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40b93c]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#242253]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40b93c]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#242253]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40b93c] resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent hover:border-gray-300 text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Send Message
                <FiSend />
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
