/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";
import Lottie from "lottie-react";
import login from "../../../public/login.json";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Login successfully!'
                }).then(() => {
                    navigate(location?.state ? location.state : '/');
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email/Password not correct!'
                });
                console.log(error);
            });
        reset();
    };



    return (
        <div data-aos="zoom-in">
            <div className="md:flex items-center gap-10 justify-center p-5 mt-10">
                <div>
                    <Lottie className="md:h-[500px]" animationData={login} />
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-20 container border  border-gray-400 w-full max-w-xl p-8 space-y-6 rounded-md shadow">
                        <h2 className="pb-8 text-center text-3xl font-semibold tracking-tight text-blue-400">Log in!</h2>
                        <div>
                            <label htmlFor="email" className="block mb-1 ml-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                {...register('email', { required: true })}
                                className="w-full rounded-lg border border-blue-400 bg-transparent py-2 pl-4 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300/50  dark:text-zinc-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 ml-1">Password</label>
                            <div className="mb-4 relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    {...register('password', { required: true })}
                                    className="w-full rounded-lg border border-blue-400 bg-transparent py-2 pl-4 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300/50  dark:text-zinc-400"
                                />
                                <span className="absolute top-3 right-5" onClick={() => { setShowPassword(!showPassword) }}>
                                    {
                                        showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                                    }
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="uppercase  rounded-lg bg-blue-400 px-6 py-2 font-medium text-white outline-none hover:bg-blue-500 w-full"
                            >
                                LogIn
                            </button>
                        </div>
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-gray-900"></div>
                            <p className="px-3 text-gray-600 font-poppins text-xl">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-900"></div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <SocialLogin />
                        </div>
                        <p className="text-center sm:px-6 text-gray-600">
                            Don't have an account?
                            <Link to="/signup" className="underline text-blue-800 ml-1">
                                Registration
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
