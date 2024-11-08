import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hookes/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Payment = () => {
    const { id } = useParams();
    const usePublic = useAxiosPublic();

    const { data: classDetails, isLoading } = useQuery({
        queryKey: ['classDetails', id],
        queryFn: async () => {
            const res = await usePublic.get(`/classes/${id}`);
            return res.data;
        }
    });

    return (
        <div className="mt-52">
            <h2 className="my-8 text-4xl font-bold text-center underline italic">Payment Process</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm classDetails={classDetails} isPending={isLoading} />
            </Elements>
        </div>
    );
};

export default Payment;
