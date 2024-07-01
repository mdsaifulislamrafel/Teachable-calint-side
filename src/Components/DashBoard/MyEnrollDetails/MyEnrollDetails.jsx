import { useLoaderData } from "react-router-dom";
import useAssignments from "../../../hookes/useAssignments";
import { format, isPast } from 'date-fns';
import useAxiosSecure from "../../../hookes/useAxiosSecure";
import Swal from "sweetalert2";
import NoItem from "../../NoItem/NoItem";
import useReview from "../../../hookes/useReview";

const MyEnrollDetails = () => {
    const data = useLoaderData();
    const { title, image, description, price, id } = data;
    const axiosSecure = useAxiosSecure();

    const [assignments] = useAssignments();
    const [review] = useReview();

    // Filter assignments related to the class
    const classAssignments = assignments.filter(assignment => assignment.classId === id);
    const classReviews = review.filter(review => review.reviewId === id);


    const handleSubmit = async (item) => {
        // Check if deadline has passed
        if (isPast(new Date(item.deadline))) {
            Swal.fire({
                icon: "error",
                title: "Submission deadline has passed",
                text: "You cannot submit this assignment anymore.",
                confirmButtonText: "OK"
            });
            return;
        }

        // Disable button after submission
        const button = document.getElementById(`submit-button-${item._id}`);
        if (button) {
            button.disabled = true;
        }

        const submitItem = {
            title: title,
            deadline: item.deadline,
            description: description,
            classId: id
        };

        try {
            const res = await axiosSecure.post('/submit', submitItem);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has submitted successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission failed",
                text: "Please try again later.",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col w-full p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800 ">
                <div className="flex space-x-4">
                    <img alt="" src={image} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                    <div className="flex flex-col space-y-1">
                        <span className="text-xs dark:text-gray-600">${price}</span>
                    </div>
                </div>
                <div>
                    <img src={image} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
                    <h2 className="mb-1 text-xl font-semibold">{title}</h2>
                    <p className="text-sm dark:text-gray-600">{description}</p>
                </div>
            </div>

            <div className="divider my-5 text-2xl uppercase font-bold">Assignments</div>
            {classAssignments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {classAssignments.map((item, index) => (
                        <div key={item._id}>
                            <div className="group relative max-w-[350px] overflow-hidden bg-gradient-to-r from-[#3b99f1] via-[#4FB5FF] to-[#4FB5FF] px-6 py-6 text-white shadow">
                                <span className="absolute left-[-40%] top-[30%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#0064c2] via-[#49aef7] to-[#c7e0f1] duration-300 group-hover:top-[-30%] group-hover:blur-sm"></span>
                                <span className="absolute right-[-40%] top-[-40%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-[#0064c2] via-[#4FB5FF] to-[#4FB5FF] duration-300 group-hover:top-[40%] group-hover:blur-sm"></span>
                                <div className="relative z-20 space-y-6">
                                    <h1 className="text-2xl font-bold">Assignment No : {index + 1}</h1>
                                    <h1 className="text-2xl font-bold">{item.title}</h1>
                                    <p>{item.description}</p>
                                    <p>{format(new Date(item.deadline), 'MMMM d, yyyy')}</p>
                                    {
                                        classReviews.length > 0 ? '' : <button id={`submit-button-${item._id}`} onClick={() => handleSubmit(item)} className="bg-[#1b8efa] rounded-md px-6 py-2">Submit</button>
                                    }
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className="divider text-xl font-bold">Feedback</div>
                            {classReviews.length > 0 ? <>
                                {
                                    classReviews.map(review => <div key={review._id} className="space-y-2 mt-4">
                                        <h2 className="font-medium text-slate-800 sm:text-lg md:text-xl"> {review.description}</h2>
                                        {/* rating  */}
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg key={star} className="w-7 cursor-pointer" viewBox="0 0 24 24" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                                        fill={star <= review.rating ? '#f2b00a' : '#94a3b8'}
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>)
                                }
                            </> : <>
                                <h2>no review</h2>
                            </>}
                        </div>
                    ))}
                </div>
            ) : (
                <NoItem />
            )}
        </div>
    );
};

export default MyEnrollDetails;
