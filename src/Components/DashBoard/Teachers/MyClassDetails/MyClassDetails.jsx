import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Rating from 'react-rating-stars-component';
import NoItem from '../../../NoItem/NoItem';
import { FaPlus } from 'react-icons/fa';
import useSubmit from '../../../../hookes/useSubmit';
import useAxiosSecure from '../../../../hookes/useAxiosSecure';
import Swal from 'sweetalert2';

const MyClassDetails = () => {
    const data = useLoaderData();
    const { title, image, description, price, _id } = data;
    const [submit] = useSubmit();
    const submitClass = submit.filter(item => item.classId === _id);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);

    const onSubmit = async (data) => {
        const review = { ...data, rating, reviewId: _id }
        const res = await axiosSecure.post('/review', review)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your review has been submitted",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        }
        document.getElementById('my_modal_5').close();
    };

    return (
        <div>
            <div className="flex flex-col w-full p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800 ">
                <div className="flex justify-between space-x-4">
                    <div>
                        <img alt="" src={image} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                        <div className="flex flex-col my-2 space-y-1">
                            <span className="text-xs font-bold dark:text-gray-600">Price : ${price}</span>
                        </div>
                    </div>
                    <div>
                        <Link to={`/dashboard/assignment/${_id}`}>
                            <button className="btn btn-success text-white px-6">
                                <FaPlus className="text-xl" /> Create Assignments
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={image} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
                    <h2 className="mb-1 text-xl font-semibold">{title}</h2>
                    <p className="text-sm dark:text-gray-600">{description}</p>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="space-x-2">
                        <Link to={'/dashboard/myClass'}>
                            <button className="btn btn-secondary">Back now</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="divider my-5 text-2xl uppercase font-bold">Submit Assignments</div>
            {submitClass.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {submitClass.map((item, index) => (
                        <div key={item._id}>
                            <div className="group relative max-w-[350px] overflow-hidden bg-gradient-to-r from-[#3b99f1] via-[#4FB5FF] to-[#4FB5FF] px-6 py-6 text-white shadow">
                                <span className="absolute left-[-40%] top-[30%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#0064c2] via-[#49aef7] to-[#c7e0f1] duration-300 group-hover:top-[-30%] group-hover:blur-sm"></span>
                                <span className="absolute right-[-40%] top-[-40%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-[#0064c2] via-[#4FB5FF] to-[#4FB5FF] duration-300 group-hover:top-[40%] group-hover:blur-sm"></span>
                                <div className="relative z-20 space-y-6">
                                    <h1 className="text-2xl font-bold">Assignment No : {index + 1}</h1>
                                    <h1 className="text-2xl font-bold">{item.title}</h1>
                                    <p>{item.description}</p>
                                    <p>{format(new Date(item.deadline), 'MMMM d, yyyy')}</p>
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Review</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom text-black sm:modal-middle">
                                        <div className="modal-box">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <label htmlFor="Description">Description</label>
                                                <textarea
                                                    {...register('description')}
                                                    id="Description"
                                                    className="textarea textarea-bordered w-full"
                                                    required
                                                ></textarea>
                                                <div className="mt-4">
                                                    <label>Ratings</label>
                                                    <Rating
                                                        count={5}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        value={rating}
                                                        onChange={(newRating) => setRating(newRating)}
                                                    />
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button type="button" className="btn">Close</button>
                                                    </form>
                                                    <button type="submit" className="btn btn-primary">Send</button>
                                                </div>
                                            </form>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NoItem />
            )}
        </div>
    );
};

export default MyClassDetails;
