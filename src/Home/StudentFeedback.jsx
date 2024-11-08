import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const feedbackData = [
    {
        name: "Guy Hawkins",
        role: "UI-UX Designer",
        feedback: "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "John Doe",
        role: "Product Manager",
        feedback: "Sed interdum urna nec leo varius, a mollis libero pretium. Nullam viverra, dui in pellentesque luctus, elit eros fermentum nunc, at venenatis dolor est et nibh.",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
        name: "Jane Smith",
        role: "Software Engineer",
        feedback: "Curabitur suscipit arcu a sapien lacinia, ac convallis ligula sollicitudin. Cras facilisis ullamcorper lectus, id vehicula purus suscipit non.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Anna Johnson",
        role: "Marketing Specialist",
        feedback: "Vivamus auctor est et quam euismod, ac facilisis lorem lobortis. Ut in libero sollicitudin, dictum lorem vitae, viverra enim.",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        name: "Michael Brown",
        role: "UI-UX Designer",
        feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel eros et erat viverra sodales.",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg"
    }
];

const StudentFeedback = () => {
    return (
        <div className="flex flex-col items-center py-16 bg-purple-50">
            <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                Student <span className="text-blue-600">Feedback</span>
            </h2>
            <p className="text-gray-500 mb-10 text-center max-w-lg">
                Various versions have evolved over the years, sometimes by accident.
            </p>

            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="w-full max-w-5xl px-4"
            >
                {feedbackData.map((feedback, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <div className="w-full sm:w-80 h-[380px] p-6 bg-white rounded-lg shadow-md text-center flex flex-col items-center">
                            <img
                                src={feedback.avatar}
                                alt={feedback.name}
                                className="w-16 h-16 rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{feedback.name}</h3>
                            <p className="text-gray-500 text-sm mb-2">{feedback.role}</p>
                            <p className="text-gray-600 mb-4 flex-grow">{feedback.feedback}</p>
                            <FaQuoteRight size={30} className="text-yellow-400" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default StudentFeedback;
