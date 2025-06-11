import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from '../../Hooks/useAuth';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {

    useEffect(() => {
        document.title = "BooksHouse | Login";
    }, [])

    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { login, googleSign, setErr, err  } = useAuth();

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
                    navigate( location.state || '/' );
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
            })
    }

    const hanedleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setErr('')

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
            })
    }

    return (
        <div className=' bg-[#f4f3f3]  w-full md:w-11/12 mx-auto py-10 md:px-0 px-4'>
            <ToastContainer />
            <div className="w-full max-w-md mx-auto bg-base-100 p-4 rounded-md sm:p-8 shadow-xl" style={{
                boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            }}>
                <h2 className="mb-3 text-3xl font-bold text-center">Login Your Account</h2>
                <div className="my-6 space-y-4">
                    <div onClick={handleGoogle} className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md btn hover:bg-transparent bg-[#242253] text-white hover:text-black text-base tracking-wider font-semibold border-gray-300">
                        <FcGoogle />
                        <p>Signin with Google</p>
                    </div>
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full" />
                    <p className="px-3">OR</p>
                    <hr className="w-full" />
                </div>
                <form className="space-y-8" onSubmit={hanedleLogin}>
                    <div className="space-y-4">
                        {err && <p className='text-sm' style={{ color: 'red' }}>{err}</p>}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-base font-semibold">Email address</label>
                            <input type="email" required name="email" id="email" placeholder="abc@gmail.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-base font-semibold">Password</label>
                            </div>

                            <div className="relative">
                                <input
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    name="password"
                                    id="password"
                                    required
                                    placeholder="*****"
                                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300  border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[22px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                                >
                                    {
                                        showPassword ? <FaEyeSlash /> : <FaEye />
                                    }
                                </span>
                                <div><a className="link link-hover text-[14px] underline">Forgot password?</a></div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-black border border-transparent hover:border-gray-300 text-base cursor-pointer transition-all"
                    >
                        Login
                    </button>
                    <div>
                        <p className='text-sm text-center'>Don't have an account? <Link to='/register' className='text-[#242253] font-bold hover:underline'>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;