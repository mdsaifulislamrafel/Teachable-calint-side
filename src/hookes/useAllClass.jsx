import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllClass = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allClass = [] } = useQuery({
        queryKey: 'allClass',
        queryFn: async () => {
            const res = await axiosPublic.get('/classes');
            return res.data;
        }
    });
    return [allClass];
};

export default useAllClass;