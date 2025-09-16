import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useUploadImage from "../../Hooks/useUploadImage";
import { FiLogIn } from "react-icons/fi";

const Register = () => {
  useEffect(() => {
    document.title = "BooksHouse | Register";
  }, []);

  const navigate = useNavigate();
  const { register, updatedProfile, googleSign, setLoading, loading } = useAuth();
  const { imgURL, imgLoading, handleImageUpload } = useUploadImage();

  // Google Sign In
  const handleGoogle = () => {
    googleSign()
      .then(() => {
        toast.success("You've successfully registered to our website", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      });
  };

  // Register Form Submit
  const handleRegisterForm = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least one uppercase letter.", {
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have at least one lowercase letter.", {
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!imgURL) {
      toast.error("Please upload a profile photo.", {
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    register(email, password)
      .then(() => {
        // Update Profile
        updatedProfile(name, imgURL);
        toast.success("You've successfully registered to our website", {
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        toast.error(`${error.message}`, { theme: "light", transition: Bounce });
        setLoading(false);
      });
  };

  return (
    <div className="bg-[#f4f3f3] w-full">
      <div className="w-full md:max-w-screen-xl mx-auto px-4 py-8">
        <div className="w-full flex flex-col md:flex-row min-h-[600px] rounded-md overflow-hidden shadow">
          {/* Left: Form Section */}
          <div className="flex flex-1 justify-center items-center bg-base-100 p-8">
            <div className="w-full md:max-w-md">
              <h2 className="mb-3 text-3xl font-bold">Register Account</h2>
              <p className="mb-6 text-gray-600">
                Create your BooksHouse profile and start reading.
              </p>

              {/* Social Login */}
              <div className="my-6 space-y-4">
                <div
                  onClick={handleGoogle}
                  className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md btn bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] text-base font-semibold border-gray-300 cursor-pointer"
                >
                  <FcGoogle />
                  <p>Sign up with Google</p>
                </div>
              </div>

              <div className="flex items-center w-full my-4">
                <hr className="w-full" />
                <p className="px-3">OR</p>
                <hr className="w-full" />
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegisterForm} className="space-y-8">
                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="abc@gmail.com"
                      required
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                    />
                  </div>

                  {/* Photo */}
                  <div className="space-y-2">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-semibold"
                    >
                      Profile Photo
                    </label>
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imgLoading}
                      className="file:bg-[#242253] file:text-white file:cursor-pointer file:px-6 file:py-3 file:border-0 file:mr-3 w-full text-gray-800 border border-gray-300 rounded-md text-main text-base focus:outline-none focus:ring-2 focus:ring-[#242253] cursor-pointer"
                      required
                    />
                    {imgLoading && (
                      <div className="flex gap-2 text-[#242253] mt-2">
                        <span className="loading loading-spinner loading-lg"></span>
                        Uploading image...
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="*****"
                      required
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={imgLoading}
                  className={`w-full px-8 py-2 font-semibold rounded-md text-white text-base transition-all flex items-center justify-center gap-2
    ${
      imgLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#242253] hover:bg-[#bfbdff] hover:text-black border border-transparent hover:border-gray-300 cursor-pointer"
    }`}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-lg"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Create an account <FiLogIn />
                    </>
                  )}
                </button>

                <div>
                  <p className="text-sm text-center mt-6">
                    Already have an account?{" "}
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

          {/* Right: Image Section */}
          <div className="flex-1 hidden md:flex flex-col justify-center items-center px-10 bg-[#EAE9FF]">
            <img
              src="https://i.ibb.co/NvngkMC/Filing-system-bro.png"
              alt="Register Illustration"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
