import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';

const instructors = [
    { name: "Jacob Jones", role: "UI-UX Design Expert", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Jacob Jones", role: "Social Media Expert", imageUrl: "https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Jacob Jones", role: "Business Idea Expert", imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Jacob Jones", role: "Photography Expert", imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Robert Fox", role: "Photography Expert", imageUrl: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function BestInstructors() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold text-gray-800">
                Our Best <span className="text-green-600">Instructor</span>
            </h2>
            <p className="text-gray-500 mt-1">
                Various versions have evolved over the years, sometimes by accident.
            </p>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                className="mt-6"
            >
                {instructors.map((instructor, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <div className="w-full max-w-xs sm:max-w-sm p-4 bg-white rounded-lg shadow-lg transform transition duration-200 hover:scale-105">
                            <img
                                src={instructor.imageUrl}
                                alt={instructor.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="text-center mt-4">
                                <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
                                <p className="text-gray-500">{instructor.role}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
