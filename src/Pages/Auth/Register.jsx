import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from '../../Hooks/useAuth';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const Register = () => {

    useEffect(() => {
        document.title = "BooksHouse | Register";
    }, [])

    const navigate = useNavigate();
    const { register, updatedProfile, googleSign, setLoading } = useAuth();

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
                    navigate('/');
                }, 1500);
            })
            .catch(error => {
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
    }

    const handleRegisterForm = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must have at least one uppercase letter.", {
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
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must have at least one lowercase letter.", {
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
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.", {
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
            return;
        }

        register(email, password)
            .then(() => {
                updatedProfile(name, photo);
                toast.success("You've successfully registered to our website", {
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
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(error => {
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
    }

    return (
        <div className="bg-[#f4f3f3] w-full mx-auto py-10 px-4 md:px-0">
            <ToastContainer />

            <div className="w-full md:w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row min-h-[600px] rounded-md overflow-hidden shadow-xl">
                
                {/* Left: Form Section */}
                <div className="flex flex-1 justify-center items-center bg-base-100 p-4 sm:p-8">
                    <div className="w-full md:max-w-md">
                        <h2 className="mb-3 text-3xl font-bold">Register Account</h2>
                        <p className="mb-6 text-gray-600">Create your BooksHouse profile and start reading.</p>

                        <div className="my-6 space-y-4">
                            <div
                                onClick={handleGoogle}
                                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md btn hover:bg-transparent bg-[#242253] text-white hover:text-black text-base font-semibold border-gray-300 cursor-pointer"
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

                        <form onSubmit={handleRegisterForm} className="space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="photo" className="block text-sm font-semibold">Photo URL</label>
                                    <input
                                        type="text"
                                        name="photo"
                                        id="photo"
                                        placeholder="Your photo URL"
                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="abc@gmail.com"
                                        required
                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-semibold">Password</label>
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
                                className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-black border border-transparent hover:border-gray-300 text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Register Now
                            </button>

                            <div>
                                <p className='text-sm text-center mt-6'>Already have an account? <Link to='/login' className='text-[#242253] font-bold hover:underline'>Sign In</Link></p>
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
    );
};

export default Register;
