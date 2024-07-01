import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSubmit = () => {
    const axiosSecure = useAxiosSecure();
    const { data: submit = [] } = useQuery({
        queryKey:'submit',
        queryFn: async () => {
            const res = await axiosSecure.get('/submit');
            return res.data;
        }
    });
    return [submit]
};

export default useSubmit;