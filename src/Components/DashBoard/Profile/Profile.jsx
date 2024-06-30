import { useContext } from "react";
import useAxiosPublic from "../../../hookes/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
    const axiosSecure = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { data: profile = [], isPending } = useQuery({
        queryKey: ['profile', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    if(isPending) {
        return <div className="w-10 h-10 my-5 mx-auto animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>;
    }
    
    return (
        <div className="bg-yellow-400 min-h-full flex flex-col items-center justify-center rounded-2xl shadow-2xl border-2">
            <div className="flex items-center flex-wrap justify-around" id="_ActiveAvatar_NavigateUI">
                <div className="relative group">
                    <img className="size-[130px] bg-slate-500 object-cover rounded-full" src={user?.photoURL} />
                    <span className="size-5 bg-green-500 absolute rounded-full bottom-5 right-0 border-[3px] border-white"></span>
                    <span className="size-5 bg-green-500 absolute rounded-full bottom-5 right-0 animate-ping"></span>
                </div>

            </div>
            <div className=" text-center grid gap-2 mt-5">
                <h1 className="text-xl md:text-2xl font-semibold ">Name : {profile.name}</h1>
                <p className="text-sm md:text-xl font-medium">Email Address : {profile.email}</p>
                {profile.role && <div className="text-lg font-semibold">Role : {profile.role}</div>}
            </div>
        </div>
    );
};

export default Profile;