/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hookes/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const CheckoutForm = ({ classDetails, isPending }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { image, shortDescription, title, price, _id: id } = classDetails;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                setError('Failed to initiate payment. Please try again.');
            });
    }, [axiosSecure, price]);

    if (isPending) {
        return <Loading /> ;
    }

    const handleSaveData = async () => {
        const data = { title, image, description: shortDescription, price, email: user?.email, id };
        const res = await axiosSecure.post('/carts', data);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Enrollment saved!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/myEnrollClass');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            setError('Payment service is not available. Please try again later.');
            setIsLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Please enter your card details.');
            setIsLoading(false);
            return;
        }

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });
        if (methodError) {
            setError(methodError.message);
            setIsLoading(false);
            return;
        } else {
            setError('');
        }

        if (!clientSecret) {
            setError('Payment initialization failed. Please try again.');
            setIsLoading(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card, billing_details: { email: user?.email || 'anonymous', name: user?.displayName || 'anonymous' } }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            handleSaveData();
        } else {
            setError('Payment failed. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
                className="border p-2 rounded-lg"
            />
            <button
                className={`btn btn-primary w-full my-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={!stripe || !clientSecret || isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="loader mr-2"></div> Processing...
                    </div>
                ) : (
                    'Pay'
                )}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {transactionId && <p className="text-green-600 text-sm mt-2">Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
