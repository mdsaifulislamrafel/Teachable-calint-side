import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hookes/useAxiosPublic";
import useAxiosSecure from "../../../../hookes/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Update = () => {
    const item = useLoaderData();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const updatedItem = {
                    title: data.title,
                    price: data.price,
                    shortDescription: data.description,
                    image: res.data.data.display_url,
                };

                const result = await axiosSecure.patch(`/classes/${item._id}`, updatedItem);

                if (result.data) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your class has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    navigate('/dashboard/myClass');
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Update Class</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        defaultValue={item.title}
                        {...register('title', { required: true })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.title && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        defaultValue={user.displayName}
                        disabled
                        className="w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        defaultValue={item.price}
                        {...register('price', { required: true })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.price && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        defaultValue={item.shortDescription}
                        {...register('description', { required: true })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.description && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.image && <span className="text-red-600">This field is required</span>}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                    Update Class
                </button>
            </form>
        </div>
    );
};

export default Update;
