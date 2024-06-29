import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hookes/useAxiosSecure";

const ClassDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosSecure();

    const { data: classDetails } = useQuery({
        queryKey: ['classDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes/${id}`);
            return res.data;
        }
    });

    return (
        <div className="flex flex-col w-full p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800 ">
            <div className="flex space-x-4">
                <img alt="" src={classDetails?.image} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">{classDetails?.name}</p>
                    <span className="text-xs dark:text-gray-600">${classDetails?.price}</span>
                </div>
            </div>
            <div>
                <img src={classDetails?.image} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
                <h2 className="mb-1 text-xl font-semibold">{classDetails?.title}</h2>
                <p className="text-sm dark:text-gray-600">{classDetails?.shortDescription}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="space-x-2">
                    <Link to={`/payment/${classDetails?._id}`}><button className="btn btn-primary">Pay now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
