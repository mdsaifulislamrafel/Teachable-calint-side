import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useTeacherPosition = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);
    const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/teachers/position/${user?.email}`);
            return res?.data?.position;
        }
    });
    return [isTeacher, isTeacherLoading];
};

export default useTeacherPosition;