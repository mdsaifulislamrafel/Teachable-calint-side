import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosPublic from '../../../hookes/useAxiosPublic';
import useAxiosSecure from '../../../hookes/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const TeacherApplicationForm = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.images[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                const teacherItem = {
                    name: data.name,
                    category: data.category,
                    email: data.email,
                    title: data.title,
                    images: res.data.data.display_url,
                    experience: data.experience,
                    status: 'pending'
                }
                const result = await axiosSecure.post('/teachers', teacherItem)
                if (result.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                }
            }
            // Handle the rest of the form submission, such as sending the data to your API
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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        id="name"
                        className="w-full px-3 py-2 border rounded"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Images (who logged in)</label>
                    <input
                        id="images"
                        type="file"
                        className="w-full px-3 py-2 border rounded"
                        {...register('images', { required: true })}
                        multiple
                    />
                    {errors.images && <p className="text-red-500 text-sm mt-1">Images are required.</p>}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    id="email"
                    value={user?.email}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                    {...register('email')}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                    <label htmlFor="experience" className="block text-gray-700 font-bold mb-2">Experience Level</label>
                    <select id="experience" className="w-full px-3 py-2 border rounded" {...register('experience', { required: true })}>
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                    {errors.experience && <p className="text-red-500 text-sm mt-1">Experience level is required.</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        id="title"
                        className="w-full px-3 py-2 border rounded"
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">Title is required.</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                    <select id="category" className="w-full px-3 py-2 border rounded" {...register('category', { required: true })}>
                        <option value="web development">Web Development</option>
                        <option value="digital marketing">Digital Marketing</option>
                        <option value="data science">Data Science</option>
                        <option value="graphic design">Graphic Design</option>
                        <option value="cyber security">Cyber Security</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">Category is required.</p>}
                </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Submit for Review
            </button>
        </form>
    );
};

export default TeacherApplicationForm;
