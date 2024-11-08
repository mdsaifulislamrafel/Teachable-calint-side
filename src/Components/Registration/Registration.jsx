import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hookes/useAxiosPublic";
import SocialLogin from "../SocialLogin/SocialLogin";
import Lottie from "lottie-react";
import signup from "../../../public/signup_animation.json";



const Registration = () => {
    const { createUser, updateprofile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const { name, email, password, photo } = data;

        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;

        if (!uppercaseRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password should contain at least one uppercase letter!'
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password should contain at least six letters!'
            });
            return;
        }

        if (!lowercaseRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password should contain at least one lowercase letter!'
            });
            return;
        }

        createUser(email, password)
            .then(() => {
                updateprofile(name, photo)
                    .then(() => {

                        const userInfo = {
                            name: name,
                            email: email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Registered successfully!'
                                    })
                                    navigate(location?.state ? location.state : '/')
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Maybe you are trying to register with the same email!'
                                    });
                                    reset();
                                }
                            })
                    });
            })

    };


    return (
        <div data-aos="zoom-out">
            <div className="flex-row-reverse md:flex items-center justify-around p-5">
                <div>
                    <Lottie className="md:h-[500px]" animationData={signup} />
                </div>
                <div className=" ">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto  container border  border-gray-400 w-full max-w-xl p-8 space-y-4 rounded-md shadow">
                            <h2 className="pb-8 text-center text-3xl font-semibold tracking-tight text-blue-400">Registration Now!</h2>
                            <div>
                                <label htmlFor="name" className="block mb-1 ml-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    {...register('name', { required: true })}
                                    className="w-full rounded-lg border border-blue-400 bg-transparent py-2 pl-4 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300/50  dark:text-zinc-400"
                                />
                                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                            </div>
                            <div>
                                <label htmlFor="photoUrl" className="block mb-1 ml-1">Photo URL</label>
                                <input
                                    id="photoUrl"
                                    type="text"
                                    placeholder="Photo URL"
                                    {...register('photo', { required: true })}
                                    className="w-full rounded-lg border border-blue-400 bg-transparent py-2 pl-4 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300/50  dark:text-zinc-400"
                                />
                                {errors.photo && <p className="text-red-500 text-sm">Photo URL is required</p>}
                            </div>
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
                                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="uppercase  rounded-lg bg-blue-400 px-6 py-2 font-medium text-white outline-none hover:bg-blue-500 w-full"
                                >
                                    Register
                                </button>
                            </div>

                            <div className="flex items-center  space-x-1">
                                <div className="flex-1 h-px sm:w-16 bg-gray-900"></div>
                                <p className="px-3 text-gray-600 font-poppins text-xl">Registration with social accounts</p>
                                <div className="flex-1 h-px sm:w-16 bg-gray-900"></div>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <SocialLogin />
                            </div>
                            <p className="text-center sm:px-6 text-gray-600">
                                Do you have an account?
                                <Link to="/login" className="underline text-blue-800 ml-1">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
