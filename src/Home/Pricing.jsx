import { Link } from "react-router-dom";
import onlineImg from '../assets/online.png'

/* eslint-disable react/no-unescaped-entities */
const Pricing = () => {
    return (
        <div className="md:flex  justify-center items-center  gap-10 bg-[#E9F8F3B3] p-10  md:p-16">
            <div>
                <img src={onlineImg} alt="" />
            </div>
            <div className="space-y-5 md:space-y-6 w-full md:w-[535px] mt-5 md:mt-0">
                <h2 className="text-[#06241B] text-2xl md:text-5xl font-semibold ">Join <span className="text-[#20B486]">World's largest</span> learning platform today</h2>
                <p>Start learning by registering for free</p>
                <Link to={'/signup'}>
                    <button className="btn btn-success mt-12 py-3 px-6 text-sm text-white">Sign up for Free</button>
                </Link>
            </div>
        </div>
    );
};

export default Pricing;