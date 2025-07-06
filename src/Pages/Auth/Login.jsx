import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from '../../Hooks/useAuth';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLogIn } from "react-icons/fi";

const Login = () => {

    useEffect(() => {
        document.title = "BooksHouse | Login";
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { login, googleSign, setErr, err, setLoading } = useAuth();

    const handleGoogle = () => {
        googleSign()
            .then(() => {
                toast.success("You've successfully logged in to the website", {
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
                    navigate(location.state || '/');
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
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setErr('');

        login(email, password).then(() => {
            toast.success("You've successfully logged in to the website", {
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
                navigate(location.state || '/');
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
                transition: Bounce
            });
            setLoading(false);
        });
    };

    return (
        <div className="bg-[#f4f3f3] w-full mx-auto py-10 px-4 md:px-0">
            <ToastContainer />

            <div className="w-full md:w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row min-h-[600px] rounded-md overflow-hidden shadow-xl">
                {/* Left: Form Section */}
                <div className="flex flex-1 justify-center items-center bg-base-100 p-4 sm:p-8">
                    <div className="w-full md:max-w-md">
                        <h2 className="mb-3 text-3xl font-bold">Login Your Account</h2>
                        <p className="mb-6 text-gray-600">Access your BooksHouse dashboard and manage your readings.</p>

                        <div className="my-6 space-y-4">
                            <div
                                onClick={handleGoogle}
                                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md btn hover:bg-transparent bg-[#242253] text-white hover:text-black text-base font-semibold border-gray-300 cursor-pointer"
                            >
                                <FcGoogle />
                                <p>Sign in with Google</p>
                            </div>
                        </div>

                        <div className="flex items-center w-full my-4">
                            <hr className="w-full" />
                            <p className="px-3">OR</p>
                            <hr className="w-full" />
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-4">
                                {err && <p className='text-sm text-red-600'>{err}</p>}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="abc@gmail.com"
                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-semibold">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            required
                                            placeholder="*****"
                                            className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242253]"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <div>
                                        <a className="link link-hover text-sm underline">Forgot password?</a>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-black border border-transparent hover:border-gray-300 text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Login <FiLogIn />
                            </button>

                            <div>
                                <p className='text-sm text-center mt-6'>Don't have an account? <Link to='/register' className='text-[#242253] font-bold hover:underline'>Sign up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right */}
                <div className="flex-1 hidden md:flex flex-col justify-center items-center px-10 bg-[#EAE9FF]">
                    <img
                        src="https://i.ibb.co/NvngkMC/Filing-system-bro.png"
                        alt="Login Illustration"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
