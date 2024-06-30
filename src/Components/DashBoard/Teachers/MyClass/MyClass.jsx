import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hookes/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import NoItem from "../../../NoItem/NoItem";
import { Link } from "react-router-dom";

const MyClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: myClass = [null], isPending, refetch } = useQuery({
        queryKey: ['myClass', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class/${user?.email}`);
            return res.data;
        }
    });
    if (isPending) {
        return <div className="w-10 h-10 my-5 mx-auto animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>;
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/classes/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };


    return (
        <div>
            {
                myClass.length == 0 ? <>
                    <NoItem />
                </> : <>
                    <div>
                        <h2 className="text-2xl uppercase underline mb-5 font-bold italic text-center">My all class list : {myClass.length}</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 bg-white shadow-lg">
                                {/* Table Header */}
                                <thead>
                                    <tr className="h-[70px] border-b bg-[#141B29] text-[#FFFFFF]">

                                        <th className="px-6 py-4 text-start">Name</th>
                                        <th className="px-6 py-4 text-start">Image</th>
                                        <th className="px-6 py-4 text-start">Status</th>
                                        <th className="px-6 py-4 text-start">Details</th>
                                        <th className="px-6 py-4 text-start">Update</th>
                                        <th className="px-6 py-4 text-start">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myClass?.map((item) => <tr key={item?._id} className="h-[70px] border-b bg-[#484D58] text-[#FFFFFF]">
                                            <th className="px-6 py-4 text-start">
                                                {item.name}
                                            </th>
                                            <th className="px-6 py-4 text-start">
                                                <img className="h-[44px] w-[44px] rounded-full bg-slate-500 object-cover" src={item?.image} />
                                            </th>
                                            <th className="px-6 py-4 text-start ">{item?.status}</th>
                                            <th className="px-6 py-4 text-start">
                                                <Link to={`/dashboard/myClassDetails/${item?._id}`}>
                                                <button type="button" className="px-8 py-3 font-semibold rounded dark:bg-gray-800 dark:text-gray-100">Details</button>
                                                </Link>
                                            </th>
                                            <th className="px-6 py-4 text-start">
                                                <Link to={`/dashboard/update/${item?._id}`}><button className="flex items-center rounded-full bg-blue-600 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2 h-6 w-6"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /> </svg>
                                                    Update
                                                </button></Link>
                                            </th>
                                            <th className="px-6 py-4 text-start">
                                                <button onClick={() => handleDelete(item?._id)} className="flex items-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2 h-6 w-6">  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> </svg>
                                                    Delete
                                                </button>
                                            </th>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </>
            }
        </div>
    );
};

export default MyClass;