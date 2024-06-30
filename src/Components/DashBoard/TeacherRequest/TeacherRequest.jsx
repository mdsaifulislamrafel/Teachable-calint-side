import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hookes/useAxiosSecure";

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: teacherRequest = [], isPending, refetch } = useQuery({
        queryKey: 'teacherRequest',
        queryFn: async () => {
            const res = await axiosSecure.get('/teachers');
            return res.data;
        }
    });
    if (isPending) {
        return <div className="w-10 h-10 my-5 mx-auto animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>;
    }

    const handleApprove = async (id) => {
        const res = await axiosSecure.patch(`/teachers/approved/${id}`);
        if (res.data.modifiedCount > 0) {
            refetch();
        }
    };

    const handleReject = async (id) => {
        const res = await axiosSecure.patch(`/teachers/reject/${id}`);
        console.log(res.data);

    };

    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-3xl">All Teacher Request</h2>
                <h2 className="text-3xl">Total Request: {teacherRequest.length}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
                {
                    teacherRequest?.map(item => <div key={item._id} className="w-full max-w-[340px] space-y-3 rounded-xl bg-white p-4 font-sans shadow-lg">
                        <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
                            <img width={260} height={260} className="h-full w-full rounded-lg bg-black/40" src={item.images} alt="card navigate ui" />
                        </div>
                        <div className="space-y-2 font-semibold">
                            <h6 className="text-sm md:text-base lg:text-lg">Name: {item.name}</h6>
                            <p className="text-xs font-semibold text-gray-400 md:text-sm">Title: {item.title}</p>
                            <p className="text-xs font-semibold text-gray-400 md:text-sm">Experience: {item.experience}</p>
                            <p className="text-xs font-semibold text-gray-400 md:text-sm">Email: {item.email}</p>
                            <p>Status: {item.status}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-6 text-sm md:text-base">
                            <button
                                onClick={() => handleApprove(item._id)}
                                className="rounded-lg bg-[#49B2FF] px-4 py-2 font-sans font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600"
                                disabled={item.status === 'reject' || item.status === 'approved'}
                            >
                                Approved
                            </button>
                            <button
                                onClick={() => handleReject(item._id)}
                                className="rounded-lg bg-gray-400 px-4 py-2 font-sans font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600"
                                disabled={item.status === 'reject' || item.status === 'approved'}
                            >
                                Reject
                            </button>
                        </div>

                    </div>)
                }
            </div>

        </div>
    );
};

export default TeacherRequest;