import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAssignments = () => {
    const axiosSecure = useAxiosSecure();
    const { data: assignments = [], refetch } = useQuery({
        queryKey: 'assignments',
        queryFn: async () => {
            const res = await axiosSecure.get('/assignments');
            return res.data;
        }
    });
    return [assignments, refetch]
};

export default useAssignments;