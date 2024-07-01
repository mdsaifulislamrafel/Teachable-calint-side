import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://techers-cource.vercel.app"
    // baseURL: "http://localhost:5000"
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;