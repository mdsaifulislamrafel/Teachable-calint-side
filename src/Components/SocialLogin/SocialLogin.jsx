
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hookes/useAxiosPublic";

const SocialLogin = () => {
    const { signGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        signGoogle()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        navigate('/');
                    })

            })
    };
    return (
        <div className="">
            <div>
                <button onClick={handleGoogleSignIn} className="group mx-auto flex h-[50px] w-fit items-center overflow-hidden rounded-full shadow-md outline-none ring-1 ring-blue-400">
                    <div className="relative z-20 flex h-full items-center bg-blue-400 px-4 text-lg text-white duration-300 group-hover:bg-transparent group-hover:text-blue-400">
                        Signin with
                    </div>
                    <span className="flex h-full items-center px-4 text-xl font-bold text-blue-400 duration-300 group-hover:bg-blue-400 group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="size-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;