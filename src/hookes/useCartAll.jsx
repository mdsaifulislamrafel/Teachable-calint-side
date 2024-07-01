import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCartAll = () => {
    const axiosSecure = useAxiosSecure();
    const { data: card } = useQuery({
        queryKey: 'cart',
        queryFn: async () => {
            const res = await axiosSecure.get('/carts');
            return res.data;
        }
    });
    return [card];
};

export default useCartAll;