import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hookes/useAxiosPublic";
import SocialLogin from "../SocialLogin/SocialLogin";

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
            <section className="max-w-[1300px] mx-auto mt-6 my-auto">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-20 container border mt-28 border-gray-400 w-full max-w-xl p-8 space-y-6 rounded-md shadow">
                        <h2 className="w-full text-3xl font-bold text-center">Registration Now!</h2>
                        <div>
                            <label htmlFor="name" className="block mb-1 ml-1">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                {...register('name', { required: true })}
                                className="block w-full p-2 rounded border border-gray-600 bg-gray-100 dark:bg-gray-100"
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
                                className="block w-full p-2 rounded border border-gray-600 bg-gray-100 dark:bg-gray-100"
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
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-400 dark:bg-violet-600 focus:ring-violet-400 focus:dark:ring-violet-600 hover:ring-violet-400 hover:dark:ring-violet-600 text-white"
                            >
                                Register
                            </button>
                        </div>

                        <div className="flex items-center pt-4 space-x-1">
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
            </section>
        </div>
    );
};

export default Registration;
