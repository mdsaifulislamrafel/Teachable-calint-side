import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from "../../../../hookes/useAxiosSecure";
import Swal from "sweetalert2";

const AssignmentForm = () => {
    const { id } = useParams();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const assignmentItem = {
            title: data.title,
            deadline: data.deadline,
            description: data.description,
            classId: id
        }
        const res = await axiosSecure.post('/assignments', assignmentItem);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            navigate('/dashboard/myClass')
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Assignment Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assignment Title</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className={`mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assignment Deadline</label>
                    <Controller
                        control={control}
                        name="deadline"
                        rules={{ required: 'Deadline is required' }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Select date"
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                dateFormat="MMMM d, yyyy"
                                className={`mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.deadline ? 'border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.deadline && <p className="mt-1 text-sm text-red-500">{errors.deadline.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assignment Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className={`mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add Assignment
                </button>
            </form>
        </div>
    );
};

export default AssignmentForm;
