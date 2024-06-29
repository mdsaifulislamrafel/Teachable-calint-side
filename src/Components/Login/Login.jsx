/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

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
            <section>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-20 container border mt-28 border-gray-400 w-full max-w-xl p-8 space-y-6 rounded-md shadow">
                        <h2 className="w-full text-3xl font-bold text-center">Log in!</h2>
                        <div>
                            <label htmlFor="email" className="block mb-1 ml-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                {...register('email', { required: true })}
                                className="block w-full p-2 rounded border border-gray-600 bg-gray-100 dark:bg-gray-100"
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
                                    className="block w-full p-2 rounded border border-gray-600 bg-gray-100 dark:bg-gray-100"
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
                                className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-400 dark:bg-violet-600 focus:ring-violet-400 focus:dark:ring-violet-600 hover:ring-violet-400 hover:dark:ring-violet-600 text-black"
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
            </section>
        </div>
    );
};

export default Login;
