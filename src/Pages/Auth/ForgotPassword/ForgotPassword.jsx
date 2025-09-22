import { Link } from "react-router";
import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import useAuth from "../../../Hooks/useAuth";
import { toast, ToastContainer, Bounce } from "react-toastify";

const ForgotPassword = () => {
  // Page title
  useEffect(() => {
    document.title = "BooksHouse | Forgot Password";
  }, []);

  const { resetPassword, setLoading, loading } = useAuth();
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email.trim());

      // Show success notification
      toast.success("Password reset email sent. Check your inbox.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });

      setEmail("");
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f3f3] w-full">
      <div className="w-full md:max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row min-h-[600px] rounded-md overflow-hidden shadow">
          {/* Left: Form Section */}
          <div className="flex flex-1 justify-center items-center bg-base-100 p-8">
            <div className="w-full md:max-w-md">
              <h2 className="mb-3 text-2xl md:text-4xl font-bold">
                Forgot Password 🔑
              </h2>
              <p className="mb-6 text-gray-500 leading-7">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              {/* Forgot Password Form */}
              <form onSubmit={handleForgotPassword} className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold"
                    >
                      Email address
                    </label>
                    {/* Email input */}
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="abc@gmail.com"
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-black border border-transparent hover:border-gray-300 text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-lg"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link <FiMail />
                    </>
                  )}
                </button>

                {/* Link back to login */}
                <div>
                  <p className="text-sm text-center mt-6">
                    Remembered your password?{" "}
                    <Link
                      to="/login"
                      className="text-[#242253] font-bold hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 hidden md:flex flex-col justify-center items-center px-10 bg-[#EAE9FF]">
            <img
              src="https://i.ibb.co/NvngkMC/Filing-system-bro.png"
              alt="Forgot Password Illustration"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
