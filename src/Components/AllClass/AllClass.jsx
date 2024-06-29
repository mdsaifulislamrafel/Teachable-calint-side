import { Link } from "react-router-dom";
import useAllClass from "../../hookes/useAllClass";


const AllClass = () => {
    const [allClass] = useAllClass();
    return (
        <div>
            <h2 className="my-20 text-center text-4xl font-bold uppercase underline">All class</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    allClass?.map(item => <div key={item._id} className="w-full max-w-md space-y-4 rounded-lg bg-white p-5 shadow-lg border">
                        <div className="flex flex-col space-y-1.5">
                            <h3 className="text-2xl font-semibold ">{item.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-white/60">Made with genuine leather, our Classic Leather Jacket is the perfect addition to every wardrobe.</p>
                        </div>
                        <div className="flex items-end justify-between">
                            <h2 className="text-center text-2xl font-medium">${item.price}</h2>
                            <p className="rounded-lg bg-gray-700 p-2 text-center text-sm text-white">Total enrolment: {item.totalEnrolment}</p>
                        </div>
                        <img width={400} height={300} className="h-[300px] w-full rounded-lg bg-gray-600 object-cover" src={item.image} alt="card navigate ui" />
                        <Link to={`/classDetails/${item._id}`}><button className="w-full rounded-lg mt-2 bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white hover:bg-slate-900 sm:text-sm md:text-base">Enroll</button></Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllClass;