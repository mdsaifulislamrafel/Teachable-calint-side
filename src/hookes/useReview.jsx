import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReview = () => {
    const axiosSecure = useAxiosSecure();
    const { data: review = [] } = useQuery({
        queryKey: 'review',
        queryFn: async () => {
            const res = await axiosSecure.get('/review');
            return res.data;
        }
    });
    return [review]
};

export default useReview;