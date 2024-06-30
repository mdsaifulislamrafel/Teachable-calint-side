import { Link } from "react-router-dom";
import useCarts from "../../../hookes/useCarts";
import NoItem from "../../NoItem/NoItem";



const MyEnrollClass = () => {
    const [carts, isPending] = useCarts();

    if (isPending) {
        return <div className="w-10 h-10 my-5 mx-auto animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>;
    }

    return (
        <div>
            {
                carts?.length === 0 ? <>
                    <NoItem />
                </> : <>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts?.map((item, index) => <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>$ {item.price}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">{item.description}</button>
                                        </th>
                                        <th>
                                            <Link to={`/dashboard/myEnrollClassDetails/${item._id}`}><button className="btn">Continue</button></Link>
                                        </th>
                                    </tr>)
                                }


                            </tbody>
                        </table>
                    </div>
                </>
            }

        </div>
    );
};

export default MyEnrollClass;