import { Link, useLoaderData } from "react-router-dom";

const MyEnrollDetails = () => {
    const data = useLoaderData();
    const { title, image, description, price } = data;

    return (
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
            <div className="flex flex-wrap justify-between">
                <div className="space-x-2">
                    <Link to={'/dashboard/myEnrollClass'}><button className="btn btn-secondary">Submit</button></Link>
                </div>
                <div className="space-x-2">
                    <Link to={'/dashboard/myEnrollClass'}><button className="btn btn-secondary">Back now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MyEnrollDetails;