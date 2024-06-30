import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext)
    //1. request interceptor to add authorization headers for every secure call to the api start

    axiosSecure.interceptors.request.use(function (config) {
        // console.log('request by interceptor');
        const token = localStorage.getItem('token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    //1. request interceptor to add authorization headers for every secure call to the api end


    // 2. interceptor 401 and 403 status handlers or error handlers start
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // for 401 or 403 logout the user and redirect back to the login page
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login', { replace: true });
        }
        return Promise.reject(error);
    });
    // 2. interceptor 401 and 403 status handlers or error handlers end


    return axiosSecure;
};

export default useAxiosSecure;