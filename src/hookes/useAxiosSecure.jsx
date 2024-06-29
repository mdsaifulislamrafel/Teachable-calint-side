import axios from 'axios';


const axiosSecure = axios.create({
    // baseURL: "https://techers-cource.vercel.app"
    baseURL: "http://localhost:5000"
});
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;