import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hookes/useAxiosSecure";
import Swal from "sweetalert2";

const AllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allClasses = [], refetch, isPending } = useQuery({
        queryKey: 'allClasses',
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });
    if (isPending) {
        return <div className="w-10 h-10 my-5 mx-auto animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>;
    }

    const handleApprove = async (id) => {
        const res = await axiosSecure.patch(`/classes/approve/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your class has been published",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleRejected = async (id) => {
        const res = await axiosSecure.patch(`/classes/rejected/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your class has been rejected",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                    <thead>
                        <tr className="bg-[#0095FF] text-white">
                            <th className="py-4 px-6 text-lg text-left border-b">Class Image</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Class Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Price</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Approved</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Rejected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allClasses?.map((item) => <tr key={item._id} className="hover:bg-gray-50 border-b transition duration-300">
                                <td className="py-4 px-4 flex justify-start">
                                    <img src={item.image} alt="table navigate ui" className="h-16 w-16 object-cover bg-gray-300" />
                                </td>
                                <td className="py-4 px-6 border-b text-xl font-medium">{item.name}</td>
                                <td className="py-4 px-6 border-b text-lg font-medium">${item.price}</td>
                                <td className="py-4 px-6 border-b text-end">
                                    <button onClick={() => handleApprove(item._id)} disabled={item.status === 'approve'} className="bg-blue-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">{item.status}</button>
                                </td>
                                <td className="py-4 px-6 border-b text-end">
                                    <button onClick={() => handleRejected(item._id)} disabled={item.status === 'rejected'}  className="bg-red-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">Rejected</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>  


        </div>
    );
};

export default AllClasses;